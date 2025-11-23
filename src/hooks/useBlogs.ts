import { useQuery } from '@tanstack/react-query';
import { blogsService } from '@/services/blogs.service';

export const useBlogs = (params?: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: () => blogsService.getBlogs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBlog = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogsService.getBlogById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBlogBySlug = (slug: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['blog', 'slug', slug],
    queryFn: () => blogsService.getBlogBySlug(slug),
    enabled: enabled && !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blogCategories'],
    queryFn: () => blogsService.getBlogCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

