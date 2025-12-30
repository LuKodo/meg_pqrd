import { type FC, useEffect, useState } from "react";
import type { iRequestView } from "@/entities";
import { useSessionManager } from "@/features/shared/hooks/useSessionManager";

import DeliveryFailedReasons from "./DeliveryFailedReasons.tsx";
import { RequestActions } from "@/services/index.ts";
import { DateTime } from "luxon";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/features/shared/components/Modal.tsx";
import { Badge } from "@/features/shared/components/Badge.tsx";
import { Button } from "@/features/shared/components/Button.tsx";
import { Col } from "@/features/shared/components/Grid.tsx";

interface ConfirmDeliveryFailedProps {
	show: boolean;
	handleClose: () => void;
	request: iRequestView;
	isPQRS: boolean;
}

export const ConfirmDeliveryFailed: FC<ConfirmDeliveryFailedProps> = ({
	show,
	handleClose,
	request,
}) => {
	const { userData } = useSessionManager();
	const [undeliveredReason, setUndeliveredReason] = useState<string>();
	const [undeliveredReasonError, setUndeliveredReasonError] =
		useState<boolean>(false);
	const requestActions = new RequestActions();

	useEffect(() => {
		if (!undeliveredReason) {
			setUndeliveredReasonError(true);
		} else {
			setUndeliveredReasonError(false);
		}
	}, [undeliveredReason]);

	const onSubmit = async () => {
		setUndeliveredReasonError(false);

		if (!undeliveredReason) {
			setUndeliveredReasonError(true);
		}

		if (!request.id || !userData?.id) {
			return;
		}

		const success = await requestActions.markAsDeliveredFailed({
			id: request.id,
			userId: userData?.id.toString(),
			delivered: DateTime.now().toFormat("yyyy-MM-dd"),
			observations: undeliveredReason,
		});

		if (success) {
			window.history.back();
		}
	};

	useEffect(() => {
		setUndeliveredReason("");
		setUndeliveredReasonError(false);
	}, []);

	return (
		<form>
			<Modal>
				<ModalHeader>
					<ModalTitle>Confirmar devolución</ModalTitle>
					{!(DateTime.now() <= DateTime.fromJSDate(request.programed_date!)) && (
						<Badge>Inoportuno</Badge>
					)}
				</ModalHeader>
				<ModalBody>
					<div>
						<label>Motivo de devolución</label>
						<DeliveryFailedReasons
							selected={undeliveredReason}
							setSelected={setUndeliveredReason}
						/>
						{undeliveredReasonError && (
							<div className="invalid-feedback d-block">
								Seleccione un motivo válido
							</div>
						)}
					</div>
				</ModalBody>
				<ModalFooter>
					<Col>
						<Button variant="info" onClick={() => onSubmit()} className="w-100">
							Confirmar
						</Button>
					</Col>
					<Col>
						<button className="w-100" onClick={handleClose}>
							Cancelar
						</button>
					</Col>
				</ModalFooter>
			</Modal>
		</form>
	);
};
