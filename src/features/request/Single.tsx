import type { Affiliate, iRequestOne } from "@/entities";
import { RequestCardPQRS, AffiliateCard } from '@/features/request/components';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { Header } from "@/features/shared/components/Header";

const CreateRequestPQRS = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		register,
		watch
	} = useForm<iRequestOne & { file?: FileList }>();
	const [affiliate, setAffiliate] = useState<Affiliate | null>(null);

	useEffect(() => {
		if (affiliate && affiliate.id) {
			setValue("affiliateId", affiliate.id);
		}
	}, [affiliate])

	return (
		<div className="px-4 md:px-12 md:pt-6">
			<Header
				title="Nueva Solicitud (Contingencia)"
				subItem="Solicitudes"
			/>
			<AffiliateCard
				affiliate={affiliate}
				setAffiliate={setAffiliate}
			/>
			<RequestCardPQRS
				control={control}
				setValue={setValue}
				watch={watch}
				handleSubmit={handleSubmit}
				register={register}
				errors={errors}
			/>
		</div>
	);
};

export default CreateRequestPQRS;