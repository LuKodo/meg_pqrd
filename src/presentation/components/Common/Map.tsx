import { Tooltip } from "./TooltipComponent.tsx";
import type { FC } from "react";
import {
	requestStatePQRSMachine,
	StatusMEG,
} from "@/utils";
import { iRequestView } from "@/entities";
import { Modal, ModalBody } from "@/features/shared/components/Modal.tsx";
import { DateTime } from "luxon";
import { Badge } from "@/features/shared/components/Badge.tsx";
import { Card, CardBody, CardTitle } from "@/features/shared/components/Card.tsx";
import { Col, Row } from "@/features/shared/components/Grid.tsx";
import { Button } from "@/features/shared/components/Button.tsx";

interface MapProps {
	show: boolean;
	handleClose: () => void;
	request: iRequestView;
}

export const TimeLine: FC<MapProps> = ({ show, handleClose, request }) => {
	return (
		<Modal>
			<ModalBody>
				<Row>
					<Col md={12} lg={12}>
						<Card>
							<CardBody>
								<div className="mb-4">
									<CardTitle>
										Solicitud # {request.id}
									</CardTitle>
								</div>
								<ul className="timeline-widget mb-0 position-relative mb-n5">
									{
										request.opened && (
											<li
												className="timeline-item d-flex position-relative overflow-hidden"
											>
												<div className="timeline-time text-dark flex-shrink-0 text-end">
													{DateTime.fromJSDate(request.createdAt).toFormat("YYYY-MM-DD")}
													<br />
													{DateTime.fromJSDate(request.createdAt).toFormat("hh:mm:ss A")}
												</div>
												<div className="timeline-badge-wrap d-flex flex-column align-items-center">
													<Tooltip
														title={'Cargue IPS'}
														id={String(request.id)}
													>
														<span
															className={`timeline-badge border-2 border border-${requestStatePQRSMachine.getStateColor(
																requestStatePQRSMachine.findStateByValue(StatusMEG.Cargue_IPS),
															)} flex-shrink-0 my-8`}
														/>
													</Tooltip>
													<span className="timeline-badge-border d-block flex-shrink-0" />
												</div>
												<div className="timeline-desc fs-3 text-dark mt-n1">
													{request.username}
													<br />
													Cambió la solicitud a{" "}
													<Badge
														pill
														bg={`${requestStatePQRSMachine.getStateColor(
															requestStatePQRSMachine.findStateByValue(StatusMEG.Cargue_IPS),
														)}`}
													>Cargue IPS
													</Badge>
												</div>
											</li>
										)
									}

									<li
										className="timeline-item d-flex position-relative overflow-hidden"
									>
										<div className="timeline-time text-dark flex-shrink-0 text-end">
											{DateTime.fromJSDate(request.opened || request.createdAt).toFormat("YYYY-MM-DD")}
											<br />
											{DateTime.fromJSDate(request.opened || request.createdAt).toFormat("hh:mm:ss A")}
										</div>
										<div className="timeline-badge-wrap d-flex flex-column align-items-center">
											<Tooltip
												title={'Creado'}
												id={String(request.id)}
											>
												<span
													className={`timeline-badge border-2 border border-${requestStatePQRSMachine.getStateColor(
														requestStatePQRSMachine.findStateByValue(StatusMEG.Abierto),
													)} flex-shrink-0 my-8`}
												/>
											</Tooltip>
											<span className="timeline-badge-border d-block flex-shrink-0" />
										</div>
										<div className="timeline-desc fs-3 text-dark mt-n1">
											{request.opened ? request.user_opened : request.username}
											<br />
											Cambió la solicitud a{" "}
											<Badge
												pill
												bg={`${requestStatePQRSMachine.getStateColor(
													requestStatePQRSMachine.findStateByValue(StatusMEG.Abierto),
												)}`}
											>Abierto
											</Badge>
										</div>
									</li>
									{request.scheduled && (
										<li
											className="timeline-item d-flex position-relative overflow-hidden"
										>
											<div className="timeline-time text-dark flex-shrink-0 text-end">
												{DateTime.fromJSDate(request.scheduled).toFormat("YYYY-MM-DD")}
												<br />
												{DateTime.fromJSDate(request.scheduled).toFormat("hh:mm:ss A")}
											</div>
											<div className="timeline-badge-wrap d-flex flex-column align-items-center">
												<Tooltip title={'Programado'}>
													<span
														className={`timeline-badge border-2 border border-${requestStatePQRSMachine.getStateColor(
															requestStatePQRSMachine.findStateByValue(StatusMEG.Programado),
														)} flex-shrink-0 my-8`}
													/>
												</Tooltip>
											</div>
											<div className="timeline-desc fs-3 text-dark mt-n1">
												{request.user_scheduled}
												<br />
												Cambió la solicitud a{" "}
												<Badge
													pill
													bg={`${requestStatePQRSMachine.getStateColor(
														requestStatePQRSMachine.findStateByValue(StatusMEG.Programado),
													)}`}
												>
													{StatusMEG.Programado}
												</Badge>
											</div>
										</li>
									)}

									{
										request.digited && (
											<li
												className="timeline-item d-flex position-relative overflow-hidden"
											>
												<div className="timeline-time text-dark flex-shrink-0 text-end">
													{DateTime.fromJSDate(request.digited).toFormat("YYYY-MM-DD")}
													<br />
													{DateTime.fromJSDate(request.digited).toFormat("hh:mm:ss A")}
												</div>
												<div className="timeline-badge-wrap d-flex flex-column align-items-center">
													<Tooltip title={'Digitado'}>
														<span
															className={`timeline-badge border-2 border border-${requestStatePQRSMachine.getStateColor(
																requestStatePQRSMachine.findStateByValue(StatusMEG.Digitado),
															)} flex-shrink-0 my-8`}
														/>
													</Tooltip>
												</div>
												<div className="timeline-desc fs-3 text-dark mt-n1">
													{request.user_digited}
													<br />
													Cambió la solicitud a{" "}
													<Badge
														pill
														bg={`${requestStatePQRSMachine.getStateColor(
															requestStatePQRSMachine.findStateByValue(StatusMEG.Digitado),
														)}`}
													>
														{StatusMEG.Digitado}
													</Badge>
												</div>
											</li>
										)
									}

									{
										request.sended && (
											<li
												className="timeline-item d-flex position-relative overflow-hidden"
											>
												<div className="timeline-time text-dark flex-shrink-0 text-end">
													{DateTime.fromJSDate(request.sended).toFormat("YYYY-MM-DD")}
													<br />
													{DateTime.fromJSDate(request.sended).toFormat("hh:mm:ss A")}
												</div>
												<div className="timeline-badge-wrap d-flex flex-column align-items-center">
													<Tooltip title={`Enviado`}>
														<span
															className={`timeline-badge border-2 border border-${requestStatePQRSMachine.getStateColor(
																requestStatePQRSMachine.findStateByValue(StatusMEG.Enviado),
															)} flex-shrink-0 my-8`}
														/>
													</Tooltip>
												</div>
												<div className="timeline-desc fs-3 text-dark mt-n1">
													{request.user_sended}
													<br />
													Cambió la solicitud a{" "}
													<Badge
														pill
														bg={`${requestStatePQRSMachine.getStateColor(
															requestStatePQRSMachine.findStateByValue(StatusMEG.Enviado),
														)}`}
													>
														{StatusMEG.Enviado}
													</Badge>
												</div>
											</li>
										)
									}

									{
										request.delivered && (
											<li
												className="timeline-item d-flex position-relative overflow-hidden"
											>
												<div className="timeline-time text-dark flex-shrink-0 text-end">
													{DateTime.fromJSDate(request.delivered).toFormat("YYYY-MM-DD")}
													<br />
													{DateTime.fromJSDate(request.delivered).toFormat("hh:mm:ss A")}
												</div>
												<div className="timeline-badge-wrap d-flex flex-column align-items-center">
													<Tooltip title={`${request.delivered}`}>
														<span
															className={`timeline-badge border-2 border border-${requestStatePQRSMachine.getStateColor(
																requestStatePQRSMachine.findStateByValue(StatusMEG.Entregado),
															)} flex-shrink-0 my-8`}
														/>
													</Tooltip>
												</div>
												<div className="timeline-desc fs-3 text-dark mt-n1">
													{request.user_delivered}
													<br />
													Cambió la solicitud a{" "}
													<Badge
														pill
														bg={`${requestStatePQRSMachine.getStateColor(
															requestStatePQRSMachine.findStateByValue(StatusMEG.Entregado),
														)}`}
													>
														{StatusMEG.Entregado}
													</Badge>
												</div>
											</li>
										)
									}

									{
										request.delivered_failed && (
											<li
												className="timeline-item d-flex position-relative overflow-hidden"
											>
												<div className="timeline-time text-dark flex-shrink-0 text-end">
													{DateTime.fromJSDate(request.delivered_failed).toFormat("YYYY-MM-DD")}
													<br />
													{DateTime.fromJSDate(request.delivered_failed).toFormat("hh:mm:ss A")}
												</div>
												<div className="timeline-badge-wrap d-flex flex-column align-items-center">
													<Tooltip title={`${request.delivered_failed}`}>
														<span
															className={`timeline-badge border-2 border border-${requestStatePQRSMachine.getStateColor(
																requestStatePQRSMachine.findStateByValue(StatusMEG.Devolucion),
															)} flex-shrink-0 my-8`}
														/>
													</Tooltip>
												</div>
												<div className="timeline-desc fs-3 text-dark mt-n1">
													{request.user_delivered_failed}
													<br />
													Cambió la solicitud a{" "}
													<Badge
														pill
														bg={`${requestStatePQRSMachine.getStateColor(
															requestStatePQRSMachine.findStateByValue(StatusMEG.Devolucion),
														)}`}
													>
														{StatusMEG.Devolucion}
													</Badge>
												</div>
											</li>
										)
									}

									{
										request.applied && (
											<li
												className="timeline-item d-flex position-relative overflow-hidden"
											>
												<div className="timeline-time text-dark flex-shrink-0 text-end">
													{DateTime.fromJSDate(request.applied).toFormat("YYYY-MM-DD")}
													<br />
													{DateTime.fromJSDate(request.applied).toFormat("hh:mm:ss A")}
												</div>
												<div className="timeline-badge-wrap d-flex flex-column align-items-center">
													<Tooltip title={`${request.applied}`}>
														<span
															className={`timeline-badge border-2 border border-${requestStatePQRSMachine.getStateColor(
																requestStatePQRSMachine.findStateByValue(StatusMEG.Aplicado),
															)} flex-shrink-0 my-8`}
														/>
													</Tooltip>
												</div>
												<div className="timeline-desc fs-3 text-dark mt-n1">
													{request.user_applied}
													<br />
													Cambió la solicitud a{" "}
													<Badge
														pill
														bg={`${requestStatePQRSMachine.getStateColor(
															requestStatePQRSMachine.findStateByValue(StatusMEG.Aplicado),
														)}`}
													>
														{StatusMEG.Aplicado}
													</Badge>
												</div>
											</li>
										)
									}

									{
										request.nulled && (
											<li
												className="timeline-item d-flex position-relative overflow-hidden"
											>
												<div className="timeline-time text-dark flex-shrink-0 text-end">
													{DateTime.fromJSDate(request.nulled).toFormat("YYYY-MM-DD")}
													<br />
													{DateTime.fromJSDate(request.nulled).toFormat("hh:mm:ss A")}
												</div>
												<div className="timeline-badge-wrap d-flex flex-column align-items-center">
													<Tooltip title={`${request.nulled}`}>
														<span
															className={`timeline-badge border-2 border border-${requestStatePQRSMachine.getStateColor(
																requestStatePQRSMachine.findStateByValue(StatusMEG.Anulado),
															)} flex-shrink-0 my-8`}
														/>
													</Tooltip>
												</div>
												<div className="timeline-desc fs-3 text-dark mt-n1">
													{request.user_nulled}
													<br />
													Cambió la solicitud a{" "}
													<Badge
														pill
														bg={`${requestStatePQRSMachine.getStateColor(
															requestStatePQRSMachine.findStateByValue(StatusMEG.Anulado),
														)}`}
													>
														{StatusMEG.Anulado}
													</Badge>
													{request.why_nulled && (
														<>
															<br />
															<span className="fs-3 text-dark mt-n1">
																Porque: {request.why_nulled}
															</span>
														</>
													)}
												</div>
											</li>
										)
									}
								</ul>
							</CardBody>
						</Card>
					</Col>
				</Row>

				<Row>
					<Col md={12} lg={12}>
						<Button variant="danger" onClick={handleClose}>Cancelar</Button>
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	);
};
