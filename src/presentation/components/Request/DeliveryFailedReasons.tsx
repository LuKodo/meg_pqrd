import { useEffect, useState } from "react";
import type { FC } from "react";
import type { Dispatch } from "react";
import type { SetStateAction } from "react";
import { requestStatePQRSMachine, StatusPQRS } from "@/utils";
import type { iReasonsRequest } from "@/entities";
import { httpClient } from "@/http";
import { ReasonStatusChangesRepository } from "@/features/shared/repositories";

interface DeliveryFailedReasonsProps {
	selected: string | undefined;
	setSelected: Dispatch<SetStateAction<string | undefined>>;
}

const repository = new ReasonStatusChangesRepository(httpClient);

const DeliveryFailedReasons: FC<DeliveryFailedReasonsProps> = ({
	selected,
	setSelected,
}) => {
	const [data, setData] = useState<iReasonsRequest[]>([]);

	useEffect(() => {
		const fetchUser = async () => {
			const reasons = await repository.getByStatus(requestStatePQRSMachine.getStateId(StatusPQRS.Devolucion));
			setData(reasons);
		};

		fetchUser();
	}, []);

	return (
		<select id="reasons" onChange={(e) => setSelected(e.target.value)}>
			<option value="0" />
			{data?.map((reason) => {
				return (
					<option
						selected={selected === reason.description}
						value={reason.description}
						key={reason.id}
					>
						{reason.description}
					</option>
				);
			})}
		</select>
	);
};
export default DeliveryFailedReasons;
