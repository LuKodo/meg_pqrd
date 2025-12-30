import { FC, useEffect, useState } from "react";
import { instance } from "@/utils/axios.ts";
import { Toast } from "@/presentation/components/Common/ToastComponent.tsx";

import { iHeadquarter } from "@/entities/Headquarter";
import { PaginatedData } from "@/entities/PaginateData";
import { iCity, iDepartment } from "@/entities/Location";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface modalProps {
	show: boolean;
	handleClose: () => void;
	selected: iHeadquarter | undefined;
}

export const ModalUpdateSAF: FC<modalProps> = ({
	show,
	handleClose,
	selected,
}) => {
	const [sedeSelected, setSedeSelected] = useState<iHeadquarter | undefined>();
	const [cities, setCities] = useState<PaginatedData<iCity>>();
	const [departments, setDepartments] = useState<PaginatedData<iDepartment>>();

	useEffect(() => {
		selected && setSedeSelected(selected);
	}, [selected]);

	useEffect(() => {
		sedeSelected &&
			instance
				.get(`city/department?id=${sedeSelected.city?.department?.id}`)
				.then((response: any) => {
					setCities(response.data);
				});

		instance
			.get(`departaments?page=${1}&pageSize=${100000}`)
			.then((response: any) => {
				setDepartments(response.data);
			});
	}, [sedeSelected]);

	const onSubmit = async () => {
		await instance
			.put("headquarter", {json: sedeSelected})
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
					{selected && (
						<>
							<Row>
								<Col>
									<label>Nombre {selected.id}</label>
									<input
										type="text"
										value={sedeSelected?.name}
										onChange={(e) => {
											const t = e.target as HTMLInputElement;
											setSedeSelected({ ...sedeSelected, name: t.value });
										}}
									/>
								</Col>
								<Col>
									<label>ZIP</label>
									<input
										value={sedeSelected?.zip}
										type="text"
										onChange={(e) => {
											const t = e.target as HTMLInputElement;
											setSedeSelected({
												...sedeSelected,
												zip: Number(t.value),
											});
										}}
									/>
								</Col>
							</Row>
							<Row className="mt-3">
								<Col>
									<label>Departamento</label>
									<select
										className="form-select"
										value={sedeSelected?.city?.department?.id}
										onChange={(e) => {
											setSedeSelected({
												...sedeSelected,
												city: { department: { id: Number(e.target.value) } },
											});
										}}
									>
										<option value="">Seleccionar</option>
										{departments &&
											departments.data.map((department) => {
												return (
													<option key={department.id} value={department.id}>
														{department.name}
													</option>
												);
											})}
									</select>
								</Col>
								<Col>
									<label>Municipio</label>
									<select
										value={sedeSelected?.city?.id}
										onChange={(e) => {
											setSedeSelected({
												...sedeSelected,
												city: { id: Number(e.target.value) },
											});
										}}
									>
										<option value="">Seleccionar</option>
										{cities &&
											cities.data.map((city) => {
												return <option key={city.id} value={city.id}>{city.name}</option>;
											})}
									</select>
								</Col>
							</Row>
							<Row className="mt-3">
								<Col>
									<Row className="mt-3">
										<Col>
											<Button
												className="w-100"
												type="button"
												onClick={() => onSubmit()}
												variant="info"
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
				</div>
			</ModalBody>
		</Modal>
	);
};
