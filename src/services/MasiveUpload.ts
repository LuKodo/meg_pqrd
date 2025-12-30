import { itemExcelPQRS, requestMasive } from "@/entities";
import Swal from "sweetalert2";
import { utils, writeFile } from "xlsx";

export class MasiveUpload {
    downloadErrors(errors: requestMasive[], data: itemExcelPQRS[] | undefined) {
        if (errors.length === 0 || !data) {
            return;
        }

        const dataError = errors.map((item) => {
            return {
                TIPO_DOC: data.find((exc) => exc.AFILIADOI?.id === item.data.affiliateId)?.TIPO_DOC,
                DOCUMENTO_BENEFICIARIO: data.find((exc) => exc.AFILIADOI?.id === item.data.affiliateId)?.DOCUMENTO_BENEFICIARIO,
                APELLIDO1: data.find((exc) => exc.AFILIADOI?.id === item.data.affiliateId)?.APELLIDO1,
                APELLIDO2: data.find((exc) => exc.AFILIADOI?.id === item.data.affiliateId)?.APELLIDO2,
                NOMBRE1: data.find((exc) => exc.AFILIADOI?.id === item.data.affiliateId)?.NOMBRE1,
                NOMBRE2: data.find((exc) => exc.AFILIADOI?.id === item.data.affiliateId)?.NOMBRE2,
                TELEFONO: item.data.phone,
                DIRECCION: item.data.address,
                N_AUTORIZACION: item.data.auth_number,
                COD_MEDICAMENTO: data.find((exc) => exc.AFILIADOI?.id === item.data.affiliateId)?.COD_MEDICAMENTO,
                CANTIDAD_ENTREGA: item.data.quantity,
                TIEMPO: item.data.frequency_time,
                FECHA_PROGRAMACION: item.data.programed_date,
                NIT_IPS: data.find((exc) => exc.AFILIADOI?.id === item.data.affiliateId)?.NIT_IPS,
                COD_DANE_CIUDAD_IPS: data.find((exc) => exc.AFILIADOI?.id === item.data.affiliateId)?.COD_DANE_CIUDAD_IPS,
                NOMBRE_FUNCIONARIO_IPS: item.data.name,
                TELEFONO_FUNCIONARIO_IPS: item.data.phone,
                CORREO_FUNCIONARIO_IPS: data.find((exc) => exc.AFILIADOI?.id === item.data.affiliateId)?.CORREO_FUNCIONARIO_IPS,
                ERROR: (item?.errors) ?? ''
            }
        });

        try {
            const worksheet = utils.json_to_sheet(dataError);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, "Errors");
            writeFile(workbook, "ErrorEntries.xlsx");
        } catch (error) {
            console.error("Error al generar archivo Excel:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo generar el archivo de errores",
            });
        } finally {
            errors = [];
        }
    }
}