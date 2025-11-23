import { useQuery } from '@tanstack/react-query';
import { settingsService } from '@/services/settings.service';

export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsService.getSettings(),
    staleTime: 30 * 60 * 1000, // 30 minutes - settings rarely change
    retry: 1,
  });
};

