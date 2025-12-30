import React from 'react';
import { iRequestView } from '@/entities';
import { Card, CardBody, CardTitle } from '@/features/shared/components/Card';
import { Col, Row } from '@/features/shared/components/Grid';

interface AffiliateInfoCardProps {
  request: iRequestView;
  affiliateAddress: string;
  setAffiliateAddress: (value: string) => void;
}

export const AffiliateInfoCard: React.FC<AffiliateInfoCardProps> = ({
  request,
  affiliateAddress,
  setAffiliateAddress
}) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <CardTitle className="mb-2">
            <i className="bi bi-person-fill fs-5" /> Afiliado
          </CardTitle>
        </div>

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
              value={`${request.firstname} ${request.surname}`}
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
              value={affiliateAddress}
              disabled
              rows={12}
              onChange={(e) => setAffiliateAddress(e.target.value)}
            />
          </Col>
        </Row>
      </CardBody>
    </Card >
  );
};