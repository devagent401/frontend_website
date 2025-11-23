import apiClient from '@/lib/api-client';
import { ApiResponse, Order, CreateOrderInput } from '@/types/api';

export const ordersService = {
  // Get user orders
  getUserOrders: async (params?: { page?: number; limit?: number; status?: string }): Promise<ApiResponse<Order[]>> => {
    const response = await apiClient.get<ApiResponse<Order[]>>('/orders/my-orders', {
      params,
    });
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id: string): Promise<Order> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data.data!;
  },

  // Create order
  createOrder: async (data: CreateOrderInput): Promise<Order> => {
    const response = await apiClient.post<ApiResponse<Order>>('/orders', data);
    return response.data.data!;
  },

  // Track order
  trackOrder: async (orderNumber: string): Promise<Order> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/track/${orderNumber}`);
    return response.data.data!;
  },
};

