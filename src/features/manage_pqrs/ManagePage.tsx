import { PaginatedData } from "@entities";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSessionManager } from "../shared/hooks";
import { Zone } from "@/entities/Zones";
import { Button } from "../shared/components/Button";
import { ObservationManage } from "@/entities/Observations";
import { useObservationsManage } from "./hooks/useObservations";
import { ObservationModel } from "./components/ObservationModal";
import { ConfirmTyping } from "./components/ConfirmTyping";
import { AffiliateModal } from "./components/AffiliateModal";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "../shared/components/Modal";
import { Badge } from "../shared/components/Badge";
import { requestStatePQRSMachine } from "@/utils";
import { CardFooter } from "../shared/components/Card";
import { ConfirmBuyModal } from "./components/ConfirmBuyModal";
import { ConfirmDelivery, PdfViewer, Tooltip } from "@/presentation/components";

const ButtonsByRole = ({ role, obs, status, functions, requestId }: { role: string; obs: string; status: string; functions: any; requestId: string }) => {
    if (role === "SAF") {
        if (obs === "ASIGNADA" || obs === "DOCUMENTACION COMPLETADA" || obs === "ENTREGA PREPARADA") {
            if (status === "Programado") {
                return (
                    <>
                        <Tooltip title="Confirmar Digitación" id="confirm-digitation">
                            <Button onClick={() => functions.confirmTyping(requestId)} variant="success" size="sm" className="ml-2">
                                <i className="ri ri-keyboard-box-line p-0" style={{ fontSize: "24px" }}></i>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Añadir Observación" id="add-observation">
                            <Button onClick={() => functions.addObservation(requestId)} variant="warning" size="sm" className="ml-2">
                                <i className="ri ri-chat-ai-line p-0" style={{ fontSize: "24px" }}></i>
                            </Button>
                        </Tooltip>
                    </>
                );
            }
            if (status === "Digitado") {
                return (
                    <>
                        <Tooltip title="Confirmar Entrega" id="confirm-delivery">
                            <Button onClick={() => functions.confirmDelivery(requestId)} variant="primary" size="sm" className="ml-2">
                                <i className="ri ri-checkbox-multiple-line p-0" style={{ fontSize: "24px" }}></i>
                            </Button>
                        </Tooltip>
                    </>
                );
            }
        }

        if (obs === "COMPRA EFECTIVA") {
            if (status === "Programado") {
                return (
                    <>
                        <Tooltip title="Ver Información de Compra" id="info-buy">
                            <Button onClick={() => functions.infoBuy(requestId)} variant="primary" size="sm" className="ml-2">
                                <i className="ri ri-file-list-3-line p-0" style={{ fontSize: "24px" }}></i>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Confirmar Digitación" id="confirm-digitation">
                            <Button onClick={() => functions.confirmTyping(requestId)} variant="success" size="sm" className="ml-2">
                                <i className="ri ri-keyboard-box-line p-0" style={{ fontSize: "24px" }}></i>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Añadir Observación" id="add-observation">
                            <Button onClick={() => functions.addObservation(requestId)} variant="warning" size="sm" className="ml-2">
                                <i className="ri ri-chat-ai-line p-0" style={{ fontSize: "24px" }}></i>
                            </Button>
                        </Tooltip>
                    </>
                );
            }
        }
    }
    else if (role === "COMPRAS") {
        if (obs === "SIN SALDO") {
            if (status === "Programado") {
                return (
                    <>
                        <Tooltip title="Confirmar Compra" id="confirm-buy">
                            <Button onClick={() => functions.confirmBuy(requestId)} variant="success" size="sm" className="ml-2">
                                <i className="ri ri-exchange-dollar-line p-0" style={{ fontSize: "24px" }}></i>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Añadir Observación" id="add-observation">
                            <Button onClick={() => functions.addObservation(requestId)} variant="warning" size="sm" className="ml-2">
                                <i className="ri ri-chat-ai-line p-0" style={{ fontSize: "24px" }}></i>
                            </Button>
                        </Tooltip>
                    </>
                );
            }
        }
    }
    else if (role === "ExpUsuario") {
        if (obs === "SIN FORMULA" || obs === "SIN AUTORIZACION") {
            if (status === "Programado") {
                return (
                    <>
                        <Tooltip title="Reasignar" id="reassign">
                            <Button onClick={() => functions.reassign(requestId)} variant="success" size="sm" className="ml-2">
                                <i className="ri ri-refresh-line p-0" style={{ fontSize: "24px" }}></i>
                            </Button>
                        </Tooltip>
                    </>
                );
            }
        } else if (obs === "ENTREGA PREPARADA") {
            if (status === "Digitado") {
                return (
                    <>
                        <Tooltip title="Ver Información de contacto" id="view-contact">
                            <Button onClick={() => functions.viewContact(requestId)} variant="success" size="sm" className="ml-2">
                                <i className="ri ri-info-card-line p-0" style={{ fontSize: "24px" }}></i>
                            </Button>
                        </Tooltip>
                    </>
                );
            }
        }
    }
}

const ColorsByStatus = (status: string) => {
    switch (status) {
        case "ASIGNADA":
            return "info";
        case "COMPRA EFECTIVA":
            return "success";
        case "DOCUMENTACION COMPLETADA":
            return "success";
        case "ENTREGA PREPARADA":
            return "success";
        case "SIN FORMULA":
            return "warning";
        case "SIN AUTORIZACION":
            return "warning";
        case "ENTREGA EXITOSA":
            return "success";
        default:
            return "secondary";
    }
}

const ManagePQRD = () => {
    const { getRole, getZones, getID } = useSessionManager();
    const role = getRole();
    const zones = getZones();
    const id = getID();

    const zonesClear = zones.map((zone: Zone) => zone.origin.id);

    const [paginate, setPaginate] = useState({ page: 1, limit: 8 });

    const { requestObservations, updateRequestObservations } = useObservationsManage(role, paginate.page, paginate.limit);

    const [items, setItems] = useState<PaginatedData<ObservationManage>>({
        data: [],
        totalPages: 0,
        currentPage: 1,
        pageSize: 10,
    });
    const [item, setItem] = useState<ObservationManage | null>(null);

    const [showObservationModal, setShowObservationModal] = useState(false);
    const [showConfirmTyping, setShowConfirmTyping] = useState(false);
    const [showConfirmBuy, setShowConfirmBuy] = useState(false);
    const [showAffiliateModal, setShowAffiliateModal] = useState(false);
    const [showDeliveryModal, setShowDeliveryModal] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [showInfoBuyModal, setShowInfoBuyModal] = useState(false);


    useEffect(() => {
        if (!requestObservations) return;
        const filteredItems = requestObservations.data.filter((obs) => zonesClear.includes(obs.request.cityId));
        setItems({
            ...requestObservations,
            data: filteredItems,
        });
    }, [requestObservations]);

    const functions = {
        "confirmTyping": (requestId: string) => {
            const request = items?.data.find(item => item.request.id === requestId) || null;
            setItem(request);
            setShowConfirmTyping(true);
        },
        "confirmDelivery": (requestId: string) => {
            const request = items?.data.find(item => item.request.id === requestId) || null;
            setItem(request);
            setShowDeliveryModal(true);
        },
        "addObservation": (requestId: string) => {
            const request = items?.data.find(item => item.request.id === requestId) || null;
            setItem(request);
            setShowObservationModal(true);
        },
        "confirmBuy": (requestId: string) => {
            const request = items?.data.find(item => item.request.id === requestId) || null;
            setItem(request);
            setShowConfirmBuy(true);
        },
        "viewContact": (requestId: string) => {
            const request = items?.data.find(item => item.request.id === requestId) || null;
            setItem(request);
            setShowAffiliateModal(true);
        },
        "reassign": (requestId: string) => {
            const request = items?.data.find(item => item.request.id === requestId) || null;
            setItem(request);

            if (!request) {
                return
            }

            Swal.fire({
                title: "Reasignar",
                icon: "warning",
                text: `Esta solicitud no se había podido gestionar porque estaba en estado: ${request.destination.observation}, deseas reasignarla?`,
                showCancelButton: true,
                confirmButtonText: "Sí, reasignar",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await updateRequestObservations(request.id, {
                        destination: {
                            id: 6 //Reasignada
                        }, managed: true
                    }).then(() => {
                        Swal.fire({
                            title: "Reasignada",
                            icon: "success",
                            text: "La solicitud ha sido reasignada",
                        }).finally(() => {
                            window.location.reload();
                        })
                    })
                }
            })
        },
        "pdf": (requestId: string) => {
            const request = items?.data.find(item => item.request.id === requestId) || null;
            setItem(request);
            setShowPdfModal(true);
        },
        "infoBuy": (requestId: string) => {
            const request = items?.data.find(item => item.request.id === requestId) || null;
            setItem(request);
            setShowInfoBuyModal(true);
        }
    }

    return (
        <>
            {item && item.request && (
                <>
                    <ObservationModel
                        show={showObservationModal}
                        handleClose={() => {
                            setShowObservationModal(false)
                            setItem(null)
                            window.location.reload();
                        }}
                        onClose={() => setShowObservationModal(false)}
                        requestId={item?.request?.id}
                    />

                    <ConfirmTyping
                        show={showConfirmTyping}
                        handleClose={async () => {
                            setShowConfirmTyping(false)
                            await updateRequestObservations(item.id, {
                                destination: {
                                    id: 8
                                },
                                saf_owner: {
                                    id
                                }
                            }).then(() => {
                                setItem(null)
                                window.location.reload();
                            })
                        }}
                        setClose={() => setShowConfirmTyping(false)}
                        request={item?.request}
                    />

                    <ConfirmBuyModal
                        show={showConfirmBuy}
                        handleClose={async () => {
                            setShowConfirmBuy(false)
                            setItem(null)
                            window.location.reload();
                        }}
                        observationId={item.id}
                        onClose={() => setShowConfirmBuy(false)}
                    />

                    <AffiliateModal
                        show={showAffiliateModal}
                        handleClose={async () => {
                            setShowAffiliateModal(false)
                            await updateRequestObservations(item.id, {
                                destination: {
                                    id: 6 //Asignada
                                },
                                managed: true
                            }).then(() => {
                                alert("Solicitud reasignada");
                                setItem(null)
                                window.location.reload();
                            });
                        }}
                        request={item?.request}
                        setClose={() => setShowAffiliateModal(false)}
                    />

                    <ConfirmDelivery
                        show={showDeliveryModal}
                        handleClose={async () => {
                            setShowDeliveryModal(false)
                            await updateRequestObservations(item.id, {
                                destination: {
                                    id: 10 //Entrega Exitosa
                                }
                            }).then(() => {
                                setItem(null)
                                window.location.reload();
                            })
                        }}
                        request={item?.request}
                        isPQRS
                        setClose={() => setShowDeliveryModal(false)}
                    />

                    <Modal
                        show={showInfoBuyModal}
                        onClose={() => setShowInfoBuyModal(false)}
                    >
                        <ModalHeader onClose={() => setShowInfoBuyModal(false)}>
                            <ModalTitle>Información de Compra</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            {item.observation && (
                                <h2>ODC: {item.observation}</h2>
                            )}
                        </ModalBody>
                    </Modal>

                    <PdfViewer
                        show={showPdfModal}
                        fileUrl={item?.request?.url_attachment}
                        onClose={() => setShowPdfModal(false)}
                        request={item?.request}
                    />
                </>
            )}

            <h1 className="mb-4 text-title-md font-bold text-gray-800 dark:text-white/90 xl:text-title-2xl d-flex align-items-center gap-2">Gestión Tutelas</h1>
            <div className="card">
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Solicitud</th>
                                <th>Documento</th>
                                <th>Nombre Completo</th>
                                <th>Medicamento</th>
                                <th>Estado</th>
                                {role === "COMPRAS" && (
                                    <th>SAF Responsable</th>
                                )}
                                <th>Observación</th>
                                <th className="w-25"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items?.data.map((obs) => (
                                <tr key={obs.id}>
                                    <td>{obs.request.id}</td>
                                    <td>{obs.request.document_type} {obs.request.document_number}</td>
                                    <td>{obs.request.firstname} {obs.request.surname} {obs.request.lastname_1} {obs.request.lastname_2}</td>
                                    <td>{obs.request.medicamento}</td>
                                    <td>
                                        <Badge bg={requestStatePQRSMachine.getStateColor(requestStatePQRSMachine.findStateByValue(obs.request.estado ?? ''))}>{obs.request.estado}</Badge>
                                    </td>
                                    {role === "COMPRAS" && (
                                        <td>
                                            {obs.saf_owner?.name || "NO ASIGNADO"}
                                        </td>
                                    )}
                                    <td>
                                        <Badge bg={ColorsByStatus(obs.destination.observation ?? '')}>{obs.destination.observation}</Badge>
                                    </td>
                                    <td>
                                        <ButtonsByRole
                                            role={role}
                                            obs={obs.destination.observation}
                                            status={obs.request.estado || ""}
                                            functions={functions}
                                            requestId={obs.request.id}
                                        />
                                        {
                                            obs?.request.url_attachment && (
                                                <Tooltip title="Ver formula" id="add-observation">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => functions.pdf(obs.request.id)}
                                                        className="ml-2"
                                                    >
                                                        <i className="ri ri-file-pdf-2-line p-0" style={{ fontSize: "24px" }}></i>
                                                    </Button>
                                                </Tooltip>
                                            )
                                        }

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <CardFooter>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex gap-2 justify-content-between">
                            <Button
                                onClick={() => setPaginate({ ...paginate, page: 1 })}
                                disabled={paginate.page === 1}
                                size="sm"
                            >
                                <i className="bi bi-chevron-left" />
                            </Button>
                            {paginate.page > 1 && (
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        setPaginate({ ...paginate, page: paginate.page - 1 })
                                    }
                                >
                                    {paginate.page - 1}
                                </Button>
                            )}

                            <Button size="sm">
                                {paginate.page}
                            </Button>
                            {paginate.page < items.totalPages && (
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        setPaginate({ ...paginate, page: paginate.page + 1 })
                                    }
                                >
                                    {paginate.page + 1}
                                </Button>
                            )}
                            <Button
                                onClick={() =>
                                    setPaginate({ ...paginate, page: items.totalPages })
                                }
                                disabled={paginate.page === items.totalPages}
                                size="sm"
                            >
                                <i className="bi bi-chevron-right" />
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </div>
        </>
    );
};

export default ManagePQRD;