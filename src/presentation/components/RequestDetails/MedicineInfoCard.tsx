import React from 'react';
import { Col, Row } from '@/features/shared/components/Grid';
import { Card, CardBody, CardTitle } from '@/features/shared/components/Card';
import { StatusPQRS, requestStatePQRSMachine } from '@/utils';
import { iRequestView, iModel } from '@/entities';
import { RequestActions } from '@/services';

interface MedicineInfoCardProps {
  request: iRequestView;
  model: number;
  setModel: (value: number) => void;
  models: iModel[];
  channel: string;
  setChannel: (value: string) => void;
}

const requestActions = new RequestActions();

export const MedicineInfoCard: React.FC<MedicineInfoCardProps> = ({
  request,
  model,
  setModel,
  models,
  channel = "MEG",
  setChannel,
}) => {
  const isEditable = request.estado === requestStatePQRSMachine.getStateLabel(StatusPQRS.Abierto);

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-2 d-flex justify-content-between">
          <span><i className="bi bi-capsule fs-5" /> Medicamento</span>
          <span className='badge bg-warning'>{request.required_mark !== '' && 'Marca Requerida'}</span>
        </CardTitle>

        <Row className="mb-2 g-2">
          <Col md={6} sm={12}>
            <label>Canal</label>
            <select className="form-select"
              disabled={!isEditable} value={channel} onChange={(e) => {
                setChannel(e.target.value);
                setModel(0);
              }}>
              <option value="MEG">MEG</option>
              <option value="PQRS">PQRS</option>
            </select>
          </Col>
          <Col md={6} sm={12}>
            <label>Modelo</label>
            <select
              onChange={(e) => setModel(Number(e.target.value))}
              disabled={!isEditable}
              value={model}
            >
              <option value="0" />
              {models?.filter((m: iModel) => m.categoriesId === (channel === "PQRS" ? 3 : 2)).map((m: iModel) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </Col>

          <Col md={6} sm={12}>
            <label>Código Genérico</label>
            <input
              className=""
              type="text"
              value={request.code}
              disabled
            />
          </Col>

          <Col md={6} sm={12}>
            <label>Marca Requerida</label>
            <input
              className=""
              type="text"
              value={request.required_mark === '' ? 'NO' : (requestActions.extraerMarcaComercial(request.medicamento || ''))}
              disabled
            />
          </Col>

          <Col md={12} sm={12}>
            <label>Descripción</label>
            <textarea
              disabled
              value={request.medicamento}
              className="form-control"
              style={{ height: "100px" }}
            />
          </Col>

          <Col md={6} sm={12}>
            <label>Cantidad</label>
            <input
              className=""
              type="text"
              disabled
              value={request.quantity}
            />
          </Col>

          <Col md={6} sm={12}>
            <label>Número de Entrega</label>
            <input
              type="text"
              className=""
              value={request.requested_number}
              disabled
            />
          </Col>
        </Row>
      </CardBody>
    </Card >
  );
};