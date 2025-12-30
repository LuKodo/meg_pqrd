import { Button } from "@/features/shared/components/Button";
import { Col } from "@/features/shared/components/Grid";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";
import { api } from "@/http";
import { FC, useState } from "react";

interface ConfirmBuyModalProps {
    show: boolean;
    handleClose: () => void;
    observationId: number;
    onClose?: () => void;
}

export const ConfirmBuyModal: FC<ConfirmBuyModalProps> = ({
    show,
    handleClose,
    observationId,
    onClose
}) => {
    const [odc, setOdc] = useState<string>('');

    const onSubmit = async () => {
        if (!odc || odc === '') {
            alert("Por favor ingrese el número de ODC.");
            return;
        }

        try {
            const response = await api.put(`pqrs-manage/${observationId}`, {
                json: {
                    destination: {
                        id: 1 //Compra realizada
                    },
                    buyed: true,
                    observation: odc
                },
            }).json();

            if (response) {
                alert("ODC registrada exitosamente.");
                handleClose();
            } else {
                alert("Error al registrar la ODC.");
            }
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error inesperado.");
        }
    }

    return (
        <Modal show={show} onClose={onClose ? onClose : handleClose}>
            <ModalHeader onClose={onClose ? onClose : handleClose}>
                <ModalTitle>Observaciones</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <label htmlFor="observation-select">Número de ODC</label>
                <input type="text" id="observation-select" value={odc} onChange={(e) => setOdc(e.target.value)} className="form-control" />
            </ModalBody>
            <ModalFooter>
                <Col>
                    <Button variant="info" onClick={() => onSubmit()} className="w-100">
                        Confirmar
                    </Button>
                </Col>
                <Col>
                    <Button className="w-100" onClick={onClose ? onClose : handleClose}>
                        Cancelar
                    </Button>
                </Col>
            </ModalFooter>
        </Modal>
    );
}