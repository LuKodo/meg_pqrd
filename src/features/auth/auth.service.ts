import { getProfileRequest, loginRequest } from "./auth.api"
import { jwtDecode } from "jwt-decode"
import { HTTPError } from "ky"
import type { iUser } from "./types"

export async function login(username: string, password: string): Promise<{ token: string }> {
    if (!username) {
        throw new AuthError(AuthErrorCode.REQUIRED_FIELDS, 'El usuario es requerido')
    }

    if (!password) {
        throw new AuthError(AuthErrorCode.REQUIRED_FIELDS, 'La contraseña es requerida')
    }

    try {
        const data = await loginRequest({ username, password })
        return { token: data.access_token }
    } catch (error) {
        if (error instanceof HTTPError) {
            if (error.response.status === 401) {
                throw new AuthError(AuthErrorCode.UNAUTHORIZED, 'Credenciales incorrectas')
            }
        }

        throw new AuthError(AuthErrorCode.UNKNOWN)
    }
}

export async function getProfile(token: string) {
    const user = getUser(token)
    const profile = await getProfileRequest()
    return { ...user, ...profile }
}

export const getUser = (token: string) => jwtDecode(token) as iUser;

export const authErrorMessages: Record<AuthErrorCode, string> = {
  INVALID_EMAIL: 'Correo inválido',
  INVALID_PASSWORD: 'La contraseña no es correcta',
  USER_NOT_FOUND: 'Usuario no encontrado',
  UNAUTHORIZED: 'Credenciales incorrectas',
  UNKNOWN: 'Ocurrió un error inesperado',
  REQUIRED_FIELDS: 'Todos los campos son obligatorios'
}

export enum AuthErrorCode {
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    UNAUTHORIZED = 'UNAUTHORIZED',
    UNKNOWN = 'UNKNOWN',
    REQUIRED_FIELDS = 'REQUIRED_FIELDS',
}

export class AuthError extends Error {
    constructor(
        public code: AuthErrorCode,
        message?: string
    ) {
        super(message)
    }
}
