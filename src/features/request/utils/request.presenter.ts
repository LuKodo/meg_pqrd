// Request feature presentation/formatting logic
import { DateTime } from 'luxon';
import type { iRequestView } from './request.model';

/**
 * Format request date for display
 */
export const formatRequestDate = (date: Date | string): string => {
    return DateTime.fromJSDate(new Date(date)).toFormat('yyyy-MM-dd');
};

/**
 * Format request time for display
 */
export const formatRequestTime = (date: Date | string): string => {
    return DateTime.fromJSDate(new Date(date)).toFormat('HH:mm a');
};

/**
 * Format request datetime for display
 */
export const formatRequestDateTime = (date: Date | string): string => {
    return DateTime.fromJSDate(new Date(date)).toFormat('yyyy-MM-dd HH:mm');
};

/**
 * Format affiliate full name
 */
export const formatAffiliateName = (request: iRequestView): string => {
    const parts = [
        request.firstname,
        request.surname,
        request.lastname_1,
        request.lastname_2
    ].filter(Boolean);
    return parts.join(' ');
};

/**
 * Format document with type
 */
export const formatDocument = (type: string, number: string | number): string => {
    const typeMap: Record<string, string> = {
        'CC': 'C.C.',
        'TI': 'T.I.',
        'CE': 'C.E.',
        'PA': 'Pasaporte',
        'RC': 'R.C.'
    };
    const formattedType = typeMap[type.toUpperCase()] || type;
    return `${formattedType} ${number}`;
};

/**
 * Format request status for display
 */
export const formatRequestStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
        'open': 'Abierto',
        'programmed': 'Programado',
        'digited': 'Digitado',
        'sended': 'Enviado',
        'delivered': 'Entregado',
        'applied': 'Aplicado',
        'nulled': 'Anulado',
        'delivered_failed': 'Entrega Fallida'
    };
    return statusMap[status.toLowerCase()] || status;
};

/**
 * Get status badge color
 */
export const getStatusBadgeColor = (status: string): string => {
    const colorMap: Record<string, string> = {
        'open': 'bg-blue-100 text-blue-800',
        'programmed': 'bg-purple-100 text-purple-800',
        'digited': 'bg-blue-100 text-blue-800',
        'sended': 'bg-yellow-100 text-yellow-800',
        'delivered': 'bg-green-100 text-green-800',
        'applied': 'bg-emerald-100 text-emerald-800',
        'nulled': 'bg-red-100 text-red-800',
        'delivered_failed': 'bg-orange-100 text-orange-800'
    };
    return colorMap[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

/**
 * Format channel for display
 */
export const formatChannel = (channel: string): string => {
    const channelMap: Record<string, string> = {
        'web': 'Web',
        'phone': 'Teléfono',
        'email': 'Correo',
        'presential': 'Presencial',
        'whatsapp': 'WhatsApp'
    };
    return channelMap[channel.toLowerCase()] || channel;
};

/**
 * Format quantity with unit
 */
export const formatQuantity = (quantity: number, unit: string = 'unidades'): string => {
    return `${quantity} ${unit}`;
};

/**
 * Format radicate number
 */
export const formatRadicate = (radicate: string | number): string => {
    return `#${String(radicate).padStart(6, '0')}`;
};

/**
 * Calculate days until programmed date
 */
export const calculateDaysUntil = (programedDate: Date | string): number => {
    const now = DateTime.now();
    const target = DateTime.fromJSDate(new Date(programedDate));
    return Math.ceil(target.diff(now, 'days').days);
};

/**
 * Get urgency level based on days remaining
 */
export const getUrgencyLevel = (daysRemaining: number): 'high' | 'medium' | 'low' => {
    if (daysRemaining < 0) return 'high';
    if (daysRemaining <= 2) return 'medium';
    return 'low';
};

/**
 * Format urgency badge
 */
export const formatUrgencyBadge = (daysRemaining: number): { text: string; color: string } => {
    const urgency = getUrgencyLevel(daysRemaining);

    if (urgency === 'high') {
        return { text: 'Urgente', color: 'bg-red-500 text-white' };
    }
    if (urgency === 'medium') {
        return { text: 'Próximo', color: 'bg-amber-500 text-white' };
    }
    return { text: 'A tiempo', color: 'bg-green-500 text-white' };
};
