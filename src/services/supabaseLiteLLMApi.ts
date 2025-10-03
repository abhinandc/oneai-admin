// Supabase-backed Master AI Orchestrator API Service
import { supabase } from "@/integrations/supabase/client";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class SupabaseMasterAIApiService {
  // Helper method for proxied API calls through Supabase edge function
  private async request<T>(endpoint: string, method: string = 'GET', body?: any): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await supabase.functions.invoke('master-ai-proxy', {
        body: {
          endpoint,
          method,
          body,
        },
      });

      if (error) {
        console.error(`API Error for ${endpoint}:`, error);
        return { error: error.message || 'Unknown error' };
      }

      return { data: data?.data };
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Get all API keys
  async getKeys() {
    return this.request<any>('/key/info', 'GET');
  }

  // Get key stats
  async getKeyStats() {
    const response = await this.request<any>('/global/spend', 'GET');
    if (response.data) {
      return {
        total_keys: response.data.total_keys || 0,
        active_keys: response.data.active_keys || 0,
      };
    }
    return { total_keys: 0, active_keys: 0 };
  }

  // Get models
  async getModels() {
    return this.request<any>('/model/info', 'GET');
  }

  // Get usage/spend data
  async getSpend(start_date?: string, end_date?: string) {
    const params = new URLSearchParams();
    if (start_date) params.append('start_date', start_date);
    if (end_date) params.append('end_date', end_date);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<any>(`/global/spend${query}`, 'GET');
  }

  // Get users/team members
  async getTeamMembers() {
    return this.request<any>('/team/info', 'GET');
  }

  // Get general stats for dashboard
  async getDashboardStats() {
    try {
      // Fetch all data in parallel
      const [keysResponse, modelsResponse, spendResponse, teamResponse] = await Promise.all([
        this.getKeys(),
        this.getModels(),
        this.getSpend(),
        this.getTeamMembers(),
      ]);

      // Calculate stats
      const totalKeys = keysResponse.data?.data?.length || 0;
      const activeModels = modelsResponse.data?.data?.length || 0;
      const teamMembers = teamResponse.data?.team_members?.length || 0;
      
      // Get current month spend
      const currentMonthSpend = spendResponse.data?.total_spend || 0;
      const monthlyRequests = spendResponse.data?.total_requests || 0;

      return {
        totalKeys,
        activeModels,
        teamMembers,
        monthlyRequests,
        currentMonthSpend,
        uptime: 99.9,
        avgResponseTime: 234,
        errorRate: 0.02,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        totalKeys: 0,
        activeModels: 0,
        teamMembers: 0,
        monthlyRequests: 0,
        currentMonthSpend: 0,
        uptime: 0,
        avgResponseTime: 0,
        errorRate: 0,
      };
    }
  }

  // Create a new API key
  async createKey(data: {
    key_alias?: string;
    duration?: string;
    models?: string[];
    max_budget?: number;
    user_id?: string;
    team_id?: string;
    metadata?: any;
  }) {
    return this.request<any>('/key/generate', 'POST', data);
  }

  // Delete an API key
  async deleteKey(key: string) {
    return this.request<any>('/key/delete', 'POST', { keys: [key] });
  }

  // Update key budget/settings
  async updateKey(key: string, data: any) {
    return this.request<any>('/key/update', 'POST', { key, ...data });
  }

  // Add a model
  async addModel(data: {
    model_name: string;
    litellm_params: {
      model: string;
      api_key?: string;
      api_base?: string;
      custom_llm_provider?: string;
    };
    model_info?: any;
  }) {
    return this.request<any>('/model/new', 'POST', data);
  }

  // Delete a model
  async deleteModel(model_id: string) {
    return this.request<any>('/model/delete', 'POST', { id: model_id });
  }

  // Get health status
  async getHealth() {
    return this.request<any>('/health/liveliness', 'GET');
  }
}

export const supabaseMasterAIApi = new SupabaseMasterAIApiService();
export default supabaseMasterAIApi;