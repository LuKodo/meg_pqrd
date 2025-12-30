import { type FC, useEffect, useState } from "react";
import type { iRequestView } from "@/entities";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/features/shared/components/Modal.tsx";
import { Col } from "@/features/shared/components/Grid.tsx";
import { Button } from "@/features/shared/components/Button.tsx";

interface EditModalProps {
    show: boolean;
    handleClose: () => void;
    request: iRequestView;
    isPQRS: boolean;
}

interface Solicitud {
    address: string;
    addressError: false;
    addressErrorMsg: string;
    phone: string;
    phoneError: false;
    phoneErrorMsg: string;
}

export const EditModal: FC<EditModalProps> = ({ show, handleClose, request }) => {
    const [solicitud, setSolicitud] = useState<Solicitud>({
        address: request.address,
        addressError: false,
        addressErrorMsg: '',
        phone: request.phone,
        phoneError: false,
        phoneErrorMsg: ''
    });

    useEffect(() => {
        setSolicitud({
            address: request.address,
            addressError: false,
            addressErrorMsg: '',
            phone: request.phone,
            phoneError: false,
            phoneErrorMsg: ''
        })
    }, [request]);

    const handleChangeSolicitud = (key: keyof Solicitud, value: string) => {
        setSolicitud(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const onSubmit = async () => {
        if (request && !solicitud.phoneError && !solicitud.addressError) {
        }
    }

    return (
        <form>
            <Modal>
                <ModalHeader>
                    <ModalTitle>Editar Datos de la Solicitud #{request.id}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <label>Dirección:</label>
                        <textarea
                            className={"form-control"}
                            value={solicitud.address}
                            onChange={(e) => handleChangeSolicitud('address', e.target.value)}
                        >

                        </textarea>
                        {solicitud.addressError && (
                            <div className="invalid-feedback d-block">
                                {solicitud.addressErrorMsg}
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            value={solicitud.phone}
                            onChange={(e) => handleChangeSolicitud('phone', e.target.value)}
                        />
                        {solicitud.phoneError && (
                            <div className="invalid-feedback d-block">
                                {solicitud.phoneErrorMsg}
                            </div>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Col>
                        <Button variant="info" onClick={() => onSubmit()} className="w-100">
                            Confirmar
                        </Button>
                    </Col>
                    <Col>
                        <Button className="w-100" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Col>
                </ModalFooter>
            </Modal>
        </form>
    );
};
