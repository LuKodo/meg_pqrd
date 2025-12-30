import { usePQRS } from "./hooks/usePQRS";
import { Header } from "@/features/shared/components/Header";
import { TablePQRD } from "./components/table-pqrd";
import { CreatePQRDModal } from "./components/create-pqrd-modal";
import { UploadPQRDModal } from "./components/upload-pqrd-modal";
import { Fragment, useState } from "react";
import { iPQRD } from "./pqrd.model";
import { Pagination } from "@/presentation/components";
import { Button, Card, CardContent, CardFooter } from "@/components/ui";
import { Siren } from "lucide-react";

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
        <Fragment>
            <Header
                title="Visor de PQRS"
                subItem="Gestión"
                button={
                    <div className="flex gap-2">
                        <Button
                            className="bg-blue-500 text-white rounded-2xl hover:bg-blue-500/5 hover:text-blue-500 transition-colors duration-300"
                            onClick={() => setShowCreateModal(true)}
                        >
                            <Siren /> Nuevo PQRD
                        </Button>
                        <Button
                            className="bg-blue-500 text-white rounded-2xl hover:bg-blue-500/5 hover:text-blue-500 transition-colors duration-300"
                            onClick={() => setShowUploadModal(true)}
                        >
                            <Siren /> Importar Excel
                        </Button>
                    </div >
                }
            />


            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-3">
                        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 mt-2">
                            <Card>
                                <CardContent>
                                    <div className="overflow-x-auto max-h-[calc(100vh-15rem)]">
                                        <TablePQRD pqrds={pqrds.data} />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Pagination
                                        pagination={{
                                            currentPage: pqrds.currentPage,
                                            totalPages: pqrds.totalPages,
                                            setPage: (page) => {
                                                setPage(page);
                                            },
                                        }}
                                    />
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

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
        </Fragment>
    );
};