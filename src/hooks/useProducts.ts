import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/services/products.service';
import { ProductQueryParams } from '@/types/api';

export const useProducts = (params?: ProductQueryParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsService.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsService.getProductById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductBySlug = (slug: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['product', 'slug', slug],
    queryFn: () => productsService.getProductBySlug(slug),
    enabled: enabled && !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedProducts = (limit?: number) => {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: () => productsService.getFeaturedProducts(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProductsByCategory = (categoryId: string, params?: ProductQueryParams) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId, params],
    queryFn: () => productsService.getProductsByCategory(categoryId, params),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductsByBrand = (brandId: string, params?: ProductQueryParams) => {
  return useQuery({
    queryKey: ['products', 'brand', brandId, params],
    queryFn: () => productsService.getProductsByBrand(brandId, params),
    enabled: !!brandId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchProducts = (query: string, params?: ProductQueryParams) => {
  return useQuery({
    queryKey: ['products', 'search', query, params],
    queryFn: () => productsService.searchProducts(query, params),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

