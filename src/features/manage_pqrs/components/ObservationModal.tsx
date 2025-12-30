import { Observation } from "@/entities/Observations";
import { FC, useEffect, useState } from "react";
import { useObservations } from "../hooks/useObservations";
import { useSessionManager } from "@/features/shared/hooks";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";
import { Col } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface ObservationModelProps {
    show: boolean;
    handleClose: () => void;
    requestId: string;
    onClose?: () => void;
}

export const ObservationModel: FC<ObservationModelProps> = ({ show, handleClose, requestId, onClose }) => {
    const [observation, setObservation] = useState<Observation | null>(null);
    const { observations } = useObservations();
    const { getRole } = useSessionManager();
    const role = getRole();
    const [items, setItems] = useState<Observation[]>(observations);

    useEffect(() => {
        setItems(observations.filter(obs => obs.userOrigin.includes(role)));
    }, [observations]);

    const myHandleClose = () => {
        setObservation(null);
        handleClose();
    }

    const handleObservation = (obs: Observation | null) => {
        if (!obs) return;
        setObservation(obs);
    }

    const onSubmit = async () => {
        if (!observation) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_URI_API}/pqrs-manage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify({
                    request: {
                        id: requestId
                    },
                    destination: {
                        id: observation.id,
                    }
                }),
            });

            if (response.ok) {
                alert("Observación agregada exitosamente.");
                handleClose();
            } else {
                alert("Error al agregar la observación.");
            }
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error inesperado.");
        }
    }

    return (
        <Modal show={show} onClose={onClose ? onClose : myHandleClose}>
            <ModalHeader onClose={onClose ? onClose : myHandleClose}>
                <ModalTitle>Observaciones</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <label htmlFor="observation-select">Seleccionar Observación:</label>
                <select className="form-control" onChange={(e) => handleObservation(items.find(obs => obs.id === Number(e.target.value)) || null)}>
                    <option value="">-- Seleccione una observación --</option>
                    {items.map((obs) => (
                        <option selected={obs.id === observation?.id} key={obs.id} value={obs.id}>{obs.observation}</option>
                    ))}
                </select>
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
};