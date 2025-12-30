// Uploads feature presentation/formatting logic
import type { UploadType, iUpload } from './uploads.model';

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format upload type for display
 */
export const formatUploadType = (type: UploadType): string => {
    const typeMap: Record<UploadType, string> = {
        'forms': 'Formularios',
        'auths': 'Autorizaciones',
        'requests': 'Solicitudes'
    };
    return typeMap[type];
};

/**
 * Format upload status for display
 */
export const formatUploadStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
        'pending': 'Pendiente',
        'processing': 'Procesando',
        'completed': 'Completado',
        'failed': 'Fallido'
    };
    return statusMap[status] || status;
};

/**
 * Get upload status badge color
 */
export const getUploadStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'processing': 'bg-blue-100 text-blue-800',
        'completed': 'bg-green-100 text-green-800',
        'failed': 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Format upload progress
 */
export const formatUploadProgress = (upload: iUpload): string => {
    if (upload.totalRows === 0) return '0%';
    const percentage = (upload.processedRows / upload.totalRows) * 100;
    return `${percentage.toFixed(1)}%`;
};

/**
 * Get file icon based on extension
 */
export const getFileIcon = (fileName: string): string => {
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        return '📊';
    }
    if (fileName.endsWith('.csv')) {
        return '📄';
    }
    if (fileName.endsWith('.pdf')) {
        return '📕';
    }
    return '📁';
};

/**
 * Format error count
 */
export const formatErrorCount = (count: number): string => {
    if (count === 0) return 'Sin errores';
    return `${count} ${count === 1 ? 'error' : 'errores'}`;
};
