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
