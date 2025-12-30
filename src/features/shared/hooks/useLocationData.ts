import { useState, useEffect, useMemo } from 'react';
import { iDepartment, iCity } from '@/entities';
import { LocationRepository } from '@/features/shared/repositories';

export function useLocationData() {
  const [departments, setDepartments] = useState<iDepartment[]>([]);
  const [cities, setCities] = useState<iCity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const repository = useMemo(() => new LocationRepository(), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [depsResponse, citiesResponse] = await Promise.all([
          repository.getAllDep(),
          repository.getAllCities()
        ]);

        setDepartments(depsResponse);
        setCities(citiesResponse);
      } catch (error) {
        console.error('Failed to load location data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [repository]);

  const getCitiesByDepartment = async (departmentId: number) => {
    try {
      const response = await repository.getAllCitiesByDep(departmentId);
      setCities(response);
      return response;
    } catch (error) {
      console.error('Failed to load cities:', error);
      return [];
    }
  };

  return { departments, cities, loading, getCitiesByDepartment };
}
