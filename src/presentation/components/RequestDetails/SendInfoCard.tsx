import React from 'react';
import { DateTime } from 'luxon';
import { iRequestView } from '@/entities';
import { Card, CardBody, CardTitle } from '@/features/shared/components/Card';
import { Col, Row } from '@/features/shared/components/Grid';

interface SendInfoCardProps {
  request: iRequestView;
}

export const SendInfoCard: React.FC<SendInfoCardProps> = ({ request }) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <CardTitle className="mb-2">
            <i className="bi bi-truck fs-5" /> Envío
          </CardTitle>
        </div>

        <Row className="mb-2 g-2">
          <Col md={6} sm={12}>
            <label>Fecha de Envío</label>
            <input
              className=""
              type="text"
              disabled
              value={
                request.sended
                  ? DateTime.fromJSDate(new Date(request.sended)).toFormat("yyyy-MM-dd")
                  : "No ha sido enviado"
              }
            />
          </Col>

          <Col md={6} sm={12}>
            <label>Transportadora</label>
            <input
              type="text"
              className=""
              disabled
              value={
                request.name
                  ? request.name
                  : "No ha sido enviado"
              }
            />
          </Col>

          <Col md={6} sm={12}>
            <label>Número de Guía</label>
            <input
              className=""
              type="text"
              disabled
              value={
                request.guide_number
                  ? request.guide_number
                  : "No ha sido enviado"
              }
            />
          </Col>

          <Col md={6} sm={12}>
            <label>Fecha de Entrega</label>
            <input
              type="text"
              disabled
              className=""
              value={
                request.delivered
                  ? DateTime.fromJSDate(new Date(request.delivered)).toFormat("yyyy-MM-dd")
                  : "No ha sido entregado"
              }
            />
          </Col>
        </Row>
      </CardBody>
    </Card >
  );
};