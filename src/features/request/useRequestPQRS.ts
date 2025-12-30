import { useState, useEffect, ChangeEvent } from "react";
import { UseFormSetValue, UseFormWatch, SubmitHandler } from "react-hook-form";
import { DateTime } from "luxon";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Product, iModel, iRequestOne } from "@/entities";
import { httpClient } from "@/http";
import { RequestApiRepository } from "@/features/shared/repositories";
import { RequestActions } from "@/services/index.ts";
import { useSessionManager } from "@/features/shared/hooks/useSessionManager";

const uploadImageOCI = async (name: string, file: File): Promise<boolean> => {
    const formData = new FormData();
    formData.append('file', file);

    return await httpClient.post(`files/upload?type=formulas&name=${name}`, { body: formData })
        .then((response: any) => {
            console.log('Archivo subido exitosamente:', response.data);
            return true;
        })
        .catch((error: any) => {
            console.error('Error al subir el archivo:', error);
            return false;
        })
}

interface UseRequestPQRSProps {
    setValue: UseFormSetValue<iRequestOne & { file?: FileList }>;
    watch: UseFormWatch<iRequestOne & { file?: FileList }>;
    navigate: (to: string) => void;
}

export const useRequestPQRS = ({ setValue, watch, navigate }: UseRequestPQRSProps) => {
    const { userData } = useSessionManager();
    const repository = new RequestApiRepository(httpClient);
    const requestActions = new RequestActions();

    const [loading, setLoading] = useState(false);
    const [productModal, setProductModal] = useState(false);
    const [productName, setProductName] = useState<string>("");
    const [mark, setMark] = useState<string>("");
    const [isCalculable, setIsCalculable] = useState(false);

    const model = watch("model");

    const calculateDateExpiration = (model: iModel) => {
        if (model.name?.includes('Quejas')) {
            setIsCalculable(false);
            setValue("date_expiration", "");
            return;
        }

        const date = DateTime.now().plus({ hours: 24 });

        setValue("date_expiration", date.toFormat("yyyy-MM-dd HH:mm:ss"));
        setIsCalculable(true);
    }

    useEffect(() => {
        if (model) {
            calculateDateExpiration(model as unknown as iModel);
        } else {
            setIsCalculable(false);
            setValue("date_expiration", "");
        }
    }, [model]);

    const handleProductSelect = (product: Product, required?: boolean) => {
        setValue("medicineId", product.id as number);
        setProductName(product.description);

        if (required) {
            setValue("required_mark", "true");
            setValue("required_mark_type", requestActions.extraerMarcaComercial(product.description) || "");
            setMark(requestActions.extraerMarcaComercial(product.description));
        } else {
            setValue("required_mark", "false");
            setValue("required_mark_type", "");
            setMark("NO APLICA")
        }
        setProductModal(false);
    }

    const handleProductClose = () => {
        setProductModal(false);
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files;
        const maxSize = 2 * 1024 * 1024;

        if (file && file[0].size > maxSize) {
            Swal.fire(
                "Error",
                "El archivo excede el tamaño máximo permitido (2MB). Por favor, elige un archivo más pequeño.",
                "error"
            );
            event.target.value = "";
        }
    };

    const onSubmit: SubmitHandler<iRequestOne & { file?: FileList }> = async (data) => {
        const newFilename = new Date().toISOString().replace(/[-T:.Z]/g, "");

        if (!data.medicineId) {
            toast.warning("Por favor, seleccione un producto");
            return;
        }

        if (!data.file) {
            toast.warning("No haz seleccionado ninguna formula");
            return;
        }

        if (!data.affiliateId) {
            toast.warning("Por favor, seleccione un afiliado");
            return;
        }

        const file = data.file[0];
        const fileUpload = await uploadImageOCI(newFilename, file);

        const newRequest: Partial<iRequestOne> = {
            userId: userData?.id,
            auth_number: data.auth_number,
            medicineId: data.medicineId,
            required_mark: data.required_mark,
            required_mark_type: data.required_mark_type ? data.required_mark_type : "",
            quantity: Number(data.quantity),
            frequency: "Mensual",
            frequency_time: Number(data.frequency_time),
            programed_date: DateTime.fromISO(data.programed_date).toFormat('yyyy-MM-dd'),
            requested_number: Number(data.requested_number),
            url_attachment: `${newFilename}`,
            address: data.address,
            phone: data.phone,
            name: data.name,
            modelId: (data.model as any)?.id || (data.model as any)?.[0]?.id,
            affiliateId: data.affiliateId,
            claimNumber: data.claimNumber,
            ipsId: (data.ips as any)?.[0]?.id || (data.ips as any)?.value,
            cityId: (data.city as any)?.[0]?.id || (data.city as any)?.value,
            statusId: 10, //Abierto
            date_expiration: DateTime.fromISO(data.date_expiration!).toFormat('yyyy-MM-dd HH:mm:ss'),
            channel: "PQRS"
        };

        try {
            setLoading(true);
            if (!fileUpload) {
                Swal.fire({
                    title: "Error en el servicio",
                    icon: "error",
                    text: `La solicitud no pudo ser registrada, contacte al administrador`,
                });
                return;
            }

            const response = await repository.createRequest(newRequest)
            const requestId = response[0].id;
            const entitiesCount = response.length;

            Swal.fire({
                title: "Solicitud registrada",
                icon: "success",
                text: `La solicitud fue registrada exitosamente con el código ${requestId}`,
                footer: entitiesCount > 1 ? `Se crearon ${entitiesCount} solicitudes` : '',
            }).then((willSend) => {
                if (willSend.isConfirmed) {
                    navigate("/home");
                }
            });
        } catch (error: any) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: error.response?.data?.message || "Ocurrió un error inesperado",
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        productModal,
        setProductModal,
        productName,
        mark,
        isCalculable,
        handleProductSelect,
        handleProductClose,
        handleFileChange,
        onSubmit
    };
};
