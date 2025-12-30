import type { iUser } from "@/entities";
import { api } from "@/http";

export class UserRepository {
    constructor() { }

    async fetchAllUsers(): Promise<iUser[]> {
        const response = await api.get<iUser[]>("/user").json();
        return response;
    }
}