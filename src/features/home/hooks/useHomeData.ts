import { useEffect, useState } from "react";
import { useSessionManager } from "@/features/shared/hooks/useSessionManager";
import type { iRequestView } from "@/entities";
import { RequestApiRepository } from "@/features/shared/repositories";
import { httpClient } from "@/http";


export const useHomeData = () => {
    const { userData } = useSessionManager();
    const [requests, setRequests] = useState<iRequestView[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const requestRepository = new RequestApiRepository(httpClient);
    const username = userData?.username;

    useEffect(() => {
        if (!username) return;
        getData(username);
    }, [username]);

    const getData = async (username: string): Promise<void> => {
        try {
            setLoading(true);
            const data = await requestRepository.getStats(username);
            setRequests(data.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return { requests, getData, loading };
}