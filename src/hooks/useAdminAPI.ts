import { useState, useEffect } from 'react';
import { adminAPI, VirtualKey, ModelEndpoint, UsageData, User } from '@/services/api';

// Hook for Available Models
export function useAvailableModels() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModels = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAvailableModels();
      setModels(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch available models');
      console.error('Error fetching available models:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return {
    models,
    loading,
    error,
    refetch: fetchModels,
  };
}

// Hook for Virtual Keys
export function useVirtualKeys() {
  const [keys, setKeys] = useState<VirtualKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKeys = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getVirtualKeys();
      setKeys(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch virtual keys');
      console.error('Error fetching virtual keys:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const createKey = async (keyData: Partial<VirtualKey>) => {
    try {
      const newKey = await adminAPI.createVirtualKey(keyData);
      await fetchKeys(); // Refresh the list
      return newKey;
    } catch (error) {
      console.error('Error creating virtual key:', error);
      throw error;
    }
  };

  const deleteKey = async (keyName: string) => {
    try {
      await adminAPI.deleteVirtualKey(keyName);
      await fetchKeys(); // Refresh the list
    } catch (error) {
      console.error('Error deleting virtual key:', error);
      throw error;
    }
  };

  const updateKey = async (keyName: string, keyData: Partial<VirtualKey>) => {
    try {
      await adminAPI.updateVirtualKey(keyName, keyData);
      await fetchKeys(); // Refresh the list
    } catch (error) {
      console.error('Error updating virtual key:', error);
      throw error;
    }
  };

  return {
    keys,
    loading,
    error,
    refetch: fetchKeys,
    createKey,
    deleteKey,
    updateKey,
  };
}

// Hook for Models
export function useModels() {
  const [models, setModels] = useState<ModelEndpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModels = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getModels();
      setModels(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch models');
      console.error('Error fetching models:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const addModel = async (modelData: ModelEndpoint) => {
    try {
      const newModel = await adminAPI.addModel(modelData);
      await fetchModels(); // Refresh the list
      return newModel;
    } catch (error) {
      console.error('Error adding model:', error);
      throw error;
    }
  };

  const updateModel = async (modelName: string, modelData: Partial<ModelEndpoint>) => {
    try {
      await adminAPI.updateModel(modelName, modelData);
      await fetchModels(); // Refresh the list
    } catch (error) {
      console.error('Error updating model:', error);
      throw error;
    }
  };

  const deleteModel = async (modelName: string) => {
    try {
      await adminAPI.deleteModel(modelName);
      await fetchModels(); // Refresh the list
    } catch (error) {
      console.error('Error deleting model:', error);
      throw error;
    }
  };

  return {
    models,
    loading,
    error,
    refetch: fetchModels,
    addModel,
    updateModel,
    deleteModel,
  };
}

// Hook for Usage Data
export function useUsageData(startDate?: string, endDate?: string) {
  const [usage, setUsage] = useState<UsageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsage = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getUsageData(startDate, endDate);
      setUsage(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch usage data');
      console.error('Error fetching usage data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsage();
  }, [startDate, endDate]);

  return {
    usage,
    loading,
    error,
    refetch: fetchUsage,
  };
}

// Hook for Users Management
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData: Partial<User>) => {
    try {
      const newUser = await adminAPI.createUser(userData);
      await fetchUsers(); // Refresh the list
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const updateUser = async (userId: string, userData: Partial<User>) => {
    try {
      await adminAPI.updateUser(userId, userData);
      await fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await adminAPI.deleteUser(userId);
      await fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}

// Hook for Key Testing
export function useKeyTester() {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [testError, setTestError] = useState<string | null>(null);

  const testKey = async (key: string, model?: string) => {
    try {
      setTesting(true);
      setTestError(null);
      const result = await adminAPI.testKey(key, model);
      setTestResult(result);
      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Key test failed';
      setTestError(errorMsg);
      throw error;
    } finally {
      setTesting(false);
    }
  };

  return {
    testing,
    testResult,
    testError,
    testKey,
  };
}
