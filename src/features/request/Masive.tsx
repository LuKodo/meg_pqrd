import { useState } from "react";

import type { itemExcelPQRS } from "@/entities";
import { usePagination, useSessionManager } from "@/features/shared/hooks";
import { RequestApiRepository } from "@/features/shared/repositories";
import { Col, Row } from "@/features/shared/components/Grid";
import { Header } from "@/features/shared/components/Header";
import { DownloadFile, FileUploadPQRS, Loading, Pagination, RequestTablePQRS, Tooltip } from "@/presentation/components";
import { IconSave } from "@/svg/save";
import { useMasiveSave } from "./hooks/useMasiveSave";

const CreateRequestMasivePQRS: React.FC = () => {
	const [data, setData] = useState<itemExcelPQRS[] | undefined>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const { userData } = useSessionManager();
	const repository = new RequestApiRepository();

	// Use pagination hook
	const { displayData, currentPage, totalPages, setCurrentPage } = usePagination({
		data,
		itemsPerPage: 10,
	});

	// Use masive save hook
	const { save } = useMasiveSave({
		data,
		userId: userData?.id ?? 0,
		repository,
		onComplete: () => setData([]),
	});

	return (
		<div className="px-4 md:px-12 md:pt-6">
			<Header
				title="Cargue Masivo (Contingencia)"
				subItem="Solicitudes"
			/>

			<section className="section dashboard">
				<Row>
					<Col md={6}>
						<FileUploadPQRS setData={setData} setLoading={setLoading} />
					</Col>

					<Col md={6}>
						<DownloadFile filename="SOLICITUDESPQRS" />
					</Col>
				</Row>
			</section >

			<section className="text-center">
				{loading && <Loading />}
				{displayData && displayData.length > 0 && !loading && (
					<>
						<div className="card">
							<div className="card-body">
								<RequestTablePQRS data={displayData} />
							</div>
							<div className="card-footer">
								<Row>
									<Col>
										<Pagination
											pagination={{
												currentPage,
												totalPages,
												setPage: setCurrentPage,
											}}
										/>
									</Col>
								</Row>
							</div>
						</div>

						<Tooltip title="Registrar Solicitud" id="save">
							<button
								onClick={save}
								className="btn btn-primary p-3 rounded-circle d-flex align-items-center justify-content-center customizer-btn"
							>
								<IconSave />
							</button>
						</Tooltip>
					</>
				)}
			</section >
		</div>
	);
};

export default CreateRequestMasivePQRS;