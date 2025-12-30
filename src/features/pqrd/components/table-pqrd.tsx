import { For } from "@/features/shared/components/For";
import { Show } from "@/features/shared/components/Show";
import { channelToIcon, formatDocument, formatPQRDDate, formatPQRDTime, semaforoToColor } from "../pqrd.presenter";
import { IconBarcode, IconMail, IconPhone, IconTrafficLights, IconUser } from "@/svg";
import { Button } from "@/features/shared/components/Button";
import { IconEye } from "@/svg/eye";
import { useLocation } from "wouter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { Siren } from "lucide-react";

interface TablePQRDProps {
    pqrds: any[];
}

export const TablePQRD = ({ pqrds }: TablePQRDProps) => {
    const [_location, navigate] = useLocation();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="min-w-32">Radicado</TableHead>
                    <TableHead className="min-w-32">Mutual</TableHead>
                    <TableHead className="min-w-32">Fecha</TableHead>
                    <TableHead className="min-w-80">Peticionario / Afectado</TableHead>
                    <TableHead className="min-w-32">Canal</TableHead>
                    <TableHead className="min-w-80">Proceso / Asunto</TableHead>
                    <TableHead className="min-w-32">Asignado</TableHead>
                    <TableHead className="min-w-32">Vencimiento</TableHead>
                    <TableHead className="min-w-32">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <Show when={pqrds.length > 0} fallback={
                    <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            No hay PQRS registrados
                        </TableCell>
                    </TableRow>
                }>
                    <For each={pqrds}>
                        {(pqr: any) => {
                            const Icon = channelToIcon(pqr.channel);

                            return (
                                <TableRow className="hover:bg-gray-50 transition-colors">
                                    {/* Radicado Interno */}
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-sm">{pqr.num_rad}</span>
                                            <span className={`badge badge-sm ${pqr.status ? 'badge-primary' : 'badge-neutral'}`}>
                                                {pqr.status ? "Abierto" : "Cerrado"}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Radicado Mutual */}
                                    <TableCell>
                                        <span className="text-sm">{pqr.mutual_radicado || 'N/A'}</span>
                                    </TableCell>

                                    {/* Fecha */}
                                    <TableCell>
                                        <div className="flex flex-col gap-0.5 text-xs">
                                            <span className="font-medium">{formatPQRDDate(pqr.created_at)}</span>
                                            <span className="text-gray-500">{formatPQRDTime(pqr.created_at)}</span>
                                        </div>
                                    </TableCell>

                                    {/* Peticionario / Afectado */}
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            {/* Afectado */}
                                            <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                                                <div className="text-xs font-semibold text-blue-800 mb-1.5">
                                                    AFECTADO
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5 text-xs">
                                                        <IconUser className="size-3 text-gray-600" />
                                                        <span className="truncate">{pqr.person_name} {pqr.person_last_name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs">
                                                        <IconBarcode className="size-3 text-gray-600" />
                                                        <span>{formatDocument(pqr.person_document_type)} {pqr.person_document_number}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs">
                                                        <IconPhone className="size-3 text-gray-600" />
                                                        <span>{pqr.person_phone || 'N/A'}</span>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 text-xs">
                                                        <IconMail className="size-3 text-gray-600" />
                                                        <span>{pqr.person_email || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Peticionario (si es diferente) */}
                                            {(!pqr.person_is_same && pqr.pqrs_peticionario?.[0]) && (
                                                <div className="bg-purple-50 rounded-lg p-2 border border-purple-200">
                                                    <div className="text-xs font-semibold text-purple-800 mb-1.5">
                                                        PETICIONARIO
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1.5 text-xs">
                                                            <IconUser className="size-3 text-gray-600" />
                                                            <span className="truncate">{pqr.pqrs_peticionario[0].names}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs">
                                                            <IconBarcode className="size-3 text-gray-600" />
                                                            <span>{formatDocument(pqr.pqrs_peticionario[0].document_type)} {pqr.pqrs_peticionario[0].document_number}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs">
                                                            <IconPhone className="size-3 text-gray-600" />
                                                            <span>{pqr.pqrs_peticionario[0].phone || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>

                                    {/* Canal */}
                                    <TableCell>
                                        <Button className="flex items-center gap-1.5" size="xl">
                                            <Icon className="size-4" />
                                            <span className="text-xs">{pqr.channel}</span>
                                        </Button>
                                    </TableCell>

                                    {/* Proceso / Asunto */}
                                    <TableCell>
                                        <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 group">
                                            <div className="text-xs font-semibold text-gray-700 mb-1.5">
                                                {pqr.pqr_type}
                                            </div>
                                            <textarea className="text-gray-600 w-96 h-24" defaultValue={pqr.pqr_description} />
                                        </div>
                                    </TableCell>

                                    {/* Asignado */}
                                    <TableCell>
                                        <span className="text-sm">{(pqr.assignment?.[0])?.users?.username || 'Sin asignar'}</span>
                                    </TableCell>

                                    {/* Vencimiento */}
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className={`${semaforoToColor(pqr.created_at, pqr.end_date)} text-white p-2 rounded-lg`}>
                                                <Siren className="size-5" />
                                            </div>
                                            <div className="flex flex-col gap-0.5 text-xs">
                                                <span className="font-medium">{formatPQRDDate(pqr.end_date)}</span>
                                                <span className="text-gray-500">{formatPQRDTime(pqr.end_date)}</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Acciones */}
                                    <TableCell>
                                        <Button className="bg-blue-500 text-white rounded-2xl hover:bg-blue-500/5 hover:text-blue-500 transition-colors duration-300 w-24 flex items-center gap-1 py-2 justify-center" onClick={() => navigate(`/home/gestor/${pqr.id}`)}>
                                            <IconEye className="size-4" />
                                            <span className="text-xs">Ver</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }}
                    </For>
                </Show>
            </TableBody>
        </Table>
    )
}