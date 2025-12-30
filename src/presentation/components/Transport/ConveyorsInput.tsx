import { useEffect, useState, useMemo } from "react";
import type { FC } from "react";
import type { Dispatch } from "react";
import type { SetStateAction } from "react";
import type { iTransport } from "@/entities";
import { ConveyorRepository } from "@/features/shared/repositories";

interface ConveyorsInputProps {
	selected: number | undefined;
	setSelected: Dispatch<SetStateAction<number | undefined>>;
}

const ConveyorsInput: FC<ConveyorsInputProps> = ({ selected, setSelected }) => {
	const [data, setData] = useState<iTransport[]>([]);
	const repository = useMemo(() => new ConveyorRepository(), []);

	useEffect(() => {
		const fetchConveyors = async () => {
			const conveyors = await repository.getAll();
			setData(conveyors);
		};

		fetchConveyors();
	}, [repository]);

	return (
		<select
			id="Conveyors"
			onChange={(e) => setSelected(Number(e.target.value))}
			value={selected}
		>
			<option value="0" />
			{data?.map((conveyor) => {
				return (
					<option
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
