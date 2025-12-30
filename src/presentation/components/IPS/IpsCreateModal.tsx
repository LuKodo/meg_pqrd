import { FC } from "react";
import { iIPS } from "@/entities/Ips";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toast } from "@/presentation/components/Common/ToastComponent.tsx";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";
import { api } from "@/http";

interface modalProps {
	show: boolean;
	handleClose: () => void;
}

export const ModalCreateIPS: FC<modalProps> = ({ show, handleClose }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<{
		nit: string;
		name: string;
	}>();

	const onSubmit: SubmitHandler<iIPS> = (data) => {
		api
			.post("ips", { json: data })
			.then(() => {
				reset();
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
				<form className="section" onSubmit={handleSubmit(onSubmit)}>
					<Row className="row">
						<Col>
							<label>NIT</label>
							<input
								type="text"
								{...register("nit", { required: true })}
							/>
							{errors.nit && (
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
								<Col>
									<Button variant="info" className="w-100" type="submit">
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
			</ModalBody >
		</Modal >
	);
};
