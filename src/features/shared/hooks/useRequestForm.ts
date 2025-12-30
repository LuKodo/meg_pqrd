import { useState, useEffect } from 'react';
import { iRequestView } from '@/entities';

export function useRequestForm(request: iRequestView | null) {
  const [model, setModel] = useState<number>(0);
  const [city, setCity] = useState<number>(0);
  const [department, setDepartment] = useState<number>(0);
  const [affiliateAddress, setAffiliateAddress] = useState<string>('');
  const [ipsAddress, setIpsAddress] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [channel, setChannel] = useState<string>('MEG');

  useEffect(() => {
    if (request) {
      request.modelId && setModel(request.modelId);
      request.cityId && setCity(request.cityId);
      request.departmentId && setDepartment(request.departmentId);
      request.channel && setChannel(request.channel.toUpperCase());
      setIpsAddress(request.address);
      setAffiliateAddress(request.address ?? '');
      setName(request.name);
    }
  }, [request]);

  return {
    model,
    setModel,
    city,
    setCity,
    department,
    setDepartment,
    affiliateAddress,
    setAffiliateAddress,
    ipsAddress,
    setIpsAddress,
    name,
    setName,
    channel,
    setChannel,
  };
}