interface PasswordValidationResult {
    isValid: boolean;
    errors: string[];
}

export class PasswordValidator {
    private minLength: number;
    private specialCharacters: string[];

    constructor(minLength = 8, specialCharacters: string[] = ['$', '@', '!', '%', '*', '?', '&']) {
        this.minLength = minLength;
        this.specialCharacters = specialCharacters;
    }

    public validateWithConfirmation(password: string, confirmPassword: string): PasswordValidationResult {
        // Primero verificamos si los campos están vacíos
        if (this.isEmpty(password)) {
            return {
                isValid: false,
                errors: ["El campo de contraseña no puede estar vacío"]
            };
        }

        if (this.isEmpty(confirmPassword)) {
            return {
                isValid: false,
                errors: ["El campo de confirmación de contraseña no puede estar vacío"]
            };
        }

        // Verificamos si las contraseñas coinciden
        if (!this.doPasswordsMatch(password, confirmPassword)) {
            return {
                isValid: false,
                errors: ["Las contraseñas no coinciden"]
            };
        }

        // Si pasan las validaciones anteriores, procedemos con la validación completa
        return this.validate(password);
    }

    public validate(password: string): PasswordValidationResult {
        const errors: string[] = [];

        // Validar si está vacío
        if (this.isEmpty(password)) {
            errors.push("El campo de contraseña no puede estar vacío");
            return { isValid: false, errors };
        }

        // Validar longitud mínima
        if (!this.hasMinLength(password)) {
            errors.push(`La contraseña debe tener al menos ${this.minLength} caracteres`);
        }

        // Validar letra minúscula
        if (!this.hasLowerCase(password)) {
            errors.push("La contraseña debe contener al menos una letra minúscula");
        }

        // Validar letra mayúscula
        if (!this.hasUpperCase(password)) {
            errors.push("La contraseña debe contener al menos una letra mayúscula");
        }

        // Validar número
        if (!this.hasNumber(password)) {
            errors.push("La contraseña debe contener al menos un número");
        }

        // Validar carácter especial
        if (!this.hasSpecialChar(password)) {
            errors.push(`La contraseña debe contener al menos un carácter especial (${this.specialCharacters.join('')})`);
        }

        // Validar caracteres permitidos
        if (!this.hasValidChars(password)) {
            errors.push("La contraseña contiene caracteres no permitidos");
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    private isEmpty(value: string): boolean {
        return value.trim().length === 0;
    }

    private doPasswordsMatch(password: string, confirmPassword: string): boolean {
        return password === confirmPassword;
    }

    private hasMinLength(password: string): boolean {
        return password.length >= this.minLength;
    }

    private hasLowerCase(password: string): boolean {
        return /[a-z]/.test(password);
    }

    private hasUpperCase(password: string): boolean {
        return /[A-Z]/.test(password);
    }

    private hasNumber(password: string): boolean {
        return /\d/.test(password);
    }

    private hasSpecialChar(password: string): boolean {
        const specialCharsRegex = new RegExp(`[${this.specialCharacters.join('')}]`);
        return specialCharsRegex.test(password);
    }

    private hasValidChars(password: string): boolean {
        const validCharsRegex = new RegExp(`^[A-Za-z\\d${this.specialCharacters.join('')}]+$`);
        return validCharsRegex.test(password);
    }

    public getFormattedErrors(password: string, confirmPassword?: string): string {
        const result = confirmPassword ?
            this.validateWithConfirmation(password, confirmPassword) :
            this.validate(password);

        if (!result.isValid) {
            return `❌ Errores encontrados:\n${result.errors.join('\n')}`;
        }

        return "";
    }
}
