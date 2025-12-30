// Auth feature types and business rules

export interface iUser {
    id: number;
    username: string;
    name: string;
    mail: string;
    audipharma: boolean;
    modules?: string[];
    role?: string[];
    createdAt: string;
    updatedAt: string;
    exp: number;
    headquarter: string;
    iat: number;
    status: string;
}

export interface iErrorAuth {
    message: string;
    code?: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: iUser;
}

// Business rules
export const validateUsername = (username: string): boolean => {
    return username.length >= 3;
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const hasAudipharmaAccess = (user: iUser): boolean => {
    return user.audipharma === true;
};

export type LoginDTO = {
    username: string;
    password: string;
};
