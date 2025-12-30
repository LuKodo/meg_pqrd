import { type FC, useEffect, useState } from "react";
import type { iRequest, iRequestView } from "@/entities";
import Swal from "sweetalert2";
import { RequestActions } from "@/services";
import { useSessionManager } from "@/features/shared/hooks/useSessionManager";
import { DateTime } from "luxon";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";
import { Badge } from "@/features/shared/components/Badge";
import { Button } from "@/features/shared/components/Button";
import { Col } from "@/features/shared/components/Grid";

interface ConfirmDeliveryProps {
	show: boolean;
	handleClose: () => void;
	request: iRequest | iRequestView;
	isPQRS?: boolean;
	setClose: () => void;
}

export const ConfirmDelivery: FC<ConfirmDeliveryProps> = ({
	show,
	handleClose,
	request,
	setClose
}) => {
	const { userData } = useSessionManager();
	const [deliveredDate, setDeliveredDate] = useState<string>(DateTime.now().toFormat("yyyy-MM-dd"));
	const [guide_number_error, setGuideNumberError] = useState<boolean>(false);
	const requestActions = new RequestActions();

	useEffect(() => {
		if (!deliveredDate) {
			setGuideNumberError(true);
		} else {
			setGuideNumberError(false);
		}
	}, [deliveredDate]);

	const onSubmit = async () => {
		setGuideNumberError(false);

		if (!deliveredDate) {
			setGuideNumberError(true);
		}

		if (request && deliveredDate && userData?.id) {
			await requestActions.markAsDelivered({
				id: request.id,
				userId: userData?.id.toString(),
				delivered: deliveredDate,
			});
			window.history.back();
		}

	};

	useEffect(() => {
		setDeliveredDate("");
		setGuideNumberError(false);
	}, []);

	const handleChangeDate = (e: string) => {
		const newDate = DateTime.fromISO(e).startOf('day');
		if (newDate < DateTime.now().startOf('day')) {
			Swal.fire({
				title: "Error",
				icon: "warning",
				text: "La Fecha de Entrega no puede ser menor a la Fecha de hoy"
			})
				.then(() => {
					setDeliveredDate(new Date().toISOString().split('T')[0]);
					return
				})
		}

		if (newDate < DateTime.fromJSDate(request.sended!).startOf('day')) {
			Swal.fire({
				title: "Error",
				icon: "warning",
				text: "La Fecha de Entrega no puede ser menor a la Fecha de Envío"
			})
				.then(() => {
					setDeliveredDate(new Date().toISOString().split('T')[0]);
					return
				})
		}

		setDeliveredDate(newDate.toFormat("yyyy-MM-dd"));
	}

	return (
		<form>
			<Modal show={show} onClose={() => setClose()}>
				<ModalHeader onClose={() => setClose()}>
					<ModalTitle>Confirmar entrega</ModalTitle>
					{!(DateTime.now() <= DateTime.fromISO(request.programed_date as string)) && (
						<Badge>Inoportuno</Badge>
					)}
				</ModalHeader>
				<ModalBody>
					<div>
						<label>Fecha de entrega</label>
						<input
							type="date"
							value={deliveredDate}
							min={DateTime.now().toFormat("yyyy-MM-dd")}
							onChange={(e) => handleChangeDate(e.target.value)}
						/>
						{guide_number_error && (
							<div className="invalid-feedback d-block">
								Seleccione una fecha válida
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
						<Button variant="info" onClick={handleClose} className="w-100">
							Cancelar
						</Button>
					</Col>
				</ModalFooter>
			</Modal>
		</form>
	);
};
