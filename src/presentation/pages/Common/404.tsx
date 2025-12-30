import { Button, Card } from "react-bootstrap";

export const NotFound = () => {
  return (
    <div id="main-wrapper">
      <div className="position-relative overflow-hidden min-vh-100 w-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-lg-4">
              <div className="text-center">
                <Card>
                  <CardBody>
                    <img src="/website-under-construction.svg" alt="matdash-img" className="img-fluid mb-4" width="200" />
                    <h5 className="fw-semibold fs-5 mb-2">Oops algo salió mal!</h5>
                    <p className="mb-3 px-xl-5">La página solicitada no existe.</p>
                    <button variant="danger" onClick={() => window.location.href = "/home"}>Volver</button>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
