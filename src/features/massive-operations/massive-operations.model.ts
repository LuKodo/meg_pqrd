// Massive operations feature types and business rules

export interface iMassiveOperation {
    id: number;
    type: MassiveOperationType;
    fromStatus: string;
    toStatus: string;
    requestIds: string[];
    createdBy: string;
    createdAt: Date;
    processedCount: number;
    totalCount: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
}

export type MassiveOperationType =
    | 'OpenToProgrammed'
    | 'ProgrammedToSend'
    | 'SendedToDelivered'
    | 'DigitedToSend'
    | 'IPSToOpen'
    | 'DeliveredToApply'
    | 'ProgrammedToDigited';

export interface iStatusTransition {
    from: string;
    to: string;
    requiresValidation: boolean;
    requiresFile?: boolean;
}

// Business rules
export const getStatusTransition = (type: MassiveOperationType): iStatusTransition => {
    const transitions: Record<MassiveOperationType, iStatusTransition> = {
        'OpenToProgrammed': { from: 'Abierto', to: 'Programado', requiresValidation: true },
        'ProgrammedToSend': { from: 'Programado', to: 'Enviado', requiresValidation: true },
        'SendedToDelivered': { from: 'Enviado', to: 'Entregado', requiresValidation: true },
        'DigitedToSend': { from: 'Digitado', to: 'Enviado', requiresValidation: true },
        'IPSToOpen': { from: 'IPS', to: 'Abierto', requiresValidation: true, requiresFile: true },
        'DeliveredToApply': { from: 'Entregado', to: 'Aplicado', requiresValidation: true },
        'ProgrammedToDigited': { from: 'Programado', to: 'Digitado', requiresValidation: true }
    };
    return transitions[type];
};

export const canProcessMassiveOperation = (operation: iMassiveOperation): boolean => {
    return operation.status === 'pending' && operation.requestIds.length > 0;
};
