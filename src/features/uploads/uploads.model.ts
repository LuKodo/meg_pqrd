// Uploads feature types and business rules

export interface iUpload {
    id: number;
    fileName: string;
    fileType: UploadType;
    fileSize: number;
    uploadedBy: string;
    uploadedAt: Date;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    processedRows: number;
    totalRows: number;
    errors?: iUploadError[];
}

export type UploadType = 'forms' | 'auths' | 'requests';

export interface iUploadError {
    row: number;
    field: string;
    message: string;
}

export interface iFileValidation {
    isValid: boolean;
    errors: string[];
}

// Business rules
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.some(type => file.name.endsWith(type));
};

export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
};

export const getMaxFileSize = (type: UploadType): number => {
    const sizes: Record<UploadType, number> = {
        'forms': 10, // 10MB
        'auths': 5,  // 5MB
        'requests': 15 // 15MB
    };
    return sizes[type];
};

export const getAllowedFileTypes = (type: UploadType): string[] => {
    const types: Record<UploadType, string[]> = {
        'forms': ['.xlsx', '.xls', '.csv'],
        'auths': ['.xlsx', '.xls', '.csv'],
        'requests': ['.xlsx', '.xls', '.csv', '.pdf']
    };
    return types[type];
};
