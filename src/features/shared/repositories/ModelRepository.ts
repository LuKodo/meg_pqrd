import { iModel } from "@/entities";
import { api } from "@/http";

export class ModelRepository {
  constructor() { }

  async getAll(): Promise<iModel[]> {
    const response = await api.get<iModel[]>(`models?page=1&perPage=1000000`).json();
    return response;
  }
}