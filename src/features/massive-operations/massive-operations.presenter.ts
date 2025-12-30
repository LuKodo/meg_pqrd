// Massive operations feature presentation/formatting logic
import type { MassiveOperationType, iMassiveOperation } from './massive-operations.model';

/**
 * Format operation type for display
 */
export const formatOperationType = (type: MassiveOperationType): string => {
    const typeMap: Record<MassiveOperationType, string> = {
        'OpenToProgrammed': 'Abierto → Programado',
        'ProgrammedToSend': 'Programado → Enviado',
        'SendedToDelivered': 'Enviado → Entregado',
        'DigitedToSend': 'Digitado → Enviado',
        'IPSToOpen': 'IPS → Abierto',
        'DeliveredToApply': 'Entregado → Aplicado',
        'ProgrammedToDigited': 'Programado → Digitado'
    };
    return typeMap[type];
};

/**
 * Format operation status for display
 */
export const formatOperationStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
        'pending': 'Pendiente',
        'processing': 'Procesando',
        'completed': 'Completado',
        'failed': 'Fallido'
    };
    return statusMap[status] || status;
};

/**
 * Get status badge color
 */
export const getOperationStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'processing': 'bg-blue-100 text-blue-800',
        'completed': 'bg-green-100 text-green-800',
        'failed': 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Format progress percentage
 */
export const formatProgress = (operation: iMassiveOperation): string => {
    if (operation.totalCount === 0) return '0%';
    const percentage = (operation.processedCount / operation.totalCount) * 100;
    return `${percentage.toFixed(1)}%`;
};

/**
 * Get progress bar color
 */
export const getProgressColor = (operation: iMassiveOperation): string => {
    const percentage = (operation.processedCount / operation.totalCount) * 100;

    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
};
