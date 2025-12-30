import { useQuery } from '@tanstack/react-query';
import { iModel } from '@/entities';
import { ModelRepository } from '@/features/shared/repositories';
import { useMemo } from 'react';

export function useModels() {
  const repository = useMemo(() => new ModelRepository(), []);

  return useQuery<iModel[], Error>({
    queryKey: ['models'],
    queryFn: async () => repository.getAll(),
    staleTime: 1000 * 60 * 5,
  });
}