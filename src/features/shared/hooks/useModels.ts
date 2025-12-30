import { useQuery } from '@tanstack/react-query';
import { iModel } from '@/entities';
import { ModelRepository } from '@/features/shared/repositories';
import { httpClient } from '@/http';

export function useModels() {
  const repository = new ModelRepository(httpClient);

  return useQuery<iModel[], Error>({
    queryKey: ['models'],
    queryFn: async () => repository.getAll(),
    staleTime: 1000 * 60 * 5,
  });
}