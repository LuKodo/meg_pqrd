import { IconTrafficLights } from "@/svg";
import { usePQRS } from "./hooks/usePQRS";
import { Header } from "@/features/shared/components/Header";
import { Button } from "@/features/shared/components/Button";
import { TablePQRD } from "./components/table-pqrd";
import { CreatePQRDModal } from "./components/create-pqrd-modal";
import { UploadPQRDModal } from "./components/upload-pqrd-modal";
import { useState } from "react";
import { iPQRD } from "./pqrd.model";
import { Pagination } from "@/presentation/components";
import { Card, CardBody } from "../shared/components/Card";

export default function GestorPQRD() {
    const [page, setPage] = useState(1);
    const { pqrds, createPQRD } = usePQRS({ page, limit: 10 });
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleCreate = async (pqrd: Partial<iPQRD>) => {
        await createPQRD(pqrd as iPQRD);
    };

    const handleUpload = async (pqrds: Partial<iPQRD>[]) => {
        // Upload all PQRDs in batch
        for (const pqrd of pqrds) {
            await createPQRD(pqrd as iPQRD);
        }
    };

    return (
        <div className="px-4 md:px-12 md:pt-6">
            <Header
                title="Visor de PQRS"
                subItem="Gestión"
                button={
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => setShowCreateModal(true)}
                        >
                            <IconTrafficLights /> Nuevo PQRD
                        </Button>
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setShowUploadModal(true)}
                        >
                            <IconTrafficLights /> Importar Excel
                        </Button>
                    </div >
                }
            />

            <Card>
                <CardBody>
                    <div className="overflow-x-auto max-h-[calc(100vh-25rem)]">
                        <TablePQRD pqrds={pqrds.data} />
                    </div>
                </CardBody>
				<div className="w-full p-4">
                    <Pagination
                        pagination={{
                            currentPage: pqrds.currentPage,
                            totalPages: pqrds.totalPages,
                            setPage: (page) => {
                                setPage(page);
                            },
                        }}
                    />
                </div>
            </Card>

            {/* Modals */}
            <CreatePQRDModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreate}
            />

            <UploadPQRDModal
                show={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onUpload={handleUpload}
            />
        </div>
    );
};