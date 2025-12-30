import { api } from "@/http";


export class ConveyorRepository {
    constructor() { }

    async getAll(): Promise<any[]> {
        const response = await api.get<any[]>(`transport?page=1&perPage=1000000`).json();
        return response;
    }
}