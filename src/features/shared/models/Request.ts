import type {
	iMedicine,
	iLog,
	iStatus,
	iTransport,
	Product,
	iUser,
	iModel,
	Affiliate,
	iCity,
	iIPS
} from "../entities";

export enum RequestType {
	PQRS = 'PQRS',
	MEG = 'MEG'
}

export interface iRequestBase {
	id: string;
	user: iUser;
	username?: string;
	affiliateNames?: string;
	affiliateLastnames?: string;
	affiliateAddress?: string;
	affiliateId?: number;
	ipsName?: string;
	medicineCode?: string;
	medicineName?: string;
	modelId?: number;
	cityId?: number;
	departmentId?: number;
	statusName?: string;
	statusId?: number;
	sede?: string;
	document_type: string;
	document_number: string;
	auth_number: string;
	required_mark: string;
	required_mark_type: string;
	quantity: number;
	frequency: string;
	frequency_time: number;
	programed_date: string;
	self_management_date?: string;
	address: string;
	name: string;
	phone: string;
	observation: string;
	requested_number: string;
	url_attachment: string;
	log: iLog[];
	status: iStatus;
	radicate?: string;
	createdAt?: Date;
	updatedAt?: Date;
	balance?: boolean;
	chance?: boolean;
	digitizer?: number;
	affiliate: Affiliate;
	formula?: string;
	sended?: Date;
	user_sended?: number;
	delivered?: Date;
	user_delivered?: number;
	digited?: Date;
	user_digited?: number;
	scheduled?: Date;
	user_scheduled?: string;
	nulled?: Date;
	user_nulled?: number;
	why_nulled?: string;
	opened?: Date;
	user_opened?: number;
	conveyor?: iTransport;
	guide_number?: string;
}

export interface iRequest extends iRequestBase {
	channel: string;
	city: iCity;
	ips: iIPS;
	medicine: iMedicine;
	model: iModel;
	formula?: string;
	lote?: string;
	homologateId?: number;
	applied?: Date;
	user_applied?: number;
	claimNumber?: string;
	date_expiration?: string;
}

export interface iRequestView {
	id: string,
	homologateId: number,
	radicate: number,
	username: string,
	createdAt: Date,
	programed_date: Date,
	self_management_date: Date | null,
	affiliateId: number,
	document_type: string,
	document_number: number,
	firstname: string,
	surname: string,
	lastname_1: string,
	lastname_2: string,
	address: string,
	medicamento: string,
	code: number,
	quantity: number,
	requested_number: number,
	name: string,
	guide_number: string,
	required_mark: string,

	opened?: Date,
	scheduled?: Date,
	digited?: Date,
	delivered?: Date,
	delivered_failed?: Date,
	sended?: Date,
	applied?: Date,
	nulled?: Date,

	user_opened?: string,
	user_scheduled?: string,
	user_digited?: string,
	user_delivered?: string,
	user_delivered_failed?: string,
	user_sended?: string,
	user_applied?: string,
	user_nulled?: string,

	why_nulled?: string,

	estado: string,
	channel: string,
	model_name: string,
	url_attachment: string,
	ips: string,
	city: string
	department: string
	ips_delegate: string,
	phone: string,
	formula: string,
	sede: string,
	plu: string,
	claimNumber?: string

	ipsId: number;
	medicineId: number;
	modelId: number;
	cityId: number;
	departmentId: number;
	conveyorId: number;
	userId: number;
	statusId: number;

	date_expiration?: string
}

export type iRequestOne = Omit<iRequest, 'city' | 'ips' | 'medicine' | 'model' | 'requested_number'> & {
	city: iCity[];
	ips: iIPS[];
	medicine: iMedicine[];
	model: iModel[];
	file?: FileList;
	requested_number: number;
	userId: number;
	medicineId: number;
	modelId: number;
	ipsId: number;
	cityId: number;
	affiliateId: number;
	statusId: number;
}

export interface iReasonsRequest {
	description: string;
	id: number;
	statusId: number;
	status_name: string;
}

export interface itemExcel {
	ID?: number;
	TIPO_DOC: string;
	DOCUMENTO_BENEFICIARIO: string;
	AFILIADO?: string;
	N_AUTORIZACION: string;
	COD_MEDICAMENTO: string;
	MEDICAMENTO?: Product;
	CANTIDAD_ENTREGA: string;
	TIEMPO: string;
	FECHA_PROGRAMACION: string;
	NIT_IPS: string;
	IPS?: iIPS;
	COD_DANE_CIUDAD_IPS: string;
	CIUDAD?: iCity;
	NOMBRE_FUNCIONARIO_IPS: string;
	TELEFONO_FUNCIONARIO_IPS: string;
	CORREO_FUNCIONARIO_IPS: string;
	APELLIDO1: string;
	APELLIDO2: string;
	NOMBRE1: string;
	NOMBRE2: string;
	TELEFONO: string;
	DIRECCION: string;
	AFILIADOI?: Affiliate;
}
export interface itemExcelPQRS extends itemExcel {
	RADICADO_QUEJA: string;
	MODELO: string;
	ORIGEN: string;
	FECHA_VENCE: string;
	HORA_VENCE: string;
}

export interface itemToDB {
	user_id: string;
	auth_number: string;
	medicine: number;
	required_mark: string;
	required_mark_type: string;
	quantity: string;
	frequency: string;
	frequency_time: string;
	programed_date: string;
	requested_number: string;
	address?: string;
	phone: string;
	name: string;
	affiliate_doc: string;
	affiliate_type_doc: string;
	ips: number;
	city: number;
	claimNumber?: string;
	model?: string;
	channel: string;
}
export interface AffiliateDocField {
	error?: boolean;
	value: string;
}

export interface AffiliateDoc {
	document_type: AffiliateDocField;
	document_number: AffiliateDocField;
}

export interface requestMasive { data: iRequestOne, errors: string, status: string }

export interface responseMasive {
	successCount: number,
	errors: {
		index: number,
		subIndex: number,
		message: string,
		requestData: iRequestOne,
		source: string
	}[]
	errorCount: number
	totalProcessed: number,
	savedRequests: iRequestOne[],
	radicate: string
}