export interface Affiliate {
    id?: number;
    document_type: string;
    document_number: string;
    lastname_1: string;
    lastname_2: string;
    firstname: string;
    surname: string;
    phone: string;
    cellphone: string;
    address: string;
    isTutela: boolean;
}

export interface AffiliateCreateDTO extends Partial<Affiliate> {}