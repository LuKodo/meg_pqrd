import { type FC, useEffect, useState } from "react";
import { iRequestView } from "@/entities";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";
import { Badge } from "@/features/shared/components/Badge";
import { DateTime } from "luxon";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface ConfirmApplicationProps {
	show: boolean;
	handleClose: () => void;
	request: iRequestView;
}

export const ConfirmApplication: FC<ConfirmApplicationProps> = ({
	show,
	handleClose,
	request,
}) => {
	const [batchDate, setBatchDate] = useState<string>();
	const [batchDateError, setBatchDateError] = useState<boolean>(false);

	useEffect(() => {
		if (!batchDate) {
			setBatchDateError(true);
		} else {
			setBatchDateError(false);
		}
	}, [batchDate]);

	const onSubmit = async () => {
		setBatchDateError(false);

		if (!batchDate) {
			setBatchDateError(true);
		}
		if (request && batchDate) {
		}
	};

	useEffect(() => {
		setBatchDate(undefined);
		setBatchDateError(false);
	}, []);

	const myClose = () => {
		setBatchDate(undefined);
		setBatchDateError(false);
		handleClose();
	};

	return (
		<form>
			<Modal>
				<ModalHeader>
					<ModalTitle>
						Confirmar{" "}
						{request.channel == 'meg' ? "Aplicación" : (request.channel == 'pqrs' ? "Entrega a Beneficiario" : "Aplicación")}
					</ModalTitle>
					{!(DateTime.now().toMillis() <= DateTime.fromJSDate(request.programed_date!).toMillis()) && (
						<Badge>Inoportuno</Badge>
					)}
				</ModalHeader>
				<ModalBody>
					<Row>
						<Col>
							<label>Fecha de aplicación</label>
							<input
								type="date"
								value={batchDate}
								min={DateTime.fromJSDate(request.delivered!).toFormat("yyyy-MM-dd")}
								onChange={(e) => setBatchDate(e.target.value)}
							/>
							{batchDateError && (
								<div className="invalid-feedback d-block">
									Seleccione una fecha válida
								</div>
							)}
						</Col>
					</Row>
				</ModalBody>
				<ModalFooter>
					<Col>
						<Button variant="info" onClick={() => onSubmit()} className="w-100">
							Confirmar
						</Button>
					</Col>
					<Col>
						<Button onClick={myClose}>
							Cancelar
						</Button>
					</Col>
				</ModalFooter>
			</Modal>
		</form>
	);
};
