import { AuthError, AuthErrorCode } from "./auth.errors"
import { getProfileRequest, loginRequest } from "./auth.api"
import { jwtDecode } from "jwt-decode"
import { iUser } from "./types"
import { HTTPError } from "ky"

export async function login(username: string, password: string): Promise<{ token: string, user: iUser }> {
    if (!username) {
        throw new AuthError(AuthErrorCode.REQUIRED_FIELDS, 'El usuario es requerido')
    }

    if (!password) {
        throw new AuthError(AuthErrorCode.REQUIRED_FIELDS, 'La contraseña es requerida')
    }

    try {
        const data = await loginRequest({ username, password })
        const profile = await getProfileRequest()
        const user = getUser(data.access_token)
        return { token: data.access_token, user: { ...user, ...profile } }
    } catch (error) {
        if (error instanceof HTTPError) {
            if (error.response.status === 401) {
                throw new AuthError(AuthErrorCode.UNAUTHORIZED, 'Credenciales incorrectas')
            }
        }

        throw new AuthError(AuthErrorCode.UNKNOWN)
    }
}

export const getUser = (token: string) => jwtDecode(token) as iUser;
