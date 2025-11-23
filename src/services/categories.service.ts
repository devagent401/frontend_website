import apiClient from '@/lib/api-client';
import { ApiResponse, Category } from '@/types/api';

export const categoriesService = {
    // Get all categories
    getCategories: async (params?: { flat?: boolean; status?: string }): Promise<ApiResponse<Category[]>> => {
        const response = await apiClient.get<ApiResponse<Category[]>>('/categories', {
            params: {
                ...params,
                status: 'active', // Only get active categories
            },
        });
        return response.data;
    },

    // Get category by ID
    getCategoryById: async (id: string): Promise<Category> => {
        const response = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
        return response.data.data!;
    },

    // Get category by slug
    getCategoryBySlug: async (slug: string): Promise<Category> => {
        const response = await apiClient.get<ApiResponse<Category>>(`/categories/slug/${slug}`);
        return response.data.data!;
    },

    // Get category products
    getCategoryProducts: async (id: string, params?: any): Promise<ApiResponse<any>> => {
        const response = await apiClient.get<ApiResponse<any>>(`/categories/${id}/products`, {
            params,
        });
        return response.data;
    },
};

