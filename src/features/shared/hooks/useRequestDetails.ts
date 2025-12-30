import { useState, useEffect } from 'react';
import { iRequestView } from '@/entities';
import { RequestApiRepository } from '@/features/shared/repositories';
import { httpClient } from '@/http';

export function useRequestDetails(requestId: string | undefined) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [request, setRequest] = useState<iRequestView | null>(null);
  const [isPQR, setIsPQR] = useState<boolean>(false);


  useEffect(() => {
    if (!requestId) {
      setLoading(false);
      return;
    }

    const fetchRequest = async () => {
      try {
        setLoading(true);
        const repository = new RequestApiRepository(httpClient);

        const response = await repository.getDetails(requestId);
        setIsPQR(response.channel.toLocaleUpperCase() === 'PQRS');
        setRequest(response);
        setError(null);
      } catch (err) {
        setError('Failed to load request details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [requestId]);

  return { request, loading, error, setRequest, isPQR };
}
