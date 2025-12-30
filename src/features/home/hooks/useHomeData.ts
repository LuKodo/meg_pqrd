import { useEffect, useState, useMemo } from "react";
import { useSessionManager } from "@/features/shared/hooks/useSessionManager";
import type { iRequestView } from "@/entities";
import { RequestApiRepository } from "@/features/shared/repositories";

export const useHomeData = () => {
    const { userData } = useSessionManager();
    const [requests, setRequests] = useState<iRequestView[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const requestRepository = useMemo(() => new RequestApiRepository(), []);
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