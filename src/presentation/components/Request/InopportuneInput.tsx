import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { iReasonsRequest } from "@/entities";
import { httpClient } from "@/http";
import { ReasonStatusChangesRepository } from "@/features/shared/repositories";
import { requestStatePQRSMachine, StatusPQRS } from "@/utils";

interface InopportuneInputProps {
	value: string;
	setValue: Dispatch<SetStateAction<string | undefined>>;
}

const repository = new ReasonStatusChangesRepository(httpClient);
export const InopportuneInput: FC<InopportuneInputProps> = ({
	setValue,
	value,
}) => {
	const [inopportunes, setInopportune] = useState<iReasonsRequest[]>();

	const fetchData = async () => {
		const data = await repository.getByStatus(requestStatePQRSMachine.getStateId(StatusPQRS.Digitado));

		setInopportune(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<label>Motivo de la inoportunidad</label>
			<select
				defaultValue={value}
				onChange={(e) => setValue(e.target.value)}
			>
				<option value="">Seleccione un motivo</option>
				{inopportunes &&
					inopportunes.length > 0 &&
					inopportunes.map((inopportune) => (
						<option value={inopportune.description} key={inopportune.id}>
							{inopportune.description}
						</option>
					))}
			</select>
		</>
	);
};
