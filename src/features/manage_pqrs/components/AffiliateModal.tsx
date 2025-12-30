import { Button } from "@/features/shared/components/Button";
import { Col, Row } from "@/features/shared/components/Grid";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";
import { iRequestView } from "@entities";
import { FC } from "react";

interface AffiliateModalProps {
    show: boolean;
    handleClose: () => void;
    request: iRequestView;
    setClose: () => void;
}

export const AffiliateModal: FC<AffiliateModalProps> = ({ show, handleClose, request, setClose }) => {
    return (
        <Modal show={show} onClose={() => setClose()}>
            <ModalHeader onClose={() => setClose()}>
                <ModalTitle>
                    <i className="ri-account-pin-circle-line"></i> Afiliado
                </ModalTitle>
            </ModalHeader>
            <ModalBody className="p-3">
                <Row className="mb-2 g-2">
                    <Col md={6} sm={12}>
                        <label>Tipo de Documento</label>
                            <input
                                type="text"
                                disabled
                                className=""
                                value={request.document_type}
                            />
                    </Col>

                    <Col md={6} sm={12}>
                        <label>Identificación</label>
                            <input
                                type="text"
                                disabled
                                className=""
                                value={request.document_number}
                            />
                    </Col>

                    <Col md={6} sm={12}>
                        <label>Nombres</label>
                            <input
                                type="text"
                                className=""
                                disabled
                                value={request.firstname + ' ' + request.surname}
                            />
                    </Col>

                    <Col md={6} sm={12}>
                        <label>Apellidos</label>
                            <input
                                type="text"
                                disabled
                                className=""
                                value={`${request.lastname_1} ${request.lastname_2}`}
                            />
                    </Col>

                    <Col md={12} sm={12}>
                        <label>Dirección</label>
                            <textarea
                                style={{ height: "73px" }}
                                className="form-control "
                                value={request.address}
                                disabled
                                rows={12}
                            />
                    </Col>

                    <Col md={6} sm={12}>
                        <label>Telefono</label>
                            <input
                                type="text"
                                className=""
                                disabled
                                value={request.phone}
                            />
                    </Col>
                </Row>
                <Row className="mt-4 g-2">
                    <Col md={6} sm={12}>
                        <Button variant="success" className="w-100" onClick={handleClose}>
                            Marcar como gestionado
                        </Button>
                    </Col>
                    <Col md={6} sm={12}>
                        <Button variant="danger" className="w-100" onClick={setClose}>
                            Cerrar
                        </Button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
};