import { requestStatePQRSMachine } from '@/utils';
import { iRequestView } from '@/entities';
import { Col, Row } from '@/features/shared/components/Grid';
import { Button } from '@/features/shared/components/Button';
import { IconChevronLeft } from '@/svg';

interface RequestHeaderProps {
  request: iRequestView;
  isPQR: boolean;
}

export const RequestHeader: React.FC<RequestHeaderProps> = ({ request, isPQR }) => {
  return (
    <Row>
      <Col>
        <Button
          onClick={() => window.history.go(-1)}
          className="mb-2"
          variant="light"
        >
          <IconChevronLeft /> Volver
        </Button>
        {request.estado && (
          <span className="float-end">
            <Button
              variant={requestStatePQRSMachine.getStateColor(
                requestStatePQRSMachine.findStateByValue(request?.estado ?? '')
              )}
            >
              {requestStatePQRSMachine.getIcon(
                requestStatePQRSMachine.findStateByValue(request?.estado ?? null)
              )}{' '}
              {request?.estado}
            </Button>
          </span>
        )}
        {!isPQR && (request as iRequestView).homologateId && (
          <span className="me-2 float-end fw-bold">
            <Button variant="danger" className="fw-bold">
              Tradicional: {(request as iRequestView).homologateId}
            </Button>
          </span>
        )}
      </Col>
    </Row >
  );
};