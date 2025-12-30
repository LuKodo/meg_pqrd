import { useEffect, useState } from "react";
import type { FC } from "react";
import type { Dispatch } from "react";
import type { SetStateAction } from "react";
import type { iTransport } from "@/entities";
import { httpClient } from "@/http";
import { ConveyorRepository } from "@/features/shared/repositories";

interface ConveyorsInputProps {
	selected: number | undefined;
	setSelected: Dispatch<SetStateAction<number | undefined>>;
}

const repository = new ConveyorRepository(httpClient);

const ConveyorsInput: FC<ConveyorsInputProps> = ({ selected, setSelected }) => {
	const [data, setData] = useState<iTransport[]>([]);

	useEffect(() => {
		const fetchUser = async () => {
			const Conveyors = await repository.getAll();
			setData(Conveyors);
		};

		fetchUser();
	}, []);

	return (
		<select
			id="Conveyors"
			onChange={(e) => setSelected(Number(e.target.value))}
		>
			<option value="0" />
			{data?.map((conveyor) => {
				return (
					<option
						selected={selected === conveyor.id}
						value={conveyor.id}
						key={conveyor.id}
					>
						{`Nombre: ${conveyor.name} | Promesa: ${conveyor.promise_days}`}
					</option>
				);
			})}
		</select>
	);
};
export default ConveyorsInput;
