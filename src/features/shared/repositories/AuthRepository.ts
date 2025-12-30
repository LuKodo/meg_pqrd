import { api } from "@/http";

export class AuthRepository {
  constructor() { }

  async login(username: string, password: string): Promise<string> {
    try {
      const response = await api.post<{ access_token: string }>(`auth/login`, {
        json: {
          username,
          password,
        }
      }).json();

      return response.access_token;
    } catch (error: any) {
      console.error(error);
      throw new Error("Ocurrió un error inesperado.");
    }
  }

  async getProfile(): Promise<any> {
    try {
      const response = await api.get<{ data: any }>(`auth/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }).json();

      return response;
    } catch (error: any) {
      console.error(error);
    }
  }
}
