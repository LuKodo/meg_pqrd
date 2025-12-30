import { ControllerRenderProps } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { iIPS, iRequestOne } from "@/entities";
import { Typeahead } from "@/features/shared/components/Typeahead";
import { IpsRepository } from "@/features/shared/repositories";
import { httpClient } from "@/http";

interface SearchInputProps {
	field: ControllerRenderProps<iRequestOne, "ips">;
	error?: boolean;
}

const ipsRepository = new IpsRepository(httpClient);
const getIps = async () => {
	return await ipsRepository.getIps();
};

export const IPSInput: FC<SearchInputProps> = ({ field }) => {
	const [ips, setIps] = useState<iIPS[] | null>(null);

	useEffect(() => {
		try {
			getIps().then((res) => {
				setIps(res.data);
			});
		} catch (error: any) {
			console.error(error);
		}
	}, []);

	if (!ips) {
		return <div className="placeholder-glow form-control bg-gray-100 rounded-lg">Cargando IPS...</div>;
	}

	return (
		<Typeahead
			options={ips?.map((ips: iIPS) => ({ label: ips.name!, value: ips.id! })) || []}
			placeholder="Seleccione una IPS"
			onSelect={field.onChange}
		/>
	);
};
