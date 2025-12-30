import { FC, useEffect, useState } from "react";
import { instance } from "@/utils/axios.ts";
import { Toast } from "../Common/ToastComponent.tsx";
import { iUser } from "@/entities/User.ts";
import { PaginatedData } from "@/entities/PaginateData.ts";
import { iHeadquarter } from "@/entities/Headquarter.ts";
import { iRole } from "@/entities/Role.ts";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "@/features/shared/components/Modal.tsx";
import { Col, Row } from "@/features/shared/components/Grid.tsx";
import { Button } from "@/features/shared/components/Button.tsx";

interface modalProps {
	show: boolean;
	handleClose: () => void;
	selected: iUser | undefined;
}

export const ModalUserEdit: FC<modalProps> = ({
	show,
	handleClose,
	selected,
}) => {
	const [userSelected, setUserSelected] = useState<iUser>({
		id: 0,
		name: "",
		username: "",
		mail: "",
		password: "",
		status: "ACTIVE",
		headquarter: {
			id: 0,
			name: "",
		},
		role: {
			id: 0,
			name: "",
		},
	});
	const [headquarters, setHeadquarters] =
		useState<PaginatedData<iHeadquarter>>();
	const [roles, setRoles] = useState<PaginatedData<iRole>>();

	useEffect(() => {
		instance
			.get(`headquarter?page=${1}&pageSize=${999999}`)
			.then((response: any) => {
				setHeadquarters(response.data);
			});

		instance.get(`roles?page=${1}&pageSize=${999999}`).then((response: any) => {
			setRoles(response.data);
		});
	}, []);

	useEffect(() => {
		selected && setUserSelected(selected);
	}, [selected]);

	const saveToDB = async () => {
		await instance
			.put(`user/${userSelected?.id}`, { json: userSelected })
			.then((response: any) => {
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
				<ModalTitle>Editar Usuario</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<form className="section">
					{selected && (
						<>
							<Row>
								<Col>
									<label>Nombre Completo</label>
									<input
										value={userSelected?.name}
										type="text"
										onChange={(e) => {
											const t = e.target as HTMLInputElement;
											setUserSelected({ ...userSelected, name: t.value });
										}}
									/>
								</Col>
								<Col>
									<label>Usuario</label>
									<input
										value={userSelected?.username}
										disabled={userSelected?.id ? true : false}
										type="text"
									/>
								</Col>
							</Row>

							<Row className="mt-3">
								<Col>
									<label>Correo</label>
									<input
										value={userSelected?.mail}
										type="email"
										onChange={(e) => {
											const t = e.target as HTMLInputElement;
											setUserSelected({ ...userSelected, mail: t.value });
										}}
									/>
								</Col>
								<Col>
									<label>Sede</label>
									<select
										value={userSelected?.headquarter?.id}
										onChange={(e) => {
											setUserSelected({
												...userSelected,
												headquarter: { id: Number(e.target.value) },
											});
										}}
									>
										<option>Selecciona una sede</option>
										{headquarters &&
											headquarters.data.map((headquarter) => {
												return (
													<option
														key={headquarter.id}
														value={headquarter.id}
														selected={
															userSelected?.headquarter?.id === headquarter.id
														}
													>
														{headquarter.name}
													</option>
												);
											})}
									</select>
								</Col>
							</Row>

							<Row className="mt-3">
								<Col>
									<label>Rol</label>
									<select
										onChange={(e) => {
											setUserSelected({
												...userSelected,
												role: { id: Number(e.target.value) },
											});
										}}
									>
										{roles &&
											roles.data.map((role) => {
												return (
													<option
														key={role.id}
														value={role.id}
														selected={userSelected?.role?.id === role.id}
													>
														{role.name}
													</option>
												);
											})}
									</select>
								</Col>
								<Col>
									<label>Estado</label>
									<select
										value={userSelected?.status}
										onChange={(e) => {
											setUserSelected({
												...userSelected,
												status: e.target.value,
											});
										}}
									>
										<option
											value={"ACTIVE"}
											selected={userSelected?.status ? true : false}
										>
											Activo
										</option>
										<option
											value={"INACTIVE"}
											selected={userSelected?.status ? true : false}
										>
											Inactivo
										</option>
									</select>
								</Col>
							</Row>
						</>
					)
					}
				</form >
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
								<Button
									variant="info"
									className="w-100"
									onClick={() => handleClose()}
								>
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
