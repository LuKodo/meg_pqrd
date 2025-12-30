import { type iCity, type iDepartment } from "@/entities";
import { api } from "@/http";

export class LocationRepository {
    constructor() { }

    async getAllCitiesByDep(dep: number): Promise<iCity[]> {
        const params = [{
            param: "departmentId",
            value: dep.toString(),
            operator: "eq"
        }];
        const response = await api.post<iCity[]>(`city/params`, { json: params }).json();
        return response;
    }

    async getAllCities(): Promise<iCity[]> {
        const response = await api.get<iCity[]>(`city?page=1&pageSize=1000000`).json();
        return response;
    }

    async getAllDep(): Promise<iDepartment[]> {
        const response = await api.get<iDepartment[]>(`department?page=1&perPage=1000000`).json();
        return response;
    }
}