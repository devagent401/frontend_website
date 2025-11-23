import apiClient from '@/lib/api-client';
import { ApiResponse, Settings } from '@/types/api';

export const settingsService = {
  // Get settings
  getSettings: async (): Promise<Settings> => {
    const response = await apiClient.get<ApiResponse<Settings>>('/settings');
    return response.data.data!;
  },
};

