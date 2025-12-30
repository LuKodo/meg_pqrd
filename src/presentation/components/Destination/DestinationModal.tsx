import { Dispatch, FC, SetStateAction } from "react";
import { instance } from "@/utils";
import { SAFCleanInput } from "@/presentation/components";
import { toast } from "sonner";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface modalProps {
  id: number;
  show: boolean;
  handleClose: () => void;
  origin: number | undefined;
  destination: number | undefined;
  setOrigin: Dispatch<SetStateAction<number | undefined>>;
  setDestination: Dispatch<SetStateAction<number | undefined>>;
}

export const DestinationModal: FC<modalProps> = ({
  id,
  show,
  handleClose,
  origin,
  setOrigin,
  destination,
  setDestination,
}) => {
  const saveToDB = () => {
    origin &&
      destination &&
      instance
        .put(
          `city/destination?id=${id}`,
          {json: JSON.stringify({ origin: origin, destination: destination })}
        )
        .then(() => {
          handleClose();
          toast.success("Guardado exitoso");
        })
        .catch(function (error: any) {
          toast.error("Error al guardar");
        });
  };

  return (
    <Modal show={show} onClose={handleClose}>
      <ModalBody>
        <form className="section">
          {origin && destination && (
            <>
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
              <Row className="mt-3">
                <Col md={6}>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Button
                        className="w-100"
                        type="button"
                        onClick={() => {
                          saveToDB();
                        }}
                        variant="info"
                      >
                        Guardar
                      </Button>
                    </Col>
                    <Col md={6}>
                      <Button className="w-100" onClick={handleClose}>
                        Cancelar
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )
          }
        </form >
      </ModalBody >
    </Modal >
  );
};
