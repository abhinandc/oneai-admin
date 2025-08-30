// LiteLLM API Service
const LITELLM_BASE_URL = '/api';
const MASTER_KEY = 'ZmM2jGn1wXqVzaxKdDTCvR7YgU9Lkbs3hQfeuSJFP40IBp6i';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class LiteLLMApiService {
  private headers = {
    'Authorization': `Bearer ${MASTER_KEY}`,
    'Content-Type': 'application/json',
  };

  // Helper method for API calls
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${LITELLM_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Get all API keys
  async getKeys() {
    return this.request<any>('/key/info');
  }

  // Get key stats
  async getKeyStats() {
    const response = await this.request<any>('/global/spend');
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
    return this.request<any>('/model/info');
  }

  // Get usage/spend data
  async getSpend(start_date?: string, end_date?: string) {
    const params = new URLSearchParams();
    if (start_date) params.append('start_date', start_date);
    if (end_date) params.append('end_date', end_date);
    
    return this.request<any>(`/global/spend?${params.toString()}`);
  }

  // Get users/team members
  async getTeamMembers() {
    return this.request<any>('/team/info');
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
      const totalKeys = keysResponse.data?.length || 0;
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
        uptime: 99.9, // This could come from a monitoring endpoint
        avgResponseTime: 234, // This could come from metrics
        errorRate: 0.02, // This could come from logs
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Return default values on error
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
    return this.request<any>('/key/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Delete an API key
  async deleteKey(key: string) {
    return this.request<any>('/key/delete', {
      method: 'POST',
      body: JSON.stringify({ keys: [key] }),
    });
  }

  // Update key budget/settings
  async updateKey(key: string, data: any) {
    return this.request<any>('/key/update', {
      method: 'POST',
      body: JSON.stringify({ key, ...data }),
    });
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
    return this.request<any>('/model/new', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Delete a model
  async deleteModel(model_id: string) {
    return this.request<any>('/model/delete', {
      method: 'POST',
      body: JSON.stringify({ id: model_id }),
    });
  }

  // Get health status
  async getHealth() {
    return this.request<any>('/health/liveliness');
  }
}

export const litellmApi = new LiteLLMApiService();
export default litellmApi;