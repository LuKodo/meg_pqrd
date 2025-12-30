import { Observation, ObservationManage } from "@/entities/Observations";
import { api } from "@/http";
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
            const data = await api.get(`pqrs-observations`).json<Observation[]>();
            setObservations(data);
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
    }, [page, limit, role]);

    const fetchRequestObservations = async () => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const data = await api.get(`pqrs-manage/${page}/${limit}/${role}`).json<PaginatedData<ObservationManage>>();
            setRequestObservations(data);
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
            const updatedData = await api.put(`pqrs-manage/${observationId}/${role}`, {
                json: data,
            }).json<PaginatedData<ObservationManage>>();
            setRequestObservations(updatedData);
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