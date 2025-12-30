import { FC, useState } from "react";
import { api } from "@/http";
import { SAFCleanInput } from "../SAF";
import { Toast } from "../Common/ToastComponent";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface modalProps {
  show: boolean;
  handleClose: () => void;
}

export const DestinationCreateModal: FC<modalProps> = ({
  show,
  handleClose,
}) => {
  const [origin, setOrigin] = useState<number | undefined>(0);
  const [destination, setDestination] = useState<number | undefined>(0);

  const saveToDB = () => {
    origin &&
      destination &&
      api
        .post(
          "city/destination",
          { json: JSON.stringify({ originId: origin, destinationId: destination }) }
        )
        .then(() => {
          handleClose();
          Toast.fire({
            title: "Guardado exitoso",
            icon: "success",
          });
        })
        .catch(function (error: any) {
          Toast.fire({
            title: "Código " + error.response.data.statusCode,
            text: error.response.data.message,
            icon: "error",
          });
        });
  };

  return (
    <div className="modal" id="exampleModal" tabIndex={-1}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form className="section">
            <Row>
              <Col>
                <label>SAF Origen</label>
                <SAFCleanInput selected={origin} setSelected={setOrigin} />
              </Col>
              <Col>
                <label>SAF Destino</label>
                <SAFCleanInput
                  selected={destination}
                  setSelected={setDestination}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Row className="mt-3">
                  <Col md={6}>
                    <Button
                      className="w-100"
                      type="button"
                      onClick={() => {
                        saveToDB();
                      }}
                    >
                      Guardar
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="w-100"
                      type="button"
                      onClick={() => handleClose()}
                    >
                      Cancelar
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </form >
        </div >
      </div >
    </div >
  );
};
