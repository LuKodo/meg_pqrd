import { requestStatePQRSMachine, StatusPQRS } from "@/utils";

import type { iReasonsRequest, iRequestView } from "@/entities";
import { type FC, useEffect, useState } from "react";
import { ReasonStatusChangesRepository } from "@/features/shared/repositories";
import { RequestActions } from "@/services";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

const repository = new ReasonStatusChangesRepository();

interface RestoreModalProps {
    request: iRequestView | null;
    username: number;
    show: boolean;
    handleClose: () => void;
    search?: () => void;
}

export const RestoreModal: FC<RestoreModalProps> = ({
    show,
    handleClose,
    username,
    request
}) => {
    const [data, setData] = useState<iReasonsRequest[]>();
    const [observations, setObservations] = useState<string>("");
    const requestActions = new RequestActions();

    const updateReason = async () => {
        const data = await requestActions.markAsRestored({
            id: String(request?.id),
            userId: String(username),
            observations: observations,
        });

        if (data) {
            handleClose();
            window.history.back();
        }
    };

    useEffect(() => {
        repository.getByStatus(requestStatePQRSMachine.getStateId(StatusPQRS.Reintegrado))
            .then((response) => {
                setData(response);
            });
    }, []);

    return (
        <Modal show={show} onClose={handleClose}>
            <ModalHeader onClose={handleClose}>
                <ModalTitle>Seleccione un motivo de Reintegro</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div>
                    <label>Motivo de Reintegro</label>
                    <select onChange={(e) => setObservations(String(e.target.value))}>
                        <option value="" />
                        {data?.map((DT: iReasonsRequest) => {
                            return (
                                <option key={DT.id} value={DT.description}>
                                    {DT.description}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <Row className="mt-3">
                    <Col className="d-grid">
                        <Button variant="info" onClick={updateReason}>Reintegrar</Button>
                    </Col>
                    <Col className="d-grid">
                        <Button onClick={handleClose}>Cancelar</Button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal >
    );
};
