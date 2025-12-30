import { itemExcelPQRS } from "@/entities";
import { Badge } from "@/features/shared/components/Badge";
import { DateTime } from "luxon";
import { FC } from "react";

interface TableProps {
	data: itemExcelPQRS[];
}

export const RequestTablePQRS: FC<TableProps> = ({ data }) => {
	return (
		<>
			{data && data.length > 0 && (
				<table className="table table-sm search-table align-middle text-nowrap small">
					<thead className="header-item">
						<tr className="text-center ">
							<th className="text-uppercase text-start">ID</th>
							<th className="text-uppercase text-start">Documento</th>
							<th className="text-uppercase text-start">Afiliado</th>
							<th className="text-uppercase text-start"># Autorizacion</th>
							<th className="text-uppercase text-start">Medicamento</th>
							<th className="text-uppercase text-start">Cantidad Entrega</th>
							<th className="text-uppercase text-start">Tiempo</th>
							<th className="text-uppercase text-start">
								Fecha de Programación
							</th>
							<th className="text-uppercase text-start">IPS</th>
							<th className="text-uppercase text-start">Ciudad</th>
							<th className="text-uppercase text-start">
								Nombre Funcionario IPS
							</th>
							<th className="text-uppercase text-start">
								Teléfono Funcionario IPS
							</th>
							<th className="text-uppercase text-start">
								Correo Funcionario IPS
							</th>
							<th className="text-uppercase text-start">Radicado Queja</th>
							<th className="text-uppercase text-start">Modelo</th>
							<th className="text-uppercase text-start">Fecha de Vencimiento</th>
							<th className="text-uppercase text-start">Hora de Vencimiento</th>
							<th className="text-uppercase text-start">Direccion</th>
						</tr>
					</thead>
					<tbody className="">
						{data?.map((item: itemExcelPQRS, index: number) => (
							<tr key={index}>
								<td className="text-start">{item.ID}</td>
								<td className="text-start">{`${item.TIPO_DOC} ${item.DOCUMENTO_BENEFICIARIO}`}</td>
								<td
									className={`text-start ${item.AFILIADO?.split(".")[0] === "Error" && "text-danger fw-bold"
										}`}
								>
									{item.AFILIADO?.split(".")[0] === "Error" ? item.AFILIADO?.split(".")[1] : item.AFILIADO}
								</td>
								<td className="text-start">{item.N_AUTORIZACION}</td>
								<td
									className={`text-start ${!item.MEDICAMENTO && "text-danger fw-bold"
										}`}
								>
									{item.MEDICAMENTO
										? item.MEDICAMENTO.description
										: `El medicamento que ingresaste no existe en nuestra maestra de datos: Error en la linea ${index + 1
										}`}
								</td>
								<td className="text-start">{item.CANTIDAD_ENTREGA}</td>
								<td className="text-start">{item.TIEMPO}</td>
								<td className="text-start">
									{DateTime.fromISO(item.FECHA_PROGRAMACION).toFormat("YYYY-MM-DD")}
								</td>
								<td
									className={`text-start ${!item.IPS && "text-danger fw-bold"}`}
								>
									{item.IPS
										? item.IPS.name
										: `El código NIT que ingresaste para la IPS no existe en nuestra maestra de datos: Error en la linea ${index + 1
										}`}
								</td>
								<td
									className={`text-start ${!item.CIUDAD && "text-danger fw-bold"
										}`}
								>
									{item.CIUDAD
										? item.CIUDAD.name
										: `El código DANE ${item.COD_DANE_CIUDAD_IPS
										} no existe en la base de datos: Error en la linea ${index + 1
										}`}
								</td>
								<td className="text-start">{item.NOMBRE_FUNCIONARIO_IPS}</td>
								<td className="text-start">{item.TELEFONO_FUNCIONARIO_IPS}</td>
								<td className="text-start">{item.CORREO_FUNCIONARIO_IPS}</td>
								<td className="text-start">{item.RADICADO_QUEJA}</td>
								<td className="text-start">{item.MODELO}</td>
								<td className="text-start">{item.FECHA_VENCE}</td>
								<td className="text-start">{item.HORA_VENCE}</td>
								<td className={`text-start ${!item.DIRECCION && "text-danger fw-bold"
									}`}>{item.DIRECCION ? item.DIRECCION : 'Solicitud sin dirección'}</td>

								<td className="text-start">
									<Badge pill className="w-100 fw-semibold fs-2">
										.
									</Badge>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};
