import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Create Supabase client to verify user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Verify user is authenticated
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Log activity
    await supabaseClient.from('activity_logs').insert({
      user_id: user.id,
      action: 'API Request',
      resource_type: 'master_ai',
      details: {
        method: req.method,
        url: req.url,
      },
      user_agent: req.headers.get('user-agent'),
    }).catch(err => console.error('Error logging activity:', err));

    // Get request details
    const { endpoint, method, body } = await req.json();
    
    if (!endpoint) {
      throw new Error('Missing endpoint parameter');
    }

    const API_BASE_URL = 'http://localhost:4000/api';
    const MASTER_KEY = Deno.env.get('MASTER_AI_KEY');

    if (!MASTER_KEY) {
      throw new Error('Master AI key not configured');
    }

    console.log(`Proxying request to: ${API_BASE_URL}${endpoint}`);

    // Make request to Master AI Orchestrator API
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: method || 'GET',
      headers: {
        'Authorization': `Bearer ${MASTER_KEY}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Master AI API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: `Master AI API error: ${response.statusText}`, details: errorText }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({ data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in master-ai-proxy function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});