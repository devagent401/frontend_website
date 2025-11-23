import { useQuery } from '@tanstack/react-query';
import { brandsService } from '@/services/brands.service';

export const useBrands = (params?: { page?: number; limit?: number; status?: string }) => {
  return useQuery({
    queryKey: ['brands', params],
    queryFn: () => brandsService.getBrands(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useBrand = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['brand', id],
    queryFn: () => brandsService.getBrandById(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000,
  });
};

