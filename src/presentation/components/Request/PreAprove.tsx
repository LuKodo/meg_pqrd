import { type FC, useEffect, useState } from "react";
import { InopportuneInput } from "./InopportuneInput.tsx";
import type { iRequestView } from "@/entities";
import type { iModel } from "@/entities";
import { httpClient } from "@/http";
import { ModelRepository } from "@/features/shared/repositories";
import { Alert } from "@/features/shared/components/Alert.tsx";
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

interface Error {
	field: string;
	message: string;
	visible: boolean;
}

export const ErrorInput = (message: string) => {
	return (
		<Alert
			title="Error"
			description={message}
			variant="danger"
		/>
	);
};

export const PreApprove: FC<ConfirmTypingProps> = ({
	show,
	handleClose,
	request,
}) => {
	const chance = DateTime.now() <= DateTime.fromJSDate(request.programed_date);
	const [observations, setObservations] = useState<string>();
	const [errores, setErrores] = useState<Error[]>([]);
	const [auth_number, setAuthNumber] = useState<string>("");
	const [model, setModel] = useState<number>(0);
	const [models, setModels] = useState<iModel[]>();
	const modelRepository = new ModelRepository(httpClient);

	useEffect(() => {
		modelRepository.getAll().then((res) => {
			setModels(res);
		});

		setObservations("");
		setAuthNumber("");
		setErrores([]);
		setModel(0);
	}, []);

	const close = () => {
		setObservations("");
		setAuthNumber("");
		setErrores([]);
		setModel(0);
		handleClose();
	};

	const handleErrors = () => {
		const errores = [];

		if (!model) {
			errores.push({
				field: "model",
				message: "Debes seleccionar un modelo",
				visible: true,
			});
		}

		if (!auth_number) {
			errores.push({
				field: "auth_number",
				message: "Escribe un numero de autorización",
				visible: true,
			});
		}

		if (errores.length > 0) {
			setErrores(errores);
		}
	};

	const onSubmit = async () => {
		handleErrors();

		if (request && model && auth_number) {

		}
	};

	return (
		<form>
			<Modal>
				<ModalHeader>
					<ModalTitle>Pre Aprobar</ModalTitle>
					{!chance && (
						<Badge>Inoportuno</Badge>
					)}
				</ModalHeader>
				<ModalBody>
					<div>
						<label>Fecha</label>
						<input disabled value={DateTime.now().toFormat("yyyy-MM-dd")} />
					</div>
					<div className="mt-3">
						<label>Autorización</label>
						<input
							value={auth_number}
							onChange={(e) => setAuthNumber(e.target.value)}
						/>
						{
							errores.find((error) => error.field === "auth_number")?.visible && ErrorInput(errores.find((error) => error.field === "auth_number")?.message ?? "")
						}
					</div>

					<div className="mt-3">
						<label>Modelo</label>
						<select
							onChange={(e) => setModel(Number(e.target.value))}
							value={model}
						>
							<option value="0" />
							{models?.map((DT: iModel) => {
								return (
									<option key={DT.id} value={DT.id}>
										{DT.name}
									</option>
								);
							})}
						</select>
						{
							errores.find((error) => error.field === "model")?.visible && ErrorInput(errores.find((error) => error.field === "model")?.message ?? "")
						}
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

						{
							errores.find((error) => error.field === "observations")?.visible && ErrorInput(errores.find((error) => error.field === "observations")?.message ?? "")
						}
					</div>
				</ModalBody>
				<ModalFooter>
					<Col>
						<Button variant="info" onClick={() => onSubmit()} className="w-100">
							Confirmar
						</Button>
					</Col>
					<Col>
						<Button variant="info" onClick={close} className="w-100">
							Cancelar
						</Button>
					</Col>
				</ModalFooter>
			</Modal>
		</form>
	);
};
