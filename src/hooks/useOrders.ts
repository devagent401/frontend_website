import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService } from '@/services/orders.service';
import { CreateOrderInput } from '@/types/api';

export const useUserOrders = (params?: { page?: number; limit?: number; status?: string }) => {
  return useQuery({
    queryKey: ['orders', 'user', params],
    queryFn: () => ordersService.getUserOrders(params),
    staleTime: 60 * 1000, // 1 minute
  });
};

export const useOrder = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersService.getOrderById(id),
    enabled: enabled && !!id,
    staleTime: 60 * 1000,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderInput) => ordersService.createOrder(data),
    onSuccess: () => {
      // Invalidate orders cache
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useTrackOrder = (orderNumber: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['order', 'track', orderNumber],
    queryFn: () => ordersService.trackOrder(orderNumber),
    enabled: enabled && !!orderNumber,
    staleTime: 30 * 1000, // 30 seconds
  });
};

