// FileUpload
import { ChangeEvent, Dispatch, SetStateAction, useRef, useMemo } from "react";
import { read, utils } from "xlsx";
import { Affiliate, AffiliateDoc, itemExcelPQRS } from "@/entities";
import { AffiliateHttpRepository } from "@/features/shared/repositories";
import { Card, CardBody } from "@/features/shared/components/Card";
import Swal from "sweetalert2";

interface FileUploadProps {
	setData: (data: itemExcelPQRS[]) => void;
	setLoading: Dispatch<SetStateAction<boolean>>;
}

export const FileUploadPQRS = ({ setData, setLoading }: FileUploadProps) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const afiliateRepository = useMemo(() => new AffiliateHttpRepository(), []);

	const handleClick = () => {
		fileInputRef.current?.click();
	}

	const findAffiliate = async (params: AffiliateDoc): Promise<Affiliate | undefined> => {
		const affiliate = await afiliateRepository.getAffiliateByDocument({
			document_number: params.document_number.value,
			document_type: params.document_type.value,
		});

		if (!affiliate) {
			return;
		}

		return affiliate;
	};

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		setLoading(true);
		const selectedFile = event.target.files?.[0];

		if (selectedFile) {
			if (selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
				setLoading(false);
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'El archivo debe ser un archivo de Excel' + selectedFile.type,
				});
				return;
			}
			try {
				const file = await selectedFile.arrayBuffer();
				const workbook = read(file);
				const worksheet = workbook.Sheets[workbook.SheetNames[0]];
				const raw_data: itemExcelPQRS[] = utils.sheet_to_json(worksheet, {
					raw: false,
				});
				const newData = raw_data?.map(async (item: itemExcelPQRS, index) => {
					item.ID = index + 1;
					const affiliate = await findAffiliate({
						document_type: { value: item.TIPO_DOC },
						document_number: { value: item.DOCUMENTO_BENEFICIARIO },
					});

					if (!item.DIRECCION) {
						item.DIRECCION = 'Error.Solicitud sin dirección'
					}

					if (!affiliate) {
						if (!item.APELLIDO1) {
							item.AFILIADO = 'Error.El afiliado no tiene apellido';
						} else if (!item.DOCUMENTO_BENEFICIARIO) {
							item.AFILIADO = 'Error.El afiliado no tiene documento';
						} else if (!item.TIPO_DOC) {
							item.AFILIADO = 'Error.El afiliado no tiene tipo de documento';
						} else if (!item.NOMBRE1) {
							item.AFILIADO = 'Error.El afiliado no tiene primer nombre';
						} else {
							const newAffiliate = await afiliateRepository.createAffiliate({
								lastname_1: item.APELLIDO1,
								lastname_2: item.APELLIDO2 || '',
								firstname: item.NOMBRE1,
								surname: item.NOMBRE2 || '',
								phone: item.TELEFONO,
								cellphone: item.TELEFONO || '',
								address: item.DIRECCION,
								document_number: item.DOCUMENTO_BENEFICIARIO.trim(),
								document_type: item.TIPO_DOC.trim(),
								isTutela: false
							});

							item.AFILIADO = `${newAffiliate?.data?.firstname} ${newAffiliate?.data?.surname ?? ''} ${newAffiliate?.data?.lastname_1} ${newAffiliate?.data?.lastname_2 ?? ''}`;
						}
					} else {
						item.AFILIADO = `${affiliate.firstname} ${affiliate.surname} ${affiliate.lastname_1} ${affiliate.lastname_2}`;
					}
					item.AFILIADOI = affiliate;
					return item;
				});
				setData(await Promise.all(newData));
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false);
			}
		}
	}

	return (
		<Card>
			<CardBody>
				<div className="flex items-center justify-between">
					<div className="w-full">
						<div
							className="bg-primary-subtle rounded-xl p-5 border border-primary"
							style={{ borderStyle: 'dashed' }}
							onClick={handleClick}
							role="button"
						>
							<i className="bi bi-file-earmark-arrow-up-fill text-primary" />
							<span className="text-primary text-md ms-2">Haz click aqui para cargar tu archivo</span>
						</div>
						<input
							ref={fileInputRef}
							type="file"
							style={{ display: 'none' }}
							onChange={handleFileChange}
						/>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
