import apiClient from '@/lib/api-client';
import { ApiResponse, Brand } from '@/types/api';

export const brandsService = {
  // Get all brands
  getBrands: async (params?: { page?: number; limit?: number; status?: string }): Promise<ApiResponse<Brand[]>> => {
    const response = await apiClient.get<ApiResponse<Brand[]>>('/brands', {
      params: {
        ...params,
        status: 'active', // Only get active brands
      },
    });
    return response.data;
  },

  // Get brand by ID
  getBrandById: async (id: string): Promise<Brand> => {
    const response = await apiClient.get<ApiResponse<Brand>>(`/brands/${id}`);
    return response.data.data!;
  },

  // Get brand by slug
  getBrandBySlug: async (slug: string): Promise<Brand> => {
    const response = await apiClient.get<ApiResponse<Brand>>(`/brands/slug/${slug}`);
    return response.data.data!;
  },
};

