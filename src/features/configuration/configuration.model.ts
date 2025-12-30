// Configuration feature types and business rules

export interface iConfiguration {
    userId: number;
    theme: 'light' | 'dark';
    language: 'es' | 'en';
    notifications: boolean;
    emailNotifications: boolean;
}

export interface iAccountSettings {
    name: string;
    email: string;
    phone?: string;
    department?: string;
    position?: string;
}

export interface iPasswordChange {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

// Business rules
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
};

export const validatePasswordMatch = (password: string, confirm: string): boolean => {
    return password === confirm && password.length >= 6;
};
