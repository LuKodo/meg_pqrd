import { api } from "@/http";
import { LoginDTO } from "./types";

export const loginRequest = (data: LoginDTO) =>
    api.post<{ access_token: string }>('auth/login', { json: data }).json()

export const getProfileRequest = () =>
    api.get<{ role: any, modules: any, headquarter: any }>('auth/profile').json()
