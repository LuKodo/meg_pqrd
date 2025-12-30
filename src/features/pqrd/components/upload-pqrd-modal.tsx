import { useState, useRef } from "react";
import { read, utils } from "xlsx";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";
import { Button } from "@/features/shared/components/Button";
import { iPQRD } from "../pqrd.model";
import { toast } from "sonner";

interface UploadPQRDModalProps {
    show: boolean;
    onClose: () => void;
    onUpload: (pqrds: Partial<iPQRD>[]) => Promise<void>;
}

interface ExcelPQRD {
    Radicacion: string;
    FechaRadicacion: string;
    FechaRadicacionFiltro: string;
    Semaforo: string;
    Oportunidad: string;
    Estado: string;
    Nivel1: string;
    Nivel2: string;
    Nivel3: string;
    RadicadoSuperSalud: string;
    Canales: string;
    Especialidad: string;
    Terapia: string;
    TecnologiaSalud: string;
    OtrosServiciosSalud: string;
    Ambulancia: string;
    Medicamentos: string;
    CantidadMedicamentos: string;
    Prestaciones: string;
    Prestador: string;
    NitPrestador: string;
    Logistica: string;
    Servicios: string;
    AtencionPersonalSalud: string;
    Instalaciones: string;
    Traslados: string;
    Cobro: string;
    Inconsistencia: string;
    Restriccion: string;
    Canal: string;
    Regional: string;
    CiudadHechos: string;
    DepartamentoHechos: string;
    Descripcion: string;
    Solucion: string;
    Causa: string;
    FechaVencimiento: string;
    Producto: string;
    TipoIdentificacionAfectado: string;
    IdentificacionAfectado: string;
    Afectado: string;
    TipoIdentificacionPeticionario: string;
    IdentificacionPeticionario: string;
    Peticionario: string;
    Celular: string;
    CorreoElectronico: string;
    Direccion: string;
    Telefono: string;
    Edad: string;
    Regimen: string;
    Recurrente: string;
    Reincidente: string;
    Responsable: string;
    Finalizacion: string;
    AltoCosto: string;
    Proceso: string;
    FechaPrestacion: string;
    FalloJudicial: string;
}

const CHUNK_SIZE = 500;

export const UploadPQRDModal = ({ show, onClose, onUpload }: UploadPQRDModalProps) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Partial<iPQRD>[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const transformInChunks = async (rows: ExcelPQRD[]) => {
        const result: Partial<iPQRD>[] = [];

        for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
            const chunk = rows.slice(i, i + CHUNK_SIZE);

            const transformed = chunk.map(row => {
                const { firstName, lastName } = divideName(row.Afectado);

                return {
                    channel: row.Canal,
                    pqr_type: row.Nivel1,
                    pqr_description: row.Descripcion,
                    person_name: firstName,
                    person_last_name: lastName,
                    person_type: row.TipoIdentificacionAfectado === 'NIT' ? 'juridico' : 'natural',
                    person_document_type: row.TipoIdentificacionAfectado,
                    person_document_number: row.IdentificacionAfectado,
                    person_phone: row.Telefono,
                    person_email: row.CorreoElectronico,
                    pqr_city: `${row.DepartamentoHechos} - ${row.CiudadHechos}`,
                    person_is_same: !row.TipoIdentificacionPeticionario,
                    status: true,
                    mutual_radicado: row.Radicacion,
                };
            });

            result.push(...transformed);

            // Cede el hilo a la UI
            await new Promise(requestAnimationFrame);
        }

        return result;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);

        try {
            setLoading(true);
            const arrayBuffer = await file.arrayBuffer();
            const workbook = read(arrayBuffer);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData: ExcelPQRD[] = utils.sheet_to_json(worksheet, {
                raw: true,
                defval: "",
            });

            // Transform Excel data to PQRD format
            const transformedData: Partial<iPQRD>[] = await transformInChunks(jsonData);
            setData(transformedData);
            toast.success(`${transformedData.length} registros cargados correctamente`);
        } catch (error) {
            console.error('Error reading file:', error);
            toast.error('Error al leer el archivo Excel');
        } finally {
            setLoading(false);
        }
    };

    const divideName = (name: string) => {
        const parts = name.trim().split(/\s+/);

        if (parts.length === 0) return { firstName: '', lastName: '' };

        if (parts.length === 1) {
            return { firstName: parts[0], lastName: '' };
        }

        return {
            firstName: parts[0],
            lastName: parts.slice(1).join(' ')
        };
    };

    const handleUpload = async () => {
        if (data.length === 0) {
            toast.warning('No hay datos para cargar');
            return;
        }

        setLoading(true);
        try {
            await uploadInBatches(data);
            toast.success('PQRD cargadas exitosamente');
            handleReset();
            onClose();
        } catch (error) {
            console.error('Error uploading PQRDs:', error);
            toast.error('Error al cargar las PQRD');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setData([]);
        setFileName("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const uploadInBatches = async (data: Partial<iPQRD>[]) => {
        const BATCH_SIZE = 300;

        for (let i = 0; i < data.length; i += BATCH_SIZE) {
            const batch = data.slice(i, i + BATCH_SIZE);
            await onUpload(batch);
        }
    };

    return (
        <Modal show={show} onClose={onClose} size="lg">
            <ModalHeader onClose={onClose}>
                <ModalTitle>Cargar PQRD desde Excel</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="space-y-6">
                    {/* File Upload */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Cargar Archivo</h3>

                        <div className="flex flex-col gap-3">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={handleFileChange}
                                className="file-input file-input-bordered w-full"
                            />

                            {fileName && (
                                <div className="alert alert-info">
                                    <span className="text-sm">
                                        📄 Archivo seleccionado: <strong>{fileName}</strong>
                                    </span>
                                </div>
                            )}

                            {loading && (
                                <span className="loading loading-spinner loading-xl"></span>
                            )}

                            {data.length > 0 && (
                                <div className="alert alert-success">
                                    <span className="text-sm">
                                        ✅ <strong>{data.length}</strong> registros listos para cargar
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Preview Table */}
                    {data.length > 0 && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Vista Previa ({data.length} registros)
                            </h3>
                            <div className="overflow-x-auto max-h-64">
                                <table className="table table-sm table-zebra">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Documento</th>
                                            <th>Canal</th>
                                            <th>Tipo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.slice(0, 10).map((pqrd, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td className="truncate max-w-xs">{pqrd.person_name}</td>
                                                <td>{pqrd.person_document_type} {pqrd.person_document_number}</td>
                                                <td>
                                                    <span className="badge badge-sm badge-primary">
                                                        {pqrd.channel}
                                                    </span>
                                                </td>
                                                <td>{pqrd.pqr_type}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {data.length > 10 && (
                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                        Mostrando 10 de {data.length} registros
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                handleReset();
                                onClose();
                            }}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            onClick={handleUpload}
                            disabled={loading || data.length === 0}
                        >
                            {loading ? 'Cargando...' : `Cargar ${data.length} PQRD`}
                        </Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};
