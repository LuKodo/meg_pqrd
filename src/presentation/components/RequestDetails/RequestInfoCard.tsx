import React from 'react';
import { Col, Row } from '@/features/shared/components/Grid';
import { Card, CardBody, CardTitle } from '@/features/shared/components/Card';
import { iRequestView } from '@/entities';
import { DateTime } from 'luxon';

interface RequestInfoCardProps {
  request: iRequestView;
}

export const RequestInfoCard: React.FC<RequestInfoCardProps> = ({ request }) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <CardTitle className="mb-2">
            <i className="bi bi-clipboard2-fill fs-5" /> Solicitud
          </CardTitle>
        </div>

        <Row className="mb-2 mt-2 g-2">
          <Col md={6} sm={12}>
            <label>Solicitud</label>
            <input
              type="text"
              className=""
              disabled
              value={request.id}
            />
          </Col>

          <Col md={6} sm={12}>
            <label>Sede</label>
            <input
              type="text"
              className=""
              value={request.sede}
              disabled
            />
          </Col>

          <Col md={6} sm={12}>
            <label>Registrado por</label>
            <input
              type="text"
              disabled
              className=""
              value={request.username}
            />
          </Col>

          <Col md={6} sm={12}>
            <label>Formula</label>
            <input
              type="text"
              disabled
              className=""
              value={request.formula}
            />
          </Col>

          <Col md={4} sm={12}>
            <label>Fecha de Radicación</label>
            <input
              type="text"
              disabled
              className=""
              value={request?.createdAt ? DateTime.fromJSDate(request.createdAt).toFormat("yyyy-MM-dd") : ''}
            />
          </Col>

          <Col md={4} sm={12}>
            <label>Fecha Esperada Mutual</label>
            <input
              type="text"
              disabled
              className=""
              value={request?.programed_date ? DateTime.fromJSDate(request.programed_date).toFormat("yyyy-MM-dd") : ''}
            />
          </Col>

          <Col md={4} sm={12}>
            <label>Fecha Gestión Pharmaser</label>
            <input
              type="text"
              className=""
              disabled
              value={request?.self_management_date ? DateTime.fromJSDate(request.self_management_date).toFormat("yyyy-MM-dd") : ''}
            />
          </Col>
        </Row>
      </CardBody>
    </Card >
  );
};