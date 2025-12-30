import type { iExcelDinamic } from "@/entities";
import { utils, writeFile } from "xlsx";
import { iRequestView } from "@/entities";
import { DateTime } from "luxon";

export class HistoricActions {
	private excelData: iExcelDinamic[] = [];

	constructor() { }

	async downloadExcel(data: iRequestView[]) {
		data.map((item: iRequestView) => {
			if (item?.id) {
				const newItem: iExcelDinamic = {
					Solicitud: String(item.id),
					Radicado: String(item.radicate) || '',
					Sede: item.sede ?? 'SIN SEDE',
					Registrado: item.username ?? 'SIN USUARIO',
					FechaRadicacion: item.createdAt.toString(),
					FechaEsperadaMutual: item.programed_date.toString(),
					FechaGestionPharmaser: item.self_management_date?.toString(),
					TipoDoc: item.document_type,
					Identificacion: String(item.document_number),
					PrimerNombre: item.firstname,
					SegundoNombre: item.surname,
					PrimerApellido: item.lastname_1,
					SegundoApellido: item.lastname_2,
					Direccion: item.address,
					Medicamento: item.medicamento ?? '',
					PLU: item.plu ?? '',
					CodigoGenerico: String(item.code) || '',
					Cantidad: String(item.quantity),
					NumeroEntrega: String(item.requested_number),
					FechaEnviado: String(item.sended ?? ''),
					Transportadora: item.name,
					NumeroGuia: item.guide_number,
					FechaEntregado: String(item.delivered ?? ''),
					Modelo: item.model_name ?? '',
					Estado: item.estado,
					Postfechado: "",
					Reprogramado: "",
					FechaReprogramado: "",
					MotivoReprogramado: "",
					NumQueja: item.claimNumber ?? '',
					CiudadDestino: item.city,
					DireccionDestino: item.address,
					Telefono: item.phone,
					FechaProgramacion: item.scheduled ? DateTime.fromJSDate(item.scheduled).toFormat("YYYY-MM-DD") : '',
					UsuarioProgramacion: item.user_scheduled,
					FechaDigitacion: item.digited ? DateTime.fromJSDate(item.digited).toFormat("YYYY-MM-DD") : '',
					UsuarioDigitacion: item.user_digited,
					FechaEnvio: item.sended ? DateTime.fromJSDate(item.sended).toFormat("YYYY-MM-DD") : '',
					UsuarioEnvio: item.user_sended,
					FechaEntrega: item.delivered ? DateTime.fromJSDate(item.delivered).toFormat("YYYY-MM-DD") : '',
					UsuarioEntrega: item.user_delivered,
					FechaDevolucion: item.delivered_failed ? DateTime.fromJSDate(item.delivered_failed).toFormat("YYYY-MM-DD") : '',
					UsuarioDevolucion: item.user_delivered_failed,
					FechaAplicacion: item.applied ? DateTime.fromJSDate(item.applied).toFormat("YYYY-MM-DD") : '',
					UsuarioAplicacion: item.user_applied,
					NoAplicacion: item.applied ? String(item.applied) : '',
					NoAplicacionFecha: item.applied ? DateTime.fromJSDate(item.applied).toFormat("YYYY-MM-DD") : '',
					FechaAnulacion: item.nulled ? DateTime.fromJSDate(item.nulled).toFormat("YYYY-MM-DD") : '',
					UsuarioAnulacion: item.user_nulled,
					FechaVencimiento: item.date_expiration ? DateTime.fromISO(item.date_expiration).toFormat("YYYY-MM-DD") : '',
					HoraVencimiento: item.date_expiration ? DateTime.fromISO(item.date_expiration).toFormat("HH:mm:ss") : '',
					Canal: item.channel,
					SSC: item.formula,
				};
				this.excelData.push(newItem);
			}
		});


		const worksheet = utils.json_to_sheet(this.excelData);
		const workbook = utils.book_new();
		worksheet && utils.book_append_sheet(workbook, worksheet, "Data");
		writeFile(workbook, "HistoricoSolicitudes.xlsx", { compression: true });
	}
}