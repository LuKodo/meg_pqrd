import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Toast } from "@/presentation/components/Common/ToastComponent.tsx";
import { iReason } from "@/entities/Reason";
import { iModel } from "@/entities/Model";
import { PaginatedData } from "@/entities/PaginateData";
import { iStatus } from "@/entities/Status";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";
import { api } from "@/http";

interface modalProps {
	show: boolean;
	handleClose: () => void;
}

export const ModalCreateReason: FC<modalProps> = ({ show, handleClose }) => {
	const [statuses, setStatuses] = useState<PaginatedData<iStatus>>();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<iReason>();

	useEffect(() => {
		api.get(`status?page=${1}&pageSize=${999999}`).then((response: any) => {
			setStatuses(response.data);
		});
	}, []);

	const onSubmit: SubmitHandler<iModel> = (data) => {
		api
			.post("ReasonsRequest", { json: data })
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
					<>
						<Row>
							<Col>
								<label>Estado</label>
								<select {...register("status.id", { required: true })}>
									<option value=""></option>
									{statuses &&
										statuses.data.map((status) => {
											return (
												<option value={status.id} key={status.id}>
													{status.description}
												</option>
											);
										})}
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
						<Row className="mt-3">
							<Col>
								<label>Nuevo Motivo</label>
								<input
									{...register("description", { required: true })}
									type="text"
								/>

								{errors.description && (
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
					</>
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
		</Modal >
	);
};
