import { useCallback } from "react";
import type { itemExcelPQRS } from "@/entities";
import { RequestApiRepository } from "@/features/shared/repositories";
import { MasiveUpload } from "@/services";
import { transformExcelDataToRequests } from "../utils/transformExcelDataToRequest";
import {
    showSuccessNotification,
    showPartialSuccessNotification,
    showErrorNotification,
    showFileSizeErrorNotification,
    showGenericErrorNotification,
} from "../utils/masiveUploadNotifications";

interface UseMasiveSaveOptions {
    data: itemExcelPQRS[] | undefined;
    userId: number;
    repository: RequestApiRepository;
    onComplete: () => void;
}

interface ErrorEntry {
    requestData: any;
    message: any;
}

export function useMasiveSave({
    data,
    userId,
    repository,
    onComplete,
}: UseMasiveSaveOptions) {
    const masiveActions = new MasiveUpload();

    const save = useCallback(
        async (e: { preventDefault: () => void }) => {
            e.preventDefault();

            const transformedData = transformExcelDataToRequests(data, userId);

            try {
                const response = await repository.createBulkRequest(transformedData);

                const retError = response.errors.map((entry: ErrorEntry) =>
                    entry.requestData && {
                        data: entry.requestData,
                        errors: entry.message,
                        status: "error",
                    }
                );

                // Handle complete failure
                if (response.successCount === 0) {
                    await showErrorNotification();
                    masiveActions.downloadErrors(retError, data);
                    onComplete();
                    return;
                }

                // Handle complete success
                if (response.radicate && response.errorCount === 0) {
                    await showSuccessNotification(response);
                    onComplete();
                    return;
                }

                // Handle partial success
                await showPartialSuccessNotification(response);
                masiveActions.downloadErrors(retError, data);
                onComplete();
            } catch (error: any) {
                // Handle file size error
                if (error.message === "Request failed with status code 413") {
                    await showFileSizeErrorNotification();
                    return;
                }

                // Handle generic error
                console.error("Error en cargue masivo:", error);
                const errorMessage = error.response?.data?.message || error.message;
                await showGenericErrorNotification(errorMessage);
            }
        },
        [data, userId, repository, masiveActions, onComplete]
    );

    return { save };
}
