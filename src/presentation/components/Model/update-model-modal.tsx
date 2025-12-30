import { FC, useEffect, useState } from "react";
import { PaginatedData } from "@/entities/PaginateData";
import { instance } from "@/utils/axios.ts";
import { Toast } from "@/presentation/components/Common/ToastComponent.tsx";

import { iModel } from "@/entities/Model";
import { iCategoryModel } from "@/entities/CategoryModel";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface modalProps {
	show: boolean;
	handleClose: () => void;
	selected: iModel | undefined;
}

export const ModalUpdateModel: FC<modalProps> = ({
	show,
	handleClose,
	selected,
}) => {
	const [categoryModels, setCategoryModels] =
		useState<PaginatedData<iCategoryModel>>();
	const [sedeSelected, setSedeSelected] = useState<iModel | undefined>();

	useEffect(() => {
		instance.get(`category_model?page=${1}&pageSize=${999999}`)
			.then(async (response) => {
				setCategoryModels(await response.json());
			});
	}, []);

	useEffect(() => {
		selected && setSedeSelected(selected);
	}, [selected]);

	const onSubmit = async () => {
		await instance
			.put("model", { json: sedeSelected })
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
					{selected && (
						<>
							<Row>
								<Col>
									<label>Nombre</label>
									<input
										value={sedeSelected?.name}
										onChange={(e) => {
											const t = e.target as HTMLInputElement;
											setSedeSelected({ ...sedeSelected, name: t.value });
										}}
										type="text"
									/>
								</Col>
								<Col>
									<label>Promesa</label>
									<input
										value={sedeSelected?.promise_days}
										onChange={(e) => {
											const t = e.target as HTMLInputElement;
											setSedeSelected({
												...sedeSelected,
												promise_days: Number(t.value),
											});
										}}
										type="number"
										min={1}
									/>
								</Col>
							</Row>
							<Row className="mt-3">
								<Col>
									<label>Correo</label>
									<input
										value={sedeSelected?.email}
										onChange={(e) => {
											const t = e.target as HTMLInputElement;
											setSedeSelected({ ...sedeSelected, email: t.value });
										}}
										type="text"
									/>
								</Col>
								<Col>
									<label>Categoria</label>
									<select
										value={sedeSelected?.categories?.id}
										onChange={(e) => {
											setSedeSelected({
												...sedeSelected,
												categories: { id: Number(e.target.value) },
											});
										}}
									>
										<option value="">Selecciona una categoria</option>
										{categoryModels?.data.map((category) => {
											return (
												<option key={category.id} value={category.id}>{category.name}</option>
											);
										})}
									</select>
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
							</Row >
						</>
					)}
				</div >
			</ModalBody >
		</Modal >
	);
};
