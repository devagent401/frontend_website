import apiClient from '@/lib/api-client';
import { ApiResponse, Blog, BlogCategory } from '@/types/api';

export const blogsService = {
  // Get all blogs
  getBlogs: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    tag?: string;
    search?: string;
  }): Promise<ApiResponse<Blog[]>> => {
    const response = await apiClient.get<ApiResponse<Blog[]>>('/blogs', {
      params: {
        ...params,
        status: 'published', // Only get published blogs
      },
    });
    return response.data;
  },

  // Get blog by ID
  getBlogById: async (id: string): Promise<Blog> => {
    const response = await apiClient.get<ApiResponse<Blog>>(`/blogs/${id}`);
    return response.data.data!;
  },

  // Get blog by slug
  getBlogBySlug: async (slug: string): Promise<Blog> => {
    const response = await apiClient.get<ApiResponse<Blog>>(`/blogs/slug/${slug}`);
    return response.data.data!;
  },

  // Get blog categories
  getBlogCategories: async (): Promise<ApiResponse<BlogCategory[]>> => {
    const response = await apiClient.get<ApiResponse<BlogCategory[]>>('/blog-categories', {
      params: {
        status: 'active',
      },
    });
    return response.data;
  },
};

