import React from 'react';
import { Col, Row } from '@/features/shared/components/Grid';
import { Card, CardBody, CardTitle } from '@/features/shared/components/Card';
import { iRequestView } from '@/entities';
import { iDepartment, iCity } from '@/entities';
import { requestStatePQRSMachine, StatusPQRS } from '@/utils';

interface IPSInfoCardProps {
  request: iRequestView;
  name: string;
  setName: (value: string) => void;
  department: number;
  setDepartment: (value: number) => void;
  city: number;
  setCity: (value: number) => void;
  ipsAddress: string;
  setIpsAddress: (value: string) => void;
  departments: iDepartment[];
  cities: iCity[];
  isHistoric: boolean;
}

export const IPSInfoCard: React.FC<IPSInfoCardProps> = ({
  request,
  name,
  setName,
  department,
  setDepartment,
  city,
  setCity,
  ipsAddress,
  setIpsAddress,
  departments,
  cities,
  isHistoric
}) => {
  const isEditable = !isHistoric && request.estado === requestStatePQRSMachine.getStateLabel(StatusPQRS.Abierto);

  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <CardTitle className="mb-2">
            <i className="bi bi-house-fill fs-5" /> IPS / Domicilio
          </CardTitle>
        </div>

        <Row className="mb-2 g-2">
          <Col md={6} sm={12}>
            <label>IPS</label>
            <input
              type="text"
              className=""
              disabled
              value={request.ips}
            />
          </Col>

          <Col md={6} sm={12}>
            <label>Funcionario IPS</label>
            <input
              type="text"
              className=""
              value={request.ips_delegate || name}
              disabled={!isEditable}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>

          <Col md={6} sm={12}>
            <label>Departamento</label>
            <select
              onChange={(e) => setDepartment(Number(e.target.value))}
              value={department}
              className=""
              disabled={!isEditable}
            >
              <option value="0" />
              {departments?.map((dept) => (
                <option value={dept.id} key={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </Col>

          <Col md={6} sm={12}>
            <label>Ciudad</label>
            <select
              onChange={(e) => setCity(Number(e.target.value))}
              value={city}
              className=""
              disabled={!isEditable}
            >
              <option value="0" />
              {cities?.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Col>

          <Col md={12} sm={12}>
            <label>Dirección</label>
            <input
              type="text"
              className=""
              style={{ height: "100px" }}
              value={ipsAddress}
              disabled={!isEditable}
              onChange={(e) => setIpsAddress(e.target.value)}
            />
          </Col>
        </Row>
      </CardBody>
    </Card >
  );
};
