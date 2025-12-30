import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { iRole } from "@/entities/Role";
import { role_module_role } from "@/entities/RoleModule";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";
import { api } from "@/http";

interface modalProps {
	show: boolean;
	handleClose: () => void;
	selected: iRole;
	setSelected: Dispatch<SetStateAction<iRole | undefined>>;
}

export const ModalRole: FC<modalProps> = ({
	show,
	handleClose,
	selected,
	setSelected,
}) => {
	const [modules, setModules] = useState<role_module_role[]>([]);

	const modifyPermissions = (moduleId: number, status: boolean) => {
		const newModules = modules;
		setModules([]);
		const moduleIndex = newModules.findIndex((obj) => obj.id === moduleId);

		if (moduleIndex !== -1) {
			newModules[moduleIndex].active = status;
		}

		setModules(newModules);
	};

	const saveToDB = () => {
		Swal.fire({
			title: "Estás seguro?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí",
			cancelButtonText: "No",
		}).then((result) => {
			if (result.isConfirmed) {
				if (modules) {
					modules.forEach(async (obj) => {
						await api.put("roles_module", {
							json: {
								role: { id: selected?.id, name: selected.name },
								module: { id: obj.module.id },
								active: obj.active,
								id: obj.id,
							}
						});
					});
				}
				handleClose();
			}
		});
	};

	useEffect(() => {
		selected &&
			api.get(`roles_module/byRole?roleId=${selected.id}`).then((response: any) => {
				setModules(response.data);
			});
	}, [selected]);

	return (
		<Modal show={show} onClose={handleClose}>
			<ModalBody>
				<form className="section">
					{selected && (
						<>
							<Row className="p-2">
								<Col md={12}>
									<label>Nombre</label>
									<input
										value={selected.name}
										onChange={(e) =>
											setSelected({ ...selected, name: e.target.value })
										}
										type="text"
									/>
								</Col>
							</Row>
							<Row className="p-2">
								<label>Permisos</label>
								{modules &&
									modules
										.filter((obj) => obj.module.parent === 0)
										.map((module, index) => {
											return (
												<Row key={index}>
													<Col md={12} className="mt-2 mb-1" key={module.id}>
														<span className="fw-bold">
															{module.module.name}
														</span>
													</Col>
													{
														modules
															.filter((obj) => obj.module.parent !== 0)
															.map((child) => {
																if (module.module.id === child.module.parent) {
																	return (
																		<Col
																			md={6}
																			className="mt-1"
																			key={child.id + 1}
																		>
																			<div className="form-check form-switch py-1">
																				<input
																					className="form-check-input"
																					type="checkbox"
																					defaultChecked={
																						child.active ? true : false
																					}
																					id={String(child.id)}
																					onChange={() =>
																						modifyPermissions(
																							child.id,
																							!child.active,
																						)
																					}
																				/>
																				<label
																					className="form-check-label"
																					htmlFor={String(child.id)}
																				>
																					{child.module.name}
																				</label>
																			</div>
																		</Col>
																	);
																}
															})
													}
												</Row>
											);
										})}
							</Row>
							<Row className="mt-3">
								<Col>
									<Row className="mt-3">
										<Col md={6}>
											<Button
												className="w-100"
												type="button"
												onClick={() => {
													saveToDB();
												}}
												variant="info"
											>
												Guardar
											</Button>
										</Col>
										<Col md={6}>
											<Button
												className="w-100"
												onClick={handleClose}
											>
												Cancelar
											</Button>
										</Col>
									</Row>
								</Col>
							</Row>
						</>
					)}
				</form>
			</ModalBody>
		</Modal>
	);
};
