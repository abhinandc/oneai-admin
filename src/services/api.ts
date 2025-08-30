// OneAI Admin API Service
// Connects to LiteLLM backend for admin operations

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const LITELLM_MASTER_KEY = 'ZmM2jGn1wXqVzaxKdDTCvR7YgU9Lkbs3hQfeuSJFP40IBp6i';

// Types
export interface VirtualKey {
  key_name: string;
  key_alias?: string;
  team_id?: string;
  user_id?: string;
  models: string[];
  spend?: number;
  max_budget?: number;
  budget_duration?: string;
  budget_reset_at?: string;
  created_at?: string;
  expires?: string;
  metadata?: Record<string, any>;
}

export interface ModelEndpoint {
  model_name: string;
  litellm_params: {
    model: string;
    api_base?: string;
    api_key?: string;
    timeout?: number;
    max_tokens?: number;
    temperature?: number;
  };
  model_info?: {
    id?: string;
    mode?: string;
    cost?: {
      input_cost_per_token?: number;
      output_cost_per_token?: number;
    };
  };
}

export interface UsageData {
  key_name: string;
  spend: number;
  total_requests: number;
  model: string;
  date: string;
}

export interface User {
  user_id: string;
  user_email: string;
  user_role: string;
  teams?: string[];
  spend?: number;
  max_budget?: number;
  created_at?: string;
}

// API Client Class
class OneAIAdminAPI {
  private baseURL: string;
  private masterKey: string;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.masterKey = LITELLM_MASTER_KEY;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.masterKey}`,
      ...options.headers,
    };

    console.log(`OneAI Admin API Request: ${options.method || 'GET'} ${url}`);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OneAI Admin API Error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  // Virtual Keys Management
  async getVirtualKeys(): Promise<VirtualKey[]> {
    try {
      const response = await this.request('/key/info');
      return response.data || response || [];
    } catch (error) {
      console.error('Failed to fetch virtual keys:', error);
      return [];
    }
  }

  async createVirtualKey(keyData: Partial<VirtualKey>): Promise<VirtualKey> {
    return this.request('/key/generate', {
      method: 'POST',
      body: JSON.stringify(keyData),
    });
  }

  async updateVirtualKey(keyName: string, keyData: Partial<VirtualKey>): Promise<VirtualKey> {
    return this.request(`/key/update`, {
      method: 'POST',
      body: JSON.stringify({
        key: keyName,
        ...keyData,
      }),
    });
  }

  async deleteVirtualKey(keyName: string): Promise<void> {
    return this.request(`/key/delete`, {
      method: 'POST',
      body: JSON.stringify({ key: keyName }),
    });
  }

  // Models Management
  async getModels(): Promise<ModelEndpoint[]> {
    try {
      const response = await this.request('/model/info');
      return response.data || response || [];
    } catch (error) {
      console.error('Failed to fetch models:', error);
      return [];
    }
  }

  async getAvailableModels(): Promise<any[]> {
    try {
      const response = await this.request('/v1/models');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch available models:', error);
      return [];
    }
  }

  async addModel(modelData: ModelEndpoint): Promise<ModelEndpoint> {
    return this.request('/model/new', {
      method: 'POST',
      body: JSON.stringify(modelData),
    });
  }

  async updateModel(modelName: string, modelData: Partial<ModelEndpoint>): Promise<ModelEndpoint> {
    return this.request(`/model/update`, {
      method: 'POST',
      body: JSON.stringify({
        model_name: modelName,
        ...modelData,
      }),
    });
  }

  async deleteModel(modelName: string): Promise<void> {
    return this.request(`/model/delete`, {
      method: 'POST',
      body: JSON.stringify({ model_name: modelName }),
    });
  }

  // Usage Analytics
  async getUsageData(startDate?: string, endDate?: string): Promise<UsageData[]> {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      
      const response = await this.request(`/spend/logs?${params.toString()}`);
      return response.data || response || [];
    } catch (error) {
      console.error('Failed to fetch usage data:', error);
      return [];
    }
  }

  // Users Management
  async getUsers(): Promise<User[]> {
    try {
      const response = await this.request('/user/info');
      return response.data || response || [];
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return this.request('/user/new', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    return this.request(`/user/update`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        ...userData,
      }),
    });
  }

  async deleteUser(userId: string): Promise<void> {
    return this.request(`/user/delete`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId }),
    });
  }

  // Key Testing
  async testKey(key: string, model?: string): Promise<any> {
    const testModel = model || 'local/qwen-2.5-coder-14b';
    
    return this.request('/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: testModel,
        messages: [
          {
            role: 'user',
            content: 'Test message for key validation'
          }
        ],
        max_tokens: 10,
        temperature: 0.1
      }),
    });
  }

  // Health Check
  async healthCheck(): Promise<any> {
    return this.request('/health');
  }
}

// Export singleton instance
export const adminAPI = new OneAIAdminAPI();

// Export types for use in components
export type { VirtualKey, ModelEndpoint, UsageData, User };
