import { type FC, useEffect, useState } from "react";
import { InopportuneInput } from "./InopportuneInput.tsx";
import type { iRequestView } from "@/entities";
import { useSessionManager } from "@/features/shared/hooks/useSessionManager";
import Swal from "sweetalert2";
import { RequestActions } from "@/services/index.ts";
import { DateTime } from "luxon";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/features/shared/components/Modal.tsx";
import { Badge } from "@/features/shared/components/Badge.tsx";
import { Col } from "@/features/shared/components/Grid.tsx";
import { Button } from "@/features/shared/components/Button.tsx";

interface ConfirmTypingProps {
	show: boolean;
	handleClose: () => void;
	request: iRequestView;
}

export const ConfirmTyping: FC<ConfirmTypingProps> = ({
	show,
	handleClose,
	request,
}) => {
	const { userData } = useSessionManager();
	const chance = DateTime.now() <= DateTime.fromJSDate(request.programed_date!);
	const [date_typing, setDateTyping] = useState<string>(DateTime.now().startOf('day').toFormat("yyyy-MM-dd"));
	const [formula_number, setFormulaNumber] = useState<string>();
	const [formula_number_error, setFormulaNumberError] =
		useState<boolean>(false);
	const [observations, setObservations] = useState<string>();
	const [observations_error, setObservationsError] = useState<boolean>(false);
	const [auth_number, setAuthNumber] = useState<string>("");

	const requestActions = new RequestActions();
	const onSubmit = async () => {
		setFormulaNumberError(false);
		setObservationsError(false);

		if (!formula_number) {
			setFormulaNumberError(true);
		}

		if (!observations) {
			setObservationsError(true);
		}

		if (!userData?.id || !formula_number || !observations) {
			return;
		}

		const success = await requestActions.markAsDigited(
			request.id,
			String(userData?.id),
			date_typing,
			auth_number,
			formula_number,
			observations
		);

		if (success) {
			myClose();
		}
	};

	useEffect(() => {
		setFormulaNumber("");
		setObservations("");
		setAuthNumber("");
		setFormulaNumberError(false);
		setObservationsError(false);
	}, []);

	const myClose = () => {
		setFormulaNumber("");
		setObservations("");
		setAuthNumber("");
		setFormulaNumberError(false);
		setObservationsError(false);
		handleClose();
		window.history.back();
	};

	const handleChangeDate = (e: string) => {
		const newDate = DateTime.fromISO(e).startOf('day');

		if (newDate < DateTime.now().startOf('day')) {
			Swal.fire({
				title: "Error",
				icon: "warning",
				text: "La Fecha de Digitación no puede ser menor a la Fecha de hoy"
			})

			setDateTyping(DateTime.now().startOf('day').toFormat("yyyy-MM-dd"));
			return;
		}

		setDateTyping(newDate.toFormat("yyyy-MM-dd"));
	}

	return (
		<form>
			<Modal>
				<ModalHeader>
					<ModalTitle>Confirmar digitación</ModalTitle>
					{!(DateTime.now() <= DateTime.fromJSDate(request.programed_date!)) && (
						<Badge>Inoportuno</Badge>
					)}
				</ModalHeader>
				<ModalBody>
					<div>
						<label>Fecha de digitación</label>
						<input type="date" value={date_typing} min={DateTime.now().toFormat("yyyy-MM-dd")} onChange={(e) => handleChangeDate(e.target.value)} />
					</div>
					<div className="mt-3">
						<label>Autorización</label>
						<input
							value={auth_number}
							onChange={(e) => setAuthNumber(e.target.value)}
						/>
					</div>
					<div className="mt-3">
						<label># Formula</label>
						<input
							value={formula_number}
							onChange={(e) => setFormulaNumber(e.target.value)}
						/>
						{formula_number_error && (
							<div className="invalid-feedback d-block">
								Debe digitar una formula
							</div>
						)}
					</div>
					<div className="mt-3">
						{chance ? (
							<>
								<label>Observaciones</label>
								<textarea
									value={observations ? observations : ""}
									onChange={(e) => setObservations(e.target.value)}
								/>
							</>
						) : (
							<InopportuneInput
								value={observations ? observations : ""}
								setValue={setObservations}
							/>
						)}
						{observations_error && (
							<div className="invalid-feedback d-block">
								{chance
									? "Escribe una observación"
									: "Debes seleccionar un motivo de inportunidad"}
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
						<Button className="w-100" onClick={handleClose}>
							Cancelar
						</Button>
					</Col>
				</ModalFooter>
			</Modal>
		</form>
	);
};
