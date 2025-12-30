// PQRD feature presentation/formatting logic
import { DateTime } from 'luxon';
import type { iActivity, iRecord, SemaforoStatus } from './pqrd.model';
import { IconMail, IconPhone, IconUser, IconWorld } from '@/svg';
import { IconUserGroup } from '@/svg/user-group';
import { IconDocumentText } from '@/svg/document-text';
import { IconShieldCheck } from '@/svg/shield-check';
import { IconBuildingOffice } from '@/svg/building-office';
import { IconCellphone } from '@/svg/cellphone';
import { IconSuper } from '@/svg/super';
import { IconInbox } from '@/svg/inbox';
import { httpPQRD } from '@/http/PQRD';
import { jwtSign } from '@/utils';
/**
 * Format document type for display
 */
export const formatDocument = (type: string): string => {
    const typeMap: Record<string, string> = {
        'CC': 'C.C.',
        'TI': 'T.I.',
        'CE': 'C.E.',
        'PA': 'Pasaporte',
        'RC': 'R.C.',
        'NIT': 'NIT'
    };
    return typeMap[type.toUpperCase()] || type;
};

export const calculateEndDate = ({ type, createdAt }: { type: string, createdAt: string }): string => {
    const now = DateTime.fromISO(createdAt);
    const hours = TypeToHoursMap[type.toUpperCase()] || (5 * 24);
    return now.plus({ hours }).toFormat('yyyy-MM-dd');
};

const TypeToHoursMap: Record<string, number> = {
    'RIESGO VITAL': 24,
    'RIESGO PRIORIZADO': 48,
    'RIESGO SIMPLE': 72
};

/**
 * Get icon name for channel (to be used with dynamic imports)
 */
export const channelToIcon = (channel: string): any => {
    switch (channel) {
        case 'E-mail pqrsc':
            return IconMail;
        case 'Telefónico':
            return IconPhone;
        case 'Web':
            return IconWorld;
        case 'Personalizado':
            return IconUser;
        case 'Ente de control y vigilancia':
            return IconShieldCheck;
        case 'Gestión documental - Escrito':
            return IconDocumentText;
        case 'Oficina central/Funcionarios':
            return IconBuildingOffice;
        case 'Redes Sociales':
            return IconCellphone;
        case 'Superintendencia':
            return IconSuper;
        case 'Buzón de sugerencias':
            return IconInbox;
        case 'Prestadores':
            return IconUserGroup;
        case 'Alianzas de usuarios':
            return IconUserGroup;
        case 'Escrito':
            return IconDocumentText;
        case 'Rendición de cuentas':
            return IconUser;
        default:
            return IconUser;
    }
};

/**
 * Calculate semaforo color based on dates and channel
 */
export const semaforoToColor = (
    createdAt: string,
    endDate: string
): string => {
    const now = DateTime.now();
    const end = DateTime.fromISO(endDate);
    const created = DateTime.fromISO(createdAt);

    const totalDuration = end.diff(created, 'hours').hours;
    const elapsed = now.diff(created, 'hours').hours;

    // Calculate percentage of time elapsed
    const percentageElapsed = (elapsed / totalDuration) * 100;

    // Green: Less than 50% time elapsed
    if (percentageElapsed < 50) {
        return 'bg-green-500';
    }

    // Yellow: Between 50% and 80% time elapsed
    if (percentageElapsed < 80) {
        return 'bg-yellow-500';
    }

    // Red: More than 80% time elapsed or overdue
    return 'bg-red-500';
};

/**
 * Get semaforo status
 */
export const getSemaforoStatus = (
    createdAt: string,
    endDate: string
): SemaforoStatus => {
    const color = semaforoToColor(createdAt, endDate);

    if (color.includes('green')) return 'green';
    if (color.includes('yellow')) return 'yellow';
    return 'red';
};

/**
 * Format PQRD date
 */
export const formatPQRDDate = (date: string): string => {
    return DateTime.fromISO(date).toFormat('yyyy-MM-dd');
};

/**
 * Format PQRD time
 */
export const formatPQRDTime = (date: string): string => {
    return DateTime.fromISO(date).toFormat('HH:mm a');
};

/**
 * Format PQRD status badge
 */
export const formatStatusBadge = (status: boolean): { text: string; color: string } => {
    return status
        ? { text: 'Abierto', color: 'bg-blue-500 text-white' }
        : { text: 'Cerrado', color: 'bg-gray-500 text-white' };
};

/**
 * Format channel badge
 */
export const formatChannelBadge = (): string => {
    return `bg-blue-500 text-white`;
};

/**
 * Calculate remaining time
 */
export const calculateRemainingTime = (endDate: string): string => {
    const now = DateTime.now();
    const end = DateTime.fromISO(endDate);
    const diff = end.diff(now, ['days', 'hours', 'minutes']);

    if (diff.days > 0) {
        return `${Math.floor(diff.days)} días`;
    }
    if (diff.hours > 0) {
        return `${Math.floor(diff.hours)} horas`;
    }
    return `${Math.floor(diff.minutes)} minutos`;
};

/**
 * Format radicate number
 */
export const formatRadicate = (numRad: string): string => {
    return `#${numRad}`;
};

export const onActivityCreate = async (activity: Partial<iActivity>) => {
    try {
        const token = await jwtSign({ payload: { role: "web_user" } });
        const response = await httpPQRD.post<iActivity>(`pqrs_record`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Prefer": "return=representation"
            },
            json: activity,
        }).json();
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const listActivities = async () => {
    try {
        const token = await jwtSign({ payload: { role: "web_user" } });
        const response = await httpPQRD.get<iActivity[]>(`activities`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).json();
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const listActivitiesByPQRD = async (pqrId: string) => {
    try {
        const token = await jwtSign({ payload: { role: "web_user" } });
        const response = await httpPQRD.get<iRecord[]>(`pqrs_record?pqrs_id=eq.${pqrId}&select=*,activities(*)`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).json();
        return response;
    } catch (error) {
        console.error(error);
    }
};
