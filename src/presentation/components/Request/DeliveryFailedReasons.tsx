import { useEffect, useState, useMemo } from "react";
import type { FC } from "react";
import type { Dispatch } from "react";
import type { SetStateAction } from "react";
import { requestStatePQRSMachine, StatusPQRS } from "@/utils";
import type { iReasonsRequest } from "@/entities";
import { ReasonStatusChangesRepository } from "@/features/shared/repositories";

interface DeliveryFailedReasonsProps {
	selected: string | undefined;
	setSelected: Dispatch<SetStateAction<string | undefined>>;
}

const DeliveryFailedReasons: FC<DeliveryFailedReasonsProps> = ({
	selected,
	setSelected,
}) => {
	const [data, setData] = useState<iReasonsRequest[]>([]);
	const repository = useMemo(() => new ReasonStatusChangesRepository(), []);

	useEffect(() => {
		const fetchReasons = async () => {
			const reasons = await repository.getByStatus(requestStatePQRSMachine.getStateId(StatusPQRS.Devolucion));
			setData(reasons);
		};

		fetchReasons();
	}, [repository]);

	return (
		<select id="reasons" onChange={(e) => setSelected(e.target.value)} value={selected} className="select">
			<option value="0" />
			{data?.map((reason) => {
				return (
					<option
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
