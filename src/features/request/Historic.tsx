import { Fragment, useEffect, useState } from "react";
import {
	TimeLine,
	PdfViewer,
	EditModal,
	LoadingAll,
} from "@/presentation/components";
import type { PaginatedData, iRequestView } from "@/entities";
import { useSessionManager } from "@/features/shared/hooks";
import {
	requestStatePQRSMachine,
	transformFilters,
	mapChannelRequest,
	mapColorChannelRequest,
	GenerarRotulo,
	StatusPQRS
} from "@/utils";
import { RequestApiRepository } from "@/features/shared/repositories";
import { Button } from "@/features/shared/components/Button";
import { Header } from "@/features/shared/components/Header";
import { Card, CardBody } from "@/features/shared/components/Card";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table'
import { DateTime } from "luxon";

const Historic = () => {
	const { userData } = useSessionManager()

	const [filters, _setFilters] = useState({
		id: { value: null, matchMode: "eq" },
		radicate: { value: null, matchMode: "eq" },
		username: { value: null, matchMode: "eq" },
		createdAt: { value: null, matchMode: "between" },
		programed_date: { value: null, matchMode: "between" },
		self_management_date: { value: null, matchMode: "between" },
		document_type: { value: null, matchMode: "eq" },
		document_number: { value: null, matchMode: "eq" },
		firstname: { value: null, matchMode: "eq" },
		surname: { value: null, matchMode: "eq" },
		lastname_1: { value: null, matchMode: "eq" },
		lastname_2: { value: null, matchMode: "eq" },
		estado: { value: null, matchMode: "eq" },
		address: { value: null, matchMode: "eq" },
		medicamento: { value: null, matchMode: "like" },
		code: { value: null, matchMode: "eq" },
		quantity: { value: null, matchMode: "eq" },
		requested_number: { value: null, matchMode: "eq" },
		sended: { value: null, matchMode: "between" },
		conveyor_name: { value: null, matchMode: "eq" },
		guide_number: { value: null, matchMode: "eq" },
		delivered: { value: null, matchMode: "between" },
		model_name: { value: null, matchMode: "eq" },
		channel: { value: null, matchMode: "eq" },
		required_mark_type: { value: null, matchMode: "eq" },
		formula: { value: null, matchMode: "eq" },
	})

	const requestRepository = new RequestApiRepository();
	const [data, setData] = useState<PaginatedData<iRequestView>>();
	const [loading, setLoading] = useState(true);
	const [mapModal, setMapModal] = useState(false);
	const [QRModal, setQRModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [seePDF, setSeePDF] = useState(false);
	const [selectedReq, setSelectedReq] = useState<iRequestView | null>(null);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});

	useEffect(() => {
		setData(undefined);
		setLoading(true);

		const timeoutId = setTimeout(async () => {
			try {
				const response = await requestRepository.getPaginatedRequests(
					transformFilters(filters),
					pagination.pageIndex + 1,
					pagination.pageSize,
				);

				setData(response);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		}, 500);

		return () => {
			clearTimeout(timeoutId);
			setLoading(false);
		};
	}, [pagination, filters]);

	useEffect(() => {
		setPagination({
			pageIndex: 0,
			pageSize: 10,
		});
	}, [filters]);

	const handleMapClose = () => setMapModal(false);
	const handleQRClose = () => setQRModal(false);
	const handleEditClose = () => setEditModal(false);

	const handlePdfClose = () => {
		setSelectedReq(null);
		setSeePDF(false);
	}

	const columnHelper = createColumnHelper<iRequestView>()
	const columns = [
		columnHelper.accessor('id', {
			header: 'ID',
			cell: info => info.getValue(),
			size: 12,
		}),
		columnHelper.accessor('radicate', {
			header: 'Radicado',
			cell: info => info.getValue(),
			size: 12,
		}),
		columnHelper.accessor('createdAt', {
			header: 'Fecha Radicación',
			cell: info => DateTime.fromISO(info.getValue().toString()).toFormat('yyyy-MM-dd'),
			size: 12,
		}),
		columnHelper.accessor('programed_date', {
			header: 'Fecha Espera Mutual',
			cell: info => DateTime.fromISO(info.getValue().toString()).toFormat('yyyy-MM-dd'),
			size: 9,
		}),
		columnHelper.accessor('document_type', {
			header: 'Tipo Documento',
			cell: info => info.getValue(),
			size: 9,
		}),
		columnHelper.accessor('document_number', {
			header: 'Nro Documento',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('firstname', {
			header: 'Pri Nombre',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('surname', {
			header: 'Seg Nombre',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('lastname_1', {
			header: 'Pri Apellido',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('lastname_2', {
			header: 'Seg Apellido',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('address', {
			header: 'Dirección',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('medicamento', {
			header: 'Medicamento',
			cell: info => info.getValue(),
			size: 30,
		}),
		columnHelper.accessor('code', {
			header: 'Código',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('quantity', {
			header: 'Cantidad',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('requested_number', {
			header: 'Nro Entrega',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('sended', {
			header: 'Fecha Envio',
			cell: info => info.getValue() ? DateTime.fromISO(info.getValue()?.toString()!).toFormat('yyyy-MM-dd') : '',
		}),
		columnHelper.accessor('name', {
			header: 'Transportadora',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('guide_number', {
			header: 'Nro Guía',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('delivered', {
			header: 'Fecha Entrega',
			cell: info => info.getValue() ? DateTime.fromISO(info.getValue()?.toString()!).toFormat('yyyy-MM-dd') : '',
		}),
		columnHelper.accessor('model_name', {
			header: 'Modelo',
			cell: info => <span className="badge badge-neutral">{info.getValue()}</span>,
		}),
		columnHelper.accessor('estado', {
			header: 'Estado',
			cell: info => <span className={`badge badge-${requestStatePQRSMachine.getStateColor(info.getValue() as StatusPQRS)}`}>{info.getValue()}</span>,
		}),
		columnHelper.accessor('channel', {
			header: 'Canal',
			cell: info => <span className={`badge badge-${mapColorChannelRequest(info.getValue())}`}>{mapChannelRequest(info.getValue())}</span>,
		}),
		columnHelper.accessor('required_mark_type', {
			header: 'Marca Requerida',
			cell: info => <span>{info.getValue()}</span>,
		}),
		columnHelper.accessor('formula', {
			header: 'SSC',
			cell: info => info.getValue(),
		}),
	]

	const table = useReactTable({
		columns,
		data: data?.data ?? [],
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: true,
		pageCount: data?.totalPages ?? 0,
		defaultColumn: {
			size: 12, //starting column size
			minSize: 9, //enforced during column resizing
			maxSize: 30, //enforced during column resizing
		},
		state: {
			pagination
		},
		onPaginationChange: setPagination,
	});

	return (
		<div className="px-4 md:px-4 md:pt-6">
			{selectedReq?.id && (
				<Fragment>
					<TimeLine
						show={mapModal}
						handleClose={handleMapClose}
						request={selectedReq}
					/>
					<GenerarRotulo show={QRModal} handleClose={handleQRClose} info={selectedReq} />
					<PdfViewer
						show={seePDF}
						onClose={handlePdfClose}
						request={selectedReq}
						fileUrl={selectedReq.url_attachment}
					/>
					<EditModal
						request={selectedReq}
						handleClose={handleEditClose}
						show={editModal}
						isPQRS={userData?.audipharma ?? false}
					/>
				</Fragment>
			)}

			<Header title="Histórico de Solicitudes" />
			<Card>
				<CardBody>
					{
						loading && (
							<LoadingAll />
						)
					}
					<div className="overflow-x-auto max-h-[calc(100vh-25rem)]">
						<table className="table table-sm table-pin-rows">
							<thead>
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<th
												key={header.id}
												style={{ minWidth: `${header.getSize()}rem` }}
											>
												{header.isPlaceholder
													? null
													: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody>
								{table.getRowModel().rows.map((row) => (
									<tr key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<td key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardBody>
				<div className="flex justify-between items-center p-4">
					<div className="flex gap-2">
						<Button
							onClick={() => table.firstPage()}
							disabled={!table.getCanPreviousPage()}
						>
							{'<<'}
						</Button>
						<Button
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							{'<'}
						</Button>
						<Button
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							{'>'}
						</Button>
						<Button
							onClick={() => table.lastPage()}
							disabled={!table.getCanNextPage()}
						>
							{'>>'}
						</Button>
					</div>
					<div className="w-14">
						<select
							className="select"
							value={table.getState().pagination.pageSize}
							onChange={e => {
								table.setPageSize(Number(e.target.value))
							}}
						>
							{[10, 20, 30, 40, 50].map(pageSize => (
								<option key={pageSize} value={pageSize}>
									{pageSize}
								</option>
							))}
						</select>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Historic;