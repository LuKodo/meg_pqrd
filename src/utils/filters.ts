import type { Filter } from "@/entities";
import { DataTableFilterMeta, DataTableFilterMetaData } from "primereact/datatable";

export const filters = (): Filter[] => [
	{
		field: "id",
		name: "Solicitud",
		operator: "like",
		value: "",
		type: "text",
	},
	{
		field: "radicate",
		name: "Radicado",
		operator: "like",
		value: "",
		type: "text",
	},
	{
		field: "username",
		name: "Creada por",
		operator: "match",
		value: "",
		type: "text",
	},
	{
		field: "createdAt",
		name: "Fecha Radicación",
		operator: "between",
		value: "",
		type: "date",
	},
	{
		field: "programed_date",
		name: "Fecha Espera Mutual",
		operator: "between",
		value: "",
		type: "date",
	},
	{
		field: "self_management_date",
		name: "Fecha Gestión Pharmaser",
		operator: "between",
		value: "",
		type: "date",
	},
	{
		field: "document_type",
		name: "Tipo Documento",
		operator: "match",
		value: "",
		type: "text",
	},
	{
		field: "document_number",
		name: "Identificación",
		operator: "match",
		value: "",
		type: "number",
	},
	{
		field: "firstname",
		name: "Pri Nombre",
		operator: "match",
		value: "",
		type: "text",
	},
	{
		field: "surname",
		name: "Seg Nombre",
		operator: "match",
		value: "",
		type: "text",
	},
	{
		field: "lastname_1",
		name: "Pri Apellido",
		operator: "match",
		value: "",
		type: "text",
	},
	{
		field: "lastname_2",
		name: "Seg Apellido",
		operator: "match",
		value: "",
		type: "text",
	},
	{
		field: "address",
		name: "Dirección",
		operator: "match",
		value: "",
		type: "text",
	},
	{
		field: "medicamento",
		name: "Medicamento",
		operator: "like",
		value: "",
		type: "text",
	},
	{
		field: "code",
		name: "Código Genérico",
		operator: "match",
		value: "",
		type: "number",
	},
	{
		field: "quantity",
		name: "Cantidad",
		operator: "match",
		value: "",
		type: "number",
	},
	{
		field: "no_field",
		name: "Fecha de Vencimiento",
		operator: "between",
		value: "",
		type: "date",
	},
	{
		field: "no_field",
		name: "Hora de Vencimiento",
		operator: "between",
		value: "",
		type: "date",
	},
	{
		field: "requested_number",
		name: "Número de Entrega",
		operator: "match",
		value: "",
		type: "number",
	},
	{
		field: "sended",
		name: "Fecha envío",
		operator: "between",
		value: "",
		type: "date",
	},
	{
		field: "name",
		name: "Transportadora",
		operator: "match",
		value: "",
		type: "text",
	},
	{
		field: "guide_number",
		name: "Nro Guía",
		operator: "match",
		value: "",
		type: "text",
	},
	{
		field: "delivered",
		name: "Fecha Entrega",
		operator: "between",
		value: "",
		type: "date",
	},
	{
		field: "model_name",
		name: "Modelo",
		operator: "match",
		value: "",
		type: "text",
	},
	{
		field: "estado",
		name: "Estado",
		operator: "match",
		value: "",
		type: "text"
	},
	{
		field: "channel",
		name: "Canal",
		operator: "match",
		value: "",
		type: "select",
		options: 'MEG=meg|PQRS=pqrs|Tradicional=trad',
	},
	{
		field: "required_mark",
		name: "Marca Requerida",
		operator: "match",
		value: "",
		type: "text",
	}
]

export interface BackendFilter {
	field: string;
	value: Date[] | string | number;
	operator: string;
}

export interface FilterDto {
	param: string;
	value: Date[] | string | number;
	operator: string;
}

export function transformFilters(filters: DataTableFilterMeta): BackendFilter[] {
	let backendFilters: BackendFilter[] = [];
	for (const key in filters) {
		const filter = filters[key] as DataTableFilterMetaData;

		if (!filter.value) {
			continue;
		}

		backendFilters = [
			...backendFilters,
			{
				field: key,
				value: filter.value,
				operator: changeParams(filter.matchMode ?? 'eq')
			}
		]
	}
	return backendFilters;
}

const changeParams = (match: string) => {
	switch (match) {
		case 'equals':
			return 'eq';
		case 'between':
			return 'between';
		case 'contains':
			return 'like';
		case 'in':
			return 'in';
		default:
			return 'like';
	}
}

export const document_types = ['CC', 'TI', 'RC', 'PT', 'CE', 'AS', 'NIT', 'SC', 'CN', 'PE', 'MS', 'NV', 'PEP']