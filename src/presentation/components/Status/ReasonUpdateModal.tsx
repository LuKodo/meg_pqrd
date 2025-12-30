import { FC, useEffect, useState } from "react";

import { Toast } from "@/presentation/components/Common/ToastComponent.tsx";
import { iReason } from "@/entities/Reason";
import { PaginatedData } from "@/entities/PaginateData";
import { iStatus } from "@/entities/Status";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";
import { api } from "@/http";

interface modalProps {
	show: boolean;
	handleClose: () => void;
	selected: iReason | undefined;
}

export const ModalUpdateReason: FC<modalProps> = ({
	show,
	handleClose,
	selected,
}) => {
	const [statuses, setStatuses] = useState<PaginatedData<iStatus>>();
	const [itemSelected, setItemSelected] = useState<iReason | undefined>();

	useEffect(() => {
		api.get(`status?page=${1}&pageSize=${999999}`).then(async (response) => {
			setStatuses(await response.json());
		});
	}, []);

	useEffect(() => {
		selected && setItemSelected(selected);
	}, [selected]);

	const onSubmit = () => {
		api.put("ReasonsRequest", { json: itemSelected })
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
			<ModalBody>
				<div className="section">
					{itemSelected && (
						<>
							<Row>
								<Col>
									<label>Estado</label>
									<select
										value={itemSelected.status?.id}
										onChange={(e) => {
											setItemSelected({
												...itemSelected,
												status: { id: Number(e.target.value) },
											});
										}}
									>
										<option value=""></option>
										{statuses &&
											statuses.data.map((status) => {
												return (
													<option key={status.id} value={status.id}>
														{status.description}
													</option>
												);
											})}
									</select>
								</Col>
							</Row>
							<Row className="mt-3">
								<Col>
									<label>Nuevo Motivo</label>
									<input
										value={itemSelected.description}
										type="text"
										onChange={(e) => {
											const t = e.target as HTMLInputElement;
											setItemSelected({
												...itemSelected,
												description: t.value,
											});
										}}
									/>
								</Col>
							</Row>

							<Row className="mt-3">
								<Col>
									<Row className="mt-3">
										<Col md={6}>
											<Button
												className="w-100"
												type={"button"}
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
					)}
				</div >
			</ModalBody >
		</Modal >
	);
};
