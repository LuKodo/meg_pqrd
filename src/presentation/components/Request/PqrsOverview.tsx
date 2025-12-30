import React from 'react';
import RequestCard from '../RequestCard.tsx';
import { requestStatePQRSMachine, StatusPQRS } from '@/utils/change-status-request.tsx';
import { RequestResponse } from "@/entities/RequestResponse.ts";
import { Card, CardBody, CardTitle } from '@/features/shared/components/Card.tsx';
import { DateTime } from 'luxon';
import { Col, Row } from '@/features/shared/components/Grid.tsx';

interface PqrsOverviewProps {
    requests: RequestResponse[] | null;
    handleFilter: (status: string, is_contingency: string) => void;
}

const PqrsOverview: React.FC<PqrsOverviewProps> = ({ requests, handleFilter }) => {
    return (
        <Card>
            <CardBody>
                <div className="d-flex flex-wrap gap-3 mb-9 justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                        <CardTitle className="fw-semibold">Solicitudes PQRSC</CardTitle>
                        <h3 className="mb-0">Última actualización: {DateTime.now().toFormat("DD MMM YYYY")}</h3>
                    </div>
                </div>
                <Row>
                    <Col md={6}>
                        <div className="vstack gap-9 mt-2">
                            <RequestCard
                                title="Abiertas"
                                count={requests?.find((request) => request.statusId === requestStatePQRSMachine.getStateId(StatusPQRS.Abierto) && request.is_contingency)?.total_count ?? "0"}
                                icon="lock-keyhole-open"
                                onClick={() => handleFilter(StatusPQRS.Abierto, 'pqrs')}
                            />
                            <RequestCard
                                title="Programadas"
                                count={requests?.find((request) => request.statusId === requestStatePQRSMachine.getStateId(StatusPQRS.Programado) && request.is_contingency)?.total_count ?? "0"}
                                icon="calendar-days"
                                onClick={() => handleFilter(StatusPQRS.Programado, 'pqrs')}
                            />
                            <RequestCard
                                title="Digitadas"
                                count={requests?.find((request) => request.statusId === requestStatePQRSMachine.getStateId(StatusPQRS.Digitado) && request.is_contingency)?.total_count ?? "0"}
                                icon="keyboard"
                                onClick={() => handleFilter(StatusPQRS.Digitado, 'pqrs')}
                            />
                            <RequestCard
                                title="Enviadas"
                                count={requests?.find((request) => request.statusId === requestStatePQRSMachine.getStateId(StatusPQRS.Enviado) && request.is_contingency)?.total_count ?? "0"}
                                icon="package-check"
                                onClick={() => handleFilter(StatusPQRS.Enviado, 'pqrs')}
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="vstack gap-9 mt-2">
                            <RequestCard
                                title="Entregadas"
                                count={requests?.find((request) => request.statusId === requestStatePQRSMachine.getStateId(StatusPQRS.Entregado) && request.is_contingency)?.total_count ?? "0"}
                                icon="square-check"
                                onClick={() => handleFilter(StatusPQRS.Entregado, 'pqrs')}
                            />
                            <RequestCard
                                title="En Devolución"
                                count={requests?.find((request) => request.statusId === requestStatePQRSMachine.getStateId(StatusPQRS.Devolucion) && request.is_contingency)?.total_count ?? "0"}
                                icon="package-x"
                                onClick={() => handleFilter(StatusPQRS.Devolucion, 'pqrs')}
                            />
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default PqrsOverview;