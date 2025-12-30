import type { iRequestOne, itemExcelPQRS } from "@/entities";
import { DeepPartial } from "@/utils";

/**
 * Filters Excel data to only include valid items
 */
export function filterValidExcelData(data: itemExcelPQRS[] | undefined): itemExcelPQRS[] {
    if (!data) return [];

    return data.filter((item) => {
        return (
            item.AFILIADOI &&
            item.AFILIADOI.id &&
            item.MEDICAMENTO &&
            item.MODELO &&
            item.IPS &&
            item.CIUDAD
        );
    });
}

/**
 * Transforms a single Excel item to a request object
 */
export function transformExcelItemToRequest(
    item: itemExcelPQRS,
    userId: number
): DeepPartial<iRequestOne> {
    return {
        url_attachment: "",
        userId: userId,
        statusId: 10,
        auth_number: item.N_AUTORIZACION,
        medicineId: item.MEDICAMENTO?.id,
        medicine: [{ id: item.MEDICAMENTO?.id }],
        required_mark: "",
        required_mark_type: "",
        quantity: Number(item.CANTIDAD_ENTREGA),
        frequency: "Mensual",
        frequency_time: Number(item.TIEMPO),
        programed_date: item.FECHA_PROGRAMACION,
        requested_number: Number(item.CANTIDAD_ENTREGA),
        phone: item.TELEFONO_FUNCIONARIO_IPS,
        name: item.NOMBRE_FUNCIONARIO_IPS,
        affiliateId: item.AFILIADOI?.id,
        ipsId: item.IPS?.id,
        cityId: item.CIUDAD?.id,
        modelId: Number(String(item.MODELO).split("|")[0]),
        claimNumber: item.RADICADO_QUEJA,
        address: item.DIRECCION,
        date_expiration: `${item.FECHA_VENCE} ${item.HORA_VENCE}`,
        channel: "pqrs",
    };
}

/**
 * Transforms Excel data array to request data array
 */
export function transformExcelDataToRequests(
    data: itemExcelPQRS[] | undefined,
    userId: number
): DeepPartial<iRequestOne>[] {
    const filteredData = filterValidExcelData(data);
    return filteredData.map((item) => transformExcelItemToRequest(item, userId));
}
