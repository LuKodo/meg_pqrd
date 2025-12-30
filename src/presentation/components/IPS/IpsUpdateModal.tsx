import { FC, useEffect, useState } from "react";
import { iIPS } from "@/entities/Ips";
import { instance } from "@/utils/axios.ts";
import { Toast } from "@/presentation/components/Common/ToastComponent.tsx";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface modalProps {
	show: boolean;
	handleClose: () => void;
	selected: iIPS | undefined;
}

export const ModalUpdateIPS: FC<modalProps> = ({
	show,
	handleClose,
	selected,
}) => {
	const [IPSSelected, setIPSSelected] = useState<iIPS | undefined>();

	useEffect(() => {
		selected && setIPSSelected(selected);
	}, [selected]);

	const onSubmit = async () => {
		await instance
			.put("ips", { json: IPSSelected })
			.then(() => {
				handleClose();
				Toast.fire({
					title: "Guardado exitoso",
					icon: "success",
				});
			})
			.catch(function (error) {
				Toast.fire({
					title: "Código " + error.response.data.statusCode,
					text: error.response.data.message,
					icon: "error",
				});
			});
	};

	return (
		<Modal show={show} onClose={handleClose}>
			<ModalBody>
				<div className="section">
					{IPSSelected && (
						<>
							<Row>
								<Col>
									<label>NIT</label>
									<input
										value={IPSSelected?.nit}
										type="text"
										onChange={(e) => {
											const t = e.target as HTMLInputElement;
											setIPSSelected({
												...IPSSelected,
												nit: t.value,
											});
										}}
									/>
								</Col>
								<Col>
									<label>Nombre</label>
									<input
										type="text"
										value={IPSSelected?.name}
										onChange={(e) => {
											const t = e.target as HTMLInputElement;
											setIPSSelected({ ...IPSSelected, name: t.value });
										}}
									/>
								</Col>
							</Row>
							<Row className="mt-3">
								<Col>
									<Row className="mt-3">
										<Col>
											<Button
												className="w-100"
												type="button"
												variant="info"
												onClick={() => onSubmit()}
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
						</>
					)
					}
				</div >
			</ModalBody >
		</Modal >
	);
};
