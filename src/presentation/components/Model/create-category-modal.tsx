import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Toast } from "@/presentation/components/Common/ToastComponent.tsx";
import type { iCategoryModel } from "@/entities/CategoryModel";
import { instance } from "@/utils/axios.ts";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface modalProps {
	show: boolean;
	handleClose: () => void;
}

export const ModalCreateCategory: FC<modalProps> = ({ show, handleClose }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<iCategoryModel>();

	const onSubmit: SubmitHandler<iCategoryModel> = (data) => {
		instance
			.post("category_model", { json: data })
			.then(() => {
				reset();
				handleClose();
				Toast.fire({
					title: "Guardado exitoso",
					icon: "success",
				});
			})
			.catch((error) => {
				Toast.fire({
					title: `Código ${error.response.data.statusCode}`,
					text: error.response.data.message,
					icon: "error",
				});
			});
	};

	return (
		<Modal show={show} onClose={handleClose}>
			<ModalBody>
				<form className="section" onSubmit={handleSubmit(onSubmit)}>
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
					</Row>
					<Row className="mt-3">
						<Col>
							<Row className="mt-3">
								<Col md={6}>
									<Button variant="info" className="w-100" type={"submit"}>
										Guardar
									</Button>
								</Col>
								<Col md={6}>
									<Button variant="danger" className="w-100" onClick={() => handleClose()}>
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
