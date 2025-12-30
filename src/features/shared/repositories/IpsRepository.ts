import { api } from "@/http";
import { iIPS, PaginatedData } from "@/entities";

export class IpsRepository {
    constructor() { }

    async getIps() {
        const response = await api.get<PaginatedData<iIPS>>(`ips?page=1&perPage=1000000`).json();
        return response;
    }
}