import apiClient from '@/lib/api-client';
import { ApiResponse, Product, ProductQueryParams } from '@/types/api';

export const productsService = {
    // Get all products
    getProducts: async (params?: ProductQueryParams): Promise<ApiResponse<Product[]>> => {
        const response = await apiClient.get<ApiResponse<Product[]>>('/products', {
            params: {
                ...params,
                publish: true, // Only get published products for website
            },
        });
        return response.data;
    },

    // Get product by ID
    getProductById: async (id: string): Promise<Product> => {
        const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
        return response.data.data!;
    },

    // Get product by slug
    getProductBySlug: async (slug: string): Promise<Product> => {
        const response = await apiClient.get<ApiResponse<Product>>(`/products/slug/${slug}`);
        return response.data.data!;
    },

    // Get featured products
    getFeaturedProducts: async (limit: number = 12): Promise<Product[]> => {
        const response = await apiClient.get<ApiResponse<Product[]>>('/products', {
            params: {
                featured: true,
                publish: true,
                limit,
            },
        });
        return response.data.data || [];
    },

    // Get products by category
    getProductsByCategory: async (categoryId: string, params?: ProductQueryParams): Promise<ApiResponse<Product[]>> => {
        const response = await apiClient.get<ApiResponse<Product[]>>('/products', {
            params: {
                ...params,
                category: categoryId,
                publish: true,
            },
        });
        return response.data;
    },

    // Get products by brand
    getProductsByBrand: async (brandId: string, params?: ProductQueryParams): Promise<ApiResponse<Product[]>> => {
        const response = await apiClient.get<ApiResponse<Product[]>>('/products', {
            params: {
                ...params,
                brand: brandId,
                publish: true,
            },
        });
        return response.data;
    },

    // Search products
    searchProducts: async (query: string, params?: ProductQueryParams): Promise<ApiResponse<Product[]>> => {
        const response = await apiClient.get<ApiResponse<Product[]>>('/products', {
            params: {
                ...params,
                q: query,
                publish: true,
            },
        });
        return response.data;
    },
};

