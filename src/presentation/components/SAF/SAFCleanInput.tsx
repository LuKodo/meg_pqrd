import {
	type Dispatch,
	type FC,
	type SetStateAction,
	useEffect,
	useState,
} from "react";
import { instance } from "@/utils";
import type { iHeadquarter } from "@/entities";

type RegionProps = {
	selected: number | undefined;
	setSelected: Dispatch<SetStateAction<number | undefined>>;
	disabled?: boolean;
	className?: string;
};

const SAFCleanInput: FC<RegionProps> = ({
	selected,
	setSelected,
	disabled = false,
	className = "",
}) => {
	const [regions, setRegions] = useState<iHeadquarter[]>([]);

	useEffect(() => {
		instance
			.get("headquarter?page=1&pageSize=10000")
			.then((response: any) => {
				response.data.data.map((city: iHeadquarter) => {
					city.name = `${city.name}`;
				});
				setRegions(response.data.data);
			});
	}, []);

	return (
		<select
			id="LogisticOrigin"
			onChange={(e) => setSelected(Number(e.target.value))}
			disabled={disabled}
			className={className}
		>
			<option value="0" />
			{regions?.map((origin) => {
				return (
					<option
						selected={!!(selected && selected === origin.id)}
						value={origin.id}
						key={origin.id}
					>
						{origin.name}
					</option>
				);
			})}
		</select>
	);
};
export { SAFCleanInput };
