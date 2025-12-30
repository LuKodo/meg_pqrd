import Swal from "sweetalert2";

interface BulkUploadResponse {
    totalProcessed: number;
    successCount: number;
    errorCount: number;
    radicate?: string;
}

/**
 * Shows success notification when all items are uploaded successfully
 */
export async function showSuccessNotification(response: BulkUploadResponse): Promise<void> {
    await Swal.fire({
        icon: "success",
        title: "Cargue Masivo Exitoso",
        html: `N° Solicitudes Cargadas: ${response.totalProcessed} <br/>N° Solicitudes Procesadas: ${response.successCount} <br/>N° Solicitudes Erroneas: ${response.errorCount} <br/> <br/>Radicado: ${response.radicate}`,
    });
}

/**
 * Shows warning notification when upload is partially successful
 */
export async function showPartialSuccessNotification(response: BulkUploadResponse): Promise<void> {
    await Swal.fire({
        icon: "warning",
        title: "Cargue Masivo Incompleto",
        html: `N° Solicitudes Procesadas: ${response.totalProcessed} <br/>N° Solicitudes Cargadas: ${response.successCount} <br/>N° Solicitudes Erroneas: ${response.errorCount}`,
    });
}

/**
 * Shows error notification when no items were uploaded
 */
export async function showErrorNotification(): Promise<void> {
    await Swal.fire({
        icon: "error",
        title: "Cargue Masivo Erroneo",
        html: `No se cargó ninguna solicitud, revise el log generado para verificar los estados`,
    });
}

/**
 * Shows error notification for file size exceeded
 */
export async function showFileSizeErrorNotification(): Promise<void> {
    await Swal.fire({
        icon: "error",
        title: "Cargue Masivo Fallido",
        text: "El cargue excede el tamaño permitido (10MB)",
    });
}

/**
 * Shows generic error notification
 */
export async function showGenericErrorNotification(errorMessage: string): Promise<void> {
    await Swal.fire({
        icon: "error",
        title: "Cargue Masivo Fallido",
        text: errorMessage || "Error desconocido",
    });
}
