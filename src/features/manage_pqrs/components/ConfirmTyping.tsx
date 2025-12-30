import { type FC, useEffect, useState } from "react";
import type { iRequest, iRequestView } from "@entities";
import Swal from "sweetalert2";
import { useSessionManager } from "@/features/shared/hooks";
import { DateTime } from "luxon";
import { RequestActions } from "@/services";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";
import { Badge } from "@/features/shared/components/Badge";
import { InopportuneInput } from "@/presentation/components";
import { Col } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface ConfirmTypingProps {
	show: boolean;
	handleClose: () => void;
	request: iRequest | iRequestView;
	setClose?: () => void;
}

export const ConfirmTyping: FC<ConfirmTypingProps> = ({
	show,
	handleClose,
	request,
	setClose,
}) => {
	const { userData, getRole } = useSessionManager();
	const role = getRole();
	const chance = DateTime.now() < DateTime.fromISO(request.programed_date as string);
	const [date_typing, setDateTyping] = useState<string>(role === "SAF" ? DateTime.now().toFormat("yyyy-MM-dd") : DateTime.fromJSDate(request.createdAt!).startOf('day').toFormat("yyyy-MM-dd"));
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
			if (role !== "SAF") {
				setObservationsError(true);
			} else {
				setObservations("GESTION TUTELAS");
			}
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
		if (role !== "SAF") {
			window.history.back();
		}
	};

	const handleChangeDate = (e: string) => {
		const newDate = DateTime.fromISO(e).startOf('day');

		if (newDate < (DateTime.fromJSDate(request.createdAt!).startOf('day'))) {
			Swal.fire({
				title: "Error",
				icon: "warning",
				text: "La Fecha de Digitación no puede ser menor a la Fecha de Radicación"
			})

			setDateTyping(new Date().toISOString().split('T')[0]);
			return;
		}

		setDateTyping(newDate.toFormat("yyyy-MM-dd"));
	}

	return (
		<form>
			<Modal show={show} onClose={myClose}>
				<ModalHeader onClose={myClose}>
					<ModalTitle>Confirmar digitación</ModalTitle>
					{role !== "SAF" && DateTime.now() <= DateTime.fromISO(request.programed_date as string) && (
						<Badge>Inoportuno</Badge>
					)}
				</ModalHeader>
				<ModalBody>
					<div>
						<label>Fecha de digitación</label>
						<input type="date" value={date_typing} min={role === 'SAF' ? DateTime.now().toFormat("yyyy-MM-dd") : DateTime.fromJSDate(request.createdAt!).startOf('day').toFormat("yyyy-MM-dd")} onChange={(e) => handleChangeDate(e.target.value)} disabled={role === 'SAF'} />
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
					<div>
						{chance ? (
							<>
								<label className="mt-3">Observaciones</label>
								<textarea
									value={observations ? observations : ""}
									onChange={(e) => setObservations(e.target.value)}
								/>
							</>
						) : (<>
							{role !== "SAF" && (
								<InopportuneInput
									value={observations ? observations : ""}
									setValue={setObservations}
								/>
							)}
						</>
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
						<Button className="w-100" onClick={setClose ? setClose : myClose}>
							Cancelar
						</Button>
					</Col>
				</ModalFooter>
			</Modal>
		</form>
	);
};
