import { useParams } from "wouter";
import { Header } from "../shared/components/Header";
import { useEffect, useState, useCallback } from "react";
import { formatDocument, jwtSign } from "@/utils";
import { Show } from "../shared/components/Show";
import { httpPQRD } from "@/http/PQRD";
import { iPQRD, iRecord } from "./pqrd.model";
import { IconBarcode, IconMail, IconPhone, IconUser } from "@/svg";
import { formatPQRDDate, formatPQRDTime, listActivitiesByPQRD } from "./pqrd.presenter";
import { Card, CardBody } from "../shared/components/Card";
import { Button } from "../shared/components/Button";
import { CreateActivityModal } from "./components/create-activity";
import { For } from "../shared/components/For";

export default function Details() {
    const { pqrd_id } = useParams();
    const [loading, setLoading] = useState(false);

    const [pqr, setPQrd] = useState<iPQRD | null>(null);
    const [activities, setActivities] = useState<iRecord[]>([]);

    const fetchData = useCallback(async () => {
        if (!pqrd_id) return;

        try {
            setLoading(true);
            const token = await jwtSign({ payload: { role: "web_user" } });
            const response = await httpPQRD.get<iPQRD[]>(`pqrs?id=eq.${pqrd_id}&select=*,pqrs_peticionario(*),assignment(users(username))`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }).json();

            setPQrd(response[0]);

            const activities = await listActivitiesByPQRD(pqrd_id!);
            if (activities) {
                setActivities(activities);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [pqrd_id]);

    const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onActivityCreated = () => {
        fetchData();
    };

    return (
        <div className="px-4 md:pt-6">
            <Header
                title="Visor de PQRS"
                subItem="Detalles"
            />

            <Show when={showCreateActivityModal} fallback={<></>}>
                <CreateActivityModal show={showCreateActivityModal} onClose={() => setShowCreateActivityModal(false)} pqrd_id={pqrd_id!} onActivityCreated={onActivityCreated} />
            </Show>

            <Show when={!loading} fallback={
                <div className="flex justify-center items-center h-full">
                    <div className="loading loading-spinner"></div>
                </div>
            }>
                {pqr && (

                    <div className="flex justify-center items-center h-full gap-4">
                        <Card className="w-1/2">
                            <CardBody>
                                <div className="overflow-x-auto min-h-[calc(100vh-20rem)] max-h-[calc(100vh-20rem)]">
                                    <h1 className="text-lg font-bold text-blue-700 mb-4">Detalle PQRD: # {pqr.num_rad}</h1>

                                    <div className="mt-2 p-2 card bg-blue-100 border border-blue-200 w-full">
                                        <div className="font-semibold text-blue-800 mb-1.5">
                                            Información del Afectado
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5">
                                                <IconUser className="size-3 text-gray-600" />
                                                <span className="truncate">{pqr.person_name} {pqr.person_last_name}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <IconBarcode className="size-3 text-gray-600" />
                                                <span>{formatDocument(pqr.person_document_type)} {pqr.person_document_number}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <IconPhone className="size-3 text-gray-600" />
                                                <span>{pqr.person_phone || 'N/A'}</span>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <IconMail className="size-3 text-gray-600" />
                                                <span>{pqr.person_email || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2 p-2 card bg-blue-100 border border-blue-200 w-full">
                                        <div className="font-semibold text-blue-800 mb-1.5">
                                            Información de la PQRD
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5">
                                                <span>{pqr.pqr_description}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="w-1/2">
                            <CardBody>
                                <h1 className="text-lg font-semibold text-blue-700 mb-4">Actividades</h1>

                                <div className="overflow-x-auto min-h-[calc(100vh-28rem)] max-h-[calc(100vh-28rem)]">
                                    <div className="bg-blue-100 border border-blue-200 shadow flex justify-between items-center p-4 rounded-lg w-full">
                                        <div className="flex flex-col items-start gap-1.5 w-full text-gray-600">
                                            <span className="text-sm font-semibold">{formatPQRDDate(pqr.created_at)} {formatPQRDTime(pqr.created_at)}</span>
                                        </div>
                                        <p className="w-full text-center font-semibold text-gray-600">Radicación de la PQRD</p>
                                    </div>

                                    <For each={activities}>
                                        {activity => (
                                            <div className="bg-blue-100 border border-blue-200 shadow flex justify-between items-center p-4 rounded-lg w-full mt-5">
                                                <div className="flex flex-col items-start gap-1.5 w-full text-gray-600">
                                                    <span className="text-sm font-semibold">{formatPQRDDate(activity.createdAt)} {formatPQRDTime(activity.createdAt)}</span>
                                                </div>
                                                <p className="w-full text-center font-semibold text-gray-600">{activity.activities?.description}</p>
                                            </div>
                                        )}
                                    </For>
                                </div>

                                <div className="flex mt-4 justify-center">
                                    <Button variant="primary" className="rounded-lg border border-blue-200" onClick={() => setShowCreateActivityModal(true)}>
                                        Agregar Actividad
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}
            </Show>


        </div>
    );
}
