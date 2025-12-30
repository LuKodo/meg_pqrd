import { FilterDto, URLBuilder } from "@/utils";
import { PaginatedData } from "@/entities/PaginateData";
import { Product } from "@/entities/Product";
import { Balance } from "@/entities/Balance";
import { api } from "@/http";

export class ProductRepository {
    constructor() { }

    async getProducts(): Promise<Product[]> {
        const response = await api.get<Product[]>(`product?page=1&perPage=1000000`).json();
        return response;
    }
    async getProductByParam(filters: FilterDto[], page: number, perPage: number): Promise<PaginatedData<Product>> {
        const response = await api.post<PaginatedData<Product>>(`product/params/${page}/${perPage}`, { json: filters }).json();
        return response;
    }
    async getBalance(page: number, perPage: number): Promise<Balance[]> {
        const response = await api.get<Balance[]>(`balance?${URLBuilder.queryParams({ page, perPage })}`).json();
        return response;
    }
    async saveBalance(data: { balance: Balance[], user: string }): Promise<{ success: number, failed: number }> {
        const response = await api.post<{ success: number, failed: number }>(`balance`, { json: data }).json();
        return response;
    }
}