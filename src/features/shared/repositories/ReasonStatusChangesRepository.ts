import { type iReasonsRequest } from "@/entities/Request";
import { api } from "@/http";

export class ReasonStatusChangesRepository {
    constructor() { }

    async getByStatus(statusId: number): Promise<iReasonsRequest[]> {
        const response = await api.get<iReasonsRequest[]>(`/reason-for-status-changes?statusId=${statusId}&page=1&perPage=10000`).json();
        return response;
    }
}