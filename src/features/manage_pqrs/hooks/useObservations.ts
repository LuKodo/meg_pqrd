import { Observation, ObservationManage } from "@/entities/Observations";
import { httpClient } from "@/http";
import { PaginatedData } from "@entities";
import { useEffect, useState } from "react";

export const useObservations = () => {
    const [observations, setObservations] = useState<Observation[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchObservations();
    }, []);

    const fetchObservations = async () => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const observations = await httpClient.get<Observation[]>(`pqrs-observations`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }).json();
            setObservations(observations);
        } catch (error: any) {
            console.error(error);
            setErrorMessage("Ocurrió un error inesperado.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { observations, loading, errorMessage };
};

export const useObservationsManage = (role: string, page: number, limit: number) => {
    const [requestObservations, setRequestObservations] = useState<PaginatedData<ObservationManage>>();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchRequestObservations();
    }, [page, limit]);

    const fetchRequestObservations = async () => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const observations = await httpClient.get<PaginatedData<ObservationManage>>(`pqrs-manage/${page}/${limit}/${role}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }).json();
            console.log(observations);
            setRequestObservations(observations);
        } catch (error: any) {
            console.error(error);
            setErrorMessage("Ocurrió un error inesperado.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateRequestObservations = async (observationId: number, data: any) => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const observations = await httpClient.put<PaginatedData<ObservationManage>>(`pqrs-manage/${observationId}/${role}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify(data),
            }).json();
            setRequestObservations(observations);
        } catch (error: any) {
            console.error(error);
            setErrorMessage("Ocurrió un error inesperado.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { requestObservations, loading, errorMessage, updateRequestObservations };
};