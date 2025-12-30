import type { iCategoryModel } from "@/entities/CategoryModel";
import type { iModel } from "@/entities/Model";
import type { PaginatedData } from "@/entities/PaginateData";
import { Toast } from "@/presentation/components/Common/ToastComponent.tsx";
import { instance } from "@/utils/axios.ts";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface modalProps {
	show: boolean;
	handleClose: () => void;
}

export const ModalCreateModel: FC<modalProps> = ({ show, handleClose }) => {
	const [categoyModels, setCategoryModels] =
		useState<PaginatedData<iCategoryModel>>();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<iModel>();

	useEffect(() => {
		instance
			.get(`category_model?page=${1}&pageSize=${999999}`)
			.then(async (response) => {
				setCategoryModels(await response.json());
			});
	}, []);

	const onSubmit: SubmitHandler<iModel> = (data) => {
		instance
			.post("model", { json: data })
			.then(() => {
				reset();
				handleClose();
				Toast.fire({
					title: "Guardado exitoso",
					icon: "success",
				});
			})
			.catch(
				(error: {
					response: { data: { statusCode: string; message: string } };
				}) => {
					Toast.fire({
						title: `Código ${error.response.data.statusCode}`,
						text: error.response.data.message,
						icon: "error",
					});
				},
			);
	};

	return (
		<Modal show={show} onClose={handleClose}>
			<ModalBody>
				<form className="section" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<Row>
							<Col>
								<label>Nombre</label>
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
								<label>Promesa</label>
								<input
									{...register("promise_days", { required: true })}
									type="number"
									min={1}
								/>

								{errors.promise_days && (
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
									{...register("email", { required: true })}
									type="text"
								/>

								{errors.email && (
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
								<label>Categoria</label>
								<select {...register("categories.id", { required: true })}>
									<option value="">Selecciona una categoria</option>
									{categoyModels?.data.map((category) => {
										return (
											<option key={category.id} value={category.id}>
												{category.name}
											</option>
										);
									})}
								</select>

								{errors.categories && (
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

						{errors.categories && (
							<div className="d-flex justify-content-start">
								<small
									id="name1"
									className="badge badge-danger text-danger font-medium bg-danger-subtle form-text"
								>
									Campo requerido
								</small>
							</div>
						)}
					</div>
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
				</form>
			</ModalBody>
		</Modal>
	);
};
