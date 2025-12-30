// Configuration feature presentation/formatting logic

/**
 * Format theme for display
 */
export const formatTheme = (theme: 'light' | 'dark'): string => {
    return theme === 'light' ? 'Claro' : 'Oscuro';
};

/**
 * Format language for display
 */
export const formatLanguage = (language: 'es' | 'en'): string => {
    const languageMap = {
        'es': 'Español',
        'en': 'English'
    };
    return languageMap[language];
};

/**
 * Format boolean setting for display
 */
export const formatBooleanSetting = (value: boolean): string => {
    return value ? 'Activado' : 'Desactivado';
};

/**
 * Get status badge color for boolean settings
 */
export const getBooleanBadgeColor = (value: boolean): string => {
    return value
        ? 'bg-green-100 text-green-800'
        : 'bg-gray-100 text-gray-800';
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
    if (phone.length === 10) {
        return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
    }
    return phone;
};

/**
 * Mask password for display
 */
export const maskPassword = (length: number = 8): string => {
    return '•'.repeat(length);
};
