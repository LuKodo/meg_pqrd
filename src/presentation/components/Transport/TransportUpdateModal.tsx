import { FC, useEffect, useState } from "react";
import { iTransport } from "@/entities/Transport";

import { Toast } from "@/presentation/components/Common/ToastComponent.tsx";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface modalProps {
	show: boolean;
	handleClose: () => void;
	selected: iTransport | undefined;
}

export const ModalTransportEdit: FC<modalProps> = ({
	show,
	handleClose,
	selected,
}) => {
	const [userSelected, setTransportSelected] = useState<
		iTransport | undefined
	>();

	useEffect(() => {
		selected && setTransportSelected(selected);
	}, [selected]);

	const saveToDB = async () => {
		await instance
			.put("transport", { json: userSelected })
			.then(() => {
				handleClose();
				Toast.fire({
					title: "Guardado exitoso",
					icon: "success",
				});
			})
			.catch(function (error: any) {
				Toast.fire({
					title: "Código " + error.response.data.statusCode,
					text: error.response.data.message,
					icon: "error",
				});
			});
	};

	return (
		<Modal show={show} onClose={handleClose}>
			<ModalHeader onClose={handleClose}>
				<ModalTitle>Editar Transportadora</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<form className="section">
					{selected && (
						<>
							<Row>
								<Col>
									<label>Nombre</label>
									<input
										value={userSelected?.name}
										type="text"
										onChange={(e) => {
											const t = e.target as HTMLInputElement;
											setTransportSelected({ ...userSelected, name: t.value });
										}}
									/>
								</Col>
								<Col>
									<label>Promesa (días)</label>
									<input
										value={userSelected?.promise_days}
										onChange={(e) => {
											const t = e.target as HTMLInputElement;
											setTransportSelected({
												...userSelected,
												promise_days: Number(t.value),
											});
										}}
										type="text"
									/>
								</Col>
							</Row>
						</>
					)}
				</form>
				<Row className="mt-3">
					<Col>
						<Row className="mt-3">
							<Col md={6}>
								<Button
									variant="info"
									className="w-100"
									onClick={() => saveToDB()}
								>
									Guardar
								</Button>
							</Col>
							<Col md={6}>
								<Button className="w-100" onClick={() => handleClose()}>
									Cancelar
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</ModalBody >
		</Modal >
	);
};
