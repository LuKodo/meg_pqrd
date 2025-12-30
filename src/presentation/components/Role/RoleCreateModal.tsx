import { FC, useState } from "react";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";

import Swal from "sweetalert2";
import { Button } from "@/features/shared/components/Button";
import { api } from "@/http";

interface modalProps {
	show: boolean;
	handleClose: () => void;
}

export const ModalCreateRole: FC<modalProps> = ({ show, handleClose }) => {
	const [name, setName] = useState<string>("");
	const saveToDB = () => {
		Swal.fire({
			title: "Estás seguro?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí",
			cancelButtonText: "No",
		}).then((result) => {
			if (result.isConfirmed) {
				api.post("roles", { json: { name: name } });
			}
			handleClose();
		});
	};

	return (
		<Modal show={show} onClose={handleClose}>
			<ModalBody>
				<form className="section">
					<Row>
						<Col>
							<label>Nombre</label>
							<input
								value={name}
								onChange={(e) => {
									const t = e.target as HTMLInputElement;
									setName(t.value);
								}}
								type="text"
							/>
						</Col>
					</Row>
					<Row className="mt-3">
						<Col>
							<Row className="mt-3">
								<Col md={6}>
									<Button
										className="w-100"
										type="button"
										onClick={() => {
											saveToDB();
										}}
										variant="info"
									>
										Guardar
									</Button>
								</Col>
								<Col md={6}>
									<Button
										className="w-100"
										onClick={() => handleClose()}
									>
										Cancelar
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
				</form >
			</ModalBody >
		</Modal >
	);
};
