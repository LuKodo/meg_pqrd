import { FC, useEffect, useState } from "react";
import { instance } from "@/utils/axios.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toast } from "@/presentation/components/Common/ToastComponent.tsx";
import { PaginatedData } from "@/entities/PaginateData";
import { iCity, iDepartment } from "@/entities/Location";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface modalProps {
	show: boolean;
	handleClose: () => void;
}

export const ModalCreateSAF: FC<modalProps> = ({ show, handleClose }) => {
	const [cities, setCities] = useState<PaginatedData<iCity>>();
	const [departments, setDepartments] = useState<PaginatedData<iDepartment>>();
	const {
		register,
		reset,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<{
		id: number;
		cityId: number;
		departmentId: number;
		name: string;
		zip: number;
	}>();
	const department = watch("departmentId");

	useEffect(() => {
		department &&
			instance.get(`city/department?id=${department}`).then((response: any) => {
				setCities(response.data);
			});

		instance
			.get(`departaments?page=${1}&pageSize=${100000}`)
			.then((response: any) => {
				setDepartments(response.data);
			});
	}, [department]);

	const onSubmit: SubmitHandler<{
		id: number;
		cityId: number;
		departmentId: number;
		name: string;
		zip: number;
	}> = (data) => {
		const nueva_sede = {
			zip: data.zip,
			city: {
				id: data.cityId,
			},
			name: data.name,
		};

		instance
			.post("headquarter", { json: nueva_sede })
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
					<Row>
						<Col>
							<label>Nombre</label>
							<input
								type="text"
								{...register("name", { required: true })}
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
							<label>ZIP</label>
							<input
								{...register("zip", { required: true })}
								type="text"
							/>
							{errors.zip && (
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
							<label>Departamento</label>
							<select
								className="form-select"
								{...register("departmentId", { required: true })}
							>
								<option value="">Seleccionar</option>
								{departments &&
									departments.data.map((department) => {
										return (
											<option key={department.id} value={department.id}>{department.name}</option>
										);
									})}
							</select>
							{errors.departmentId && (
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
							<label>Municipio</label>
							<select {...register("cityId", { required: true })}>
								<option value="">Seleccionar</option>
								{cities &&
									cities.data.map((city) => {
										return <option key={city.id} value={city.id}>{city.name}</option>;
									})}
							</select>
							{errors.cityId && (
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
			</ModalBody>
		</Modal>
	);
};
