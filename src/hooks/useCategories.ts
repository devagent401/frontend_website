import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '@/services/categories.service';

export const useCategories = (params?: { flat?: boolean; status?: string }) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => categoriesService.getCategories(params),
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
  });
};

export const useCategory = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesService.getCategoryById(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCategoryBySlug = (slug: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['category', 'slug', slug],
    queryFn: () => categoriesService.getCategoryBySlug(slug),
    enabled: enabled && !!slug,
    staleTime: 10 * 60 * 1000,
  });
};

