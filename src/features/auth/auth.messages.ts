import { AuthErrorCode } from './auth.errors'

export const authErrorMessages: Record<AuthErrorCode, string> = {
  INVALID_EMAIL: 'Correo inválido',
  INVALID_PASSWORD: 'La contraseña no es correcta',
  USER_NOT_FOUND: 'Usuario no encontrado',
  UNAUTHORIZED: 'Credenciales incorrectas',
  UNKNOWN: 'Ocurrió un error inesperado',
  REQUIRED_FIELDS: 'Todos los campos son obligatorios'
}
