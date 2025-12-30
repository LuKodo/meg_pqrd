// PQRD feature types and business rules

export interface iPQRD {
    id: string;
    person_type: string;
    person_document_type: string;
    person_document_number: string;
    person_name: string;
    person_last_name: string;
    person_email: string;
    person_phone: string;
    person_response_type: string;
    person_is_same: boolean;
    pqr_description: string;
    pqr_type: string;
    pqr_city: string;
    document?: string;
    created_at: string;
    updated_at: string;
    num_rad: string;
    status: boolean;
    channel: string;
    end_date: string;
    assignment?: iAssignment[];
    mutual_radicado?: string;
    pqrs_peticionario?: iPeticionario[];
}

export interface iAssignment {
    pqr_id: string;
    user_id: string;
    users?: iUser[];
}

export interface iRecord {
    id: string;
    pqrs_id: string;
    activity_id: string;
    activities?: iActivity;
    createdAt: string;
}

export interface iActivity {
    id: string;
    description: string;
}

export interface iUser {
    id: string;
    username: string;
    password: string;
    role_id: string;
    created_at?: string;
}

export interface iPeticionario {
    person_type: string;
    document_type: string;
    document_number: string;
    names: string;
    last_names: string;
    email: string;
    phone: string;
    created_at?: string;
}

export type PQRDChannel = 'Web' | 'Telefónico' | 'E-mail pqrsc' | 'Personalizado' | 'Ente de control y vigilancia' | 'Gestión documental - Escrito' | 'Oficina central/Funcionarios' | 'Redes Sociales' | 'Superintendencia' | 'Buzón de sugerencias' | 'Prestadores' | 'Alianzas de usuarios' | 'Escrito' | 'Rendición de cuentas';

export type PQRDType = 'Peticion' | 'Queja' | 'Reclamo' | 'Sugerencia' | 'Felicitaciones' | 'Derecho de petición' | 'Denuncia' | 'Comentario';

export const PQRDTypeText = [
    'Peticion',
    'Queja',
    'Reclamo',
    'Sugerencia',
    'Felicitaciones',
    'Derecho de petición',
    'Denuncia',
    'Comentario'
];

export type SemaforoStatus = 'green' | 'yellow' | 'red';

// Business rules
export const isPQRDOpen = (pqrd: iPQRD): boolean => {
    return pqrd.status === true;
};

export const isPQRDClosed = (pqrd: iPQRD): boolean => {
    return pqrd.status === false;
};

export const hasSamePetitioner = (pqrd: iPQRD): boolean => {
    return pqrd.person_is_same === true;
};

export const getPQRDStatus = (pqrd: iPQRD): string => {
    return pqrd.status ? 'Abierto' : 'Cerrado';
};
