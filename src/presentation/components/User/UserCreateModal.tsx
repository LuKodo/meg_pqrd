import { FC, Fragment, useEffect, useState } from "react";
import { Toast } from "../Common/ToastComponent.tsx";

import { SubmitHandler, useForm } from "react-hook-form";

import { iHeadquarter } from "@/entities/Headquarter.ts";
import { PaginatedData } from "@/entities/PaginateData.ts";
import { iRole } from "@/entities/Role.ts";
import { iUser } from "@/entities/User.ts";
import { Modal, ModalBody } from "@/features/shared/components/Modal.tsx";
import { Col, Row } from "@/features/shared/components/Grid.tsx";
import { Button } from "@/features/shared/components/Button.tsx";
import { api } from "@/http";

interface modalProps {
	show: boolean;
	handleClose: () => void;
}

export const ModalUserCreate: FC<modalProps> = ({ show, handleClose }) => {
	const [headquarters, setHeadquarters] =
		useState<PaginatedData<iHeadquarter>>();
	const [roles, setRoles] = useState<PaginatedData<iRole>>();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<iUser>();

	useEffect(() => {
		api
			.get(`headquarter?page=${1}&pageSize=${999999}`)
			.then((response: any) => {
				setHeadquarters(response.data);
			});

		api.get(`roles?page=${1}&pageSize=${999999}`).then((response: any) => {
			setRoles(response.data);
		});
	}, []);

	const onSubmit: SubmitHandler<iUser> = (data) => {
		api
			.post("user", { json: data })
			.then(() => {
				reset();
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
				<form className="section" onSubmit={handleSubmit(onSubmit)}>
					<Fragment>
						<Row>
							<Col>
								<label>Nombre Completo</label>
								<input
									{...register("name", { required: true })}
									type="text"
								/>

								{errors.name && (
									<div className="d-flex justify-content-start">
										<small
											id="name1"
											className="badge badge-danger text-danger font-medium bg-danger-subtle form-text"
										>
											Campo requerido
										</small>
									</div>
								)}
							</Col>
							<Col>
								<label>Usuario</label>
								<input
									{...register("username", { required: true })}
									type="text"
								/>

								{errors.username && (
									<div className="d-flex justify-content-start">
										<small
											id="name1"
											className="badge badge-danger text-danger font-medium bg-danger-subtle form-text"
										>
											Campo requerido
										</small>
									</div>
								)}
							</Col>
						</Row>

						<Row className="mt-3">
							<Col>
								<label>Contraseña</label>
								<input
									{...register("password", { required: true })}
									type="password"
								/>

								{errors.password && (
									<div className="d-flex justify-content-start">
										<small
											id="name1"
											className="badge badge-danger text-danger font-medium bg-danger-subtle form-text"
										>
											Campo requerido
										</small>
									</div>
								)}
							</Col>
							<Col>
								<label>Confirmar contraseña</label>
								<input
									type="password"
									{...register("confirm_password", { required: true })}
								/>

								{errors.confirm_password && (
									<div className="d-flex justify-content-start">
										<small
											id="name1"
											className="badge badge-danger text-danger font-medium bg-danger-subtle form-text"
										>
											Campo requerido
										</small>
									</div>
								)}
							</Col>
						</Row>

						<Row className="mt-3">
							<Col>
								<label>Correo</label>
								<input
									type="email"
									{...register("mail", { required: true })}
								/>

								{errors.mail && (
									<div className="d-flex justify-content-start">
										<small
											id="name1"
											className="badge badge-danger text-danger font-medium bg-danger-subtle form-text"
										>
											Campo requerido
										</small>
									</div>
								)}
							</Col>
							<Col>
								<label>Sede</label>
								<select {...register("headquarter.id", { required: true })}>
									<option>Selecciona una sede</option>
									{headquarters &&
										headquarters.data.map((headquarter) => {
											return (
												<option value={headquarter.id} key={headquarter.id}>
													{headquarter.name}
												</option>
											);
										})}
								</select>

								{errors.headquarter && (
									<div className="d-flex justify-content-start">
										<small
											id="name1"
											className="badge badge-danger text-danger font-medium bg-danger-subtle form-text"
										>
											Campo requerido
										</small>
									</div>
								)}
							</Col>
						</Row>

						<Row className="mt-3">
							<Col>
								<label>Rol</label>
								<select {...register("role.id", { required: true })}>
									{roles &&
										roles.data.map((role) => {
											return (
												<option value={role.id} key={role.id}>
													{role.name}
												</option>
											);
										})}
								</select>

								{errors.role && (
									<div className="d-flex justify-content-start">
										<small
											id="name1"
											className="badge badge-danger text-danger font-medium bg-danger-subtle form-text"
										>
											Campo requerido
										</small>
									</div>
								)}
							</Col>
							<Col>
								<label>Estado</label>
								<select {...register("status", { required: true })}>
									<option value={"ACTIVE"}>Activo</option>
									<option value={"INACTIVE"}>Inactivo</option>
								</select>

								{errors.status && (
									<div className="d-flex justify-content-start">
										<small
											id="name1"
											className="badge badge-danger text-danger font-medium bg-danger-subtle form-text"
										>
											Campo requerido
										</small>
									</div>
								)}
							</Col>
						</Row>
					</Fragment >
					<Row className="mt-3">
						<Col>
							<Row className="mt-3">
								<Col md={6}>
									<Button variant="info" className="w-100" type={"submit"}>
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
				</form >
			</ModalBody >
		</Modal >
	);
};
