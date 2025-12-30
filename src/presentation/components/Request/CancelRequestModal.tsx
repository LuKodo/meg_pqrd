import { requestStatePQRSMachine, StatusPQRS, } from "@/utils";
import type { iReasonsRequest, iRequestView } from "@/entities";
import { type FC, useEffect, useState, useMemo } from "react";
import { ReasonStatusChangesRepository } from "@/features/shared/repositories";
import { RequestActions } from "@/services";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";
import { Button } from "@/features/shared/components/Button";
import { Col, Row } from "@/features/shared/components/Grid";

interface CancelRequestModalProps {
	isPQRS: boolean;
	request: iRequestView | null;
	username: number;
	show: boolean;
	handleClose: () => void;
	search?: () => void;
}

export const CancelRequestModal: FC<CancelRequestModalProps> = ({
	show,
	handleClose,
	username,
	request,
}) => {
	const [data, setData] = useState<iReasonsRequest[]>();
	const [observations, setObservations] = useState<string>("");
	const repository = useMemo(() => new ReasonStatusChangesRepository(), []);
	const requestActions = useMemo(() => new RequestActions(), []);

	const updateReason = async () => {
		if (!request?.id || !username || !observations) return;

		const success = await requestActions.markAsNulled({
			id: String(request?.id),
			userId: String(username),
			observations: observations,
		});

		if (success) {
			handleClose();
			window.history.back();
		}
	};

	useEffect(() => {
		repository.getByStatus(requestStatePQRSMachine.getStateId(StatusPQRS.Anulado)).then((response) => {
			setData(response);
		});
	}, [repository]);

	return (
		<Modal show={show} onClose={handleClose}>
			<ModalHeader onClose={handleClose}>
				<ModalTitle>Seleccione un motivo de anulación</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<div>
					<label>Motivo de Anulación</label>
					<select onChange={(e) => setObservations(String(e.target.value))} className="select">
						<option value="" />
						{data?.map((DT: iReasonsRequest) => {
							return (
								<option key={DT.id} value={DT.description}>
									{DT.description}
								</option>
							);
						})}
					</select>
				</div>
				<Row className="mt-3">
					<Col md={6} className="d-grid">
						<Button variant="info" onClick={updateReason}>Anular</Button>
					</Col>
					<Col md={6} className="d-grid">
						<Button onClick={handleClose}>Cancelar</Button>
					</Col>
				</Row>
			</ModalBody>
		</Modal >
	);
};
