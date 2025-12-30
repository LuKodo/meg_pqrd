import type { iHeadquarter } from "@/entities";
import { api } from "@/http";

export class SafRepository {
    constructor() { }

    async fetchAllSAF(): Promise<Array<iHeadquarter>> {
        const response = await api.get<iHeadquarter[]>(`/headquarter?page=1&pageSize=1000000`).json();
        return response;
    }
}