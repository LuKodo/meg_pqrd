import { useParams } from "wouter";
import { Header } from "../shared/components/Header";
import { useEffect, useState, useCallback, Fragment } from "react";
import { formatDocument, jwtSign } from "@/utils";
import { Show } from "../shared/components/Show";
import { httpPQRD } from "@/http/PQRD";
import { iPQRD, iRecord } from "./pqrd.model";
import { formatPQRDDate, formatPQRDTime, listActivitiesByPQRD } from "./pqrd.presenter";
import { Button } from "../shared/components/Button";
import { CreateActivityModal } from "./components/create-activity";
import { For } from "../shared/components/For";
import { Card, CardContent, CardHeader, CardTitle, Spinner } from "@/components/ui";
import { Mail, Phone, QrCode, User } from "lucide-react";

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
        <Fragment>
            <Header
                title="Visor de PQRS"
                subItem="Detalles"
            />

            <Show when={showCreateActivityModal} fallback={<></>}>
                <CreateActivityModal show={showCreateActivityModal} onClose={() => setShowCreateActivityModal(false)} pqrd_id={pqrd_id!} onActivityCreated={onActivityCreated} />
            </Show>

            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-3">
                        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 mt-2">
                            <Show when={!loading} fallback={
                                <div className="flex justify-center items-center h-full">
                                    <Spinner />
                                </div>
                            }>
                                {pqr && (

                                    <div className="flex justify-center items-center min-h-[calc(100vh-20rem)] gap-4">
                                        <Card className="w-1/2 min-h-[calc(100vh-20rem)] max-h-[calc(100vh-20rem)]">
                                            <CardHeader>
                                                <CardTitle>
                                                    Detalle PQRD # {pqr.num_rad}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="overflow-x-auto">
                                                    <Card className="bg-blue-100 border border-blue-200 w-full">
                                                        <CardHeader>
                                                            <CardTitle>
                                                                Información del Afectado
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="flex flex-col gap-2">
                                                            <div className="flex items-center gap-1.5">
                                                                <User />
                                                                <span className="truncate">{pqr.person_name} {pqr.person_last_name}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <QrCode />
                                                                <span>{formatDocument(pqr.person_document_type)} {pqr.person_document_number}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <Phone />
                                                                <span>{pqr.person_phone || 'N/A'}</span>
                                                            </div>

                                                            <div className="flex items-center gap-1.5">
                                                                <Mail />
                                                                <span>{pqr.person_email || 'N/A'}</span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <Card className="mt-2 bg-blue-100 border border-blue-200 w-full">
                                                        <CardHeader>
                                                            <CardTitle>
                                                                Información de la PQRD
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <p>{pqr.pqr_description}</p>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="w-1/2 h-full min-h-full">
                                            <CardHeader>
                                                <CardTitle>
                                                    Actividades
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="overflow-x-auto">
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
                                                    <Button className="border border-blue-200 bg-blue-500 text-white hover:bg-blue-500/5 hover:text-blue-500 transition-colors duration-300 py-2 px-4 rounded-lg" onClick={() => setShowCreateActivityModal(true)}>
                                                        Agregar Actividad
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </Show>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
