import { type FC, useEffect, useState } from "react";
import type { iRequestView } from "@/entities";
import { useSessionManager } from "@/features/shared/hooks/useSessionManager";
import Swal from "sweetalert2";
import ConveyorsInput from "../Transport/ConveyorsInput.tsx";
import { RequestActions } from "@/services/index.ts";
import { DateTime } from "luxon";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/features/shared/components/Modal.tsx";
import { Badge } from "@/features/shared/components/Badge.tsx";
import { Col } from "@/features/shared/components/Grid.tsx";
import { Button } from "@/features/shared/components/Button.tsx";

interface ConfirmShipmentProps {
	show: boolean;
	handleClose: () => void;
	request: iRequestView;
	status: number;
}

export const ConfirmShipment: FC<ConfirmShipmentProps> = ({
	show,
	handleClose,
	request,
	status,
}) => {
	const { userData } = useSessionManager();
	const [date_sended, setDateTyping] = useState<string>(DateTime.now().startOf('day').toFormat("yyyy-MM-dd"));
	const [guide_number, setGuideNumber] = useState<string>();
	const [guide_number_error, setGuideNumberError] = useState<boolean>(false);
	const [conveyor, setConveyor] = useState<number>();
	const [conveyor_error, setConveyorError] = useState<boolean>(false);

	const requestActions = new RequestActions();

	const onSubmit = async () => {
		setGuideNumberError(false);
		setConveyorError(false);

		if (!guide_number) {
			setGuideNumberError(true);
		}

		if (!conveyor) {
			setConveyorError(true);
		}

		if (!request || !userData?.username || !guide_number || !conveyor) {
			return;
		}
		if (request && userData?.id) {
			const success = await requestActions.markAsSended(
				request.id,
				userData?.id.toString(),
				date_sended,
				guide_number,
				conveyor,
				status === 13
			);

			if (success) {
				myClose();
			}
		}
	};

	const handleChangeDate = (e: string) => {
		const newDate = DateTime.fromISO(e).startOf('day');

		if (newDate < DateTime.now().startOf('day')) {
			Swal.fire({
				title: "Error",
				icon: "warning",
				text: "La Fecha de Envío no puede ser menor a la Fecha de hoy"
			})
				.then(() => {
					setDateTyping(new Date().toISOString().split('T')[0]);
					return
				})
		}
		setDateTyping(newDate.toFormat("yyyy-MM-dd"));
	}

	useEffect(() => {
		setGuideNumber("");
		setConveyor(undefined);
		setGuideNumberError(false);
		setConveyorError(false);
	}, []);

	const myClose = () => {
		setGuideNumber("");
		setConveyor(undefined);
		setGuideNumberError(false);
		setConveyorError(false);
		handleClose();
		window.history.back();
	};

	return (
		<form>
			<Modal>
				<ModalHeader>
					<ModalTitle>
						Confirmar {status === 13 ? "Envío Manual" : "Envío"}
					</ModalTitle>
					{!(DateTime.now() <= DateTime.fromJSDate(request.programed_date!)) && (
						<Badge>Inoportuno</Badge>
					)}
				</ModalHeader>
				<ModalBody>
					<div>
						<label>Fecha de Envío</label>
						<input type="date" value={date_sended} min={DateTime.now().toFormat('yyyy-MM-dd')} onChange={(e) => handleChangeDate(e.target.value)} />
					</div>
					<div className="mt-3">
						<label>Número de Guía</label>
						<input
							value={guide_number}
							onChange={(e) => setGuideNumber(e.target.value)}
						/>
						{guide_number_error && (
							<div className="invalid-feedback d-block">
								Debe digitar el número de guía
							</div>
						)}
					</div>
					<div className="mt-3">
						<label>Transportadora</label>
						<ConveyorsInput selected={conveyor} setSelected={setConveyor} />
						{conveyor_error && (
							<div className="invalid-feedback d-block">
								Debe seleccionar una transportadora
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
						<Button className="w-100" onClick={myClose}>
							Cancelar
						</Button>
					</Col>
				</ModalFooter>
			</Modal>
		</form>
	);
};
