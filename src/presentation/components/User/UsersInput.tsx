import { Dispatch, FC, SetStateAction, useEffect, useState, useMemo } from "react";
import { iUser } from "@/entities";
import { UserRepository } from "@/features/shared/repositories";

type RegionProps = {
	selected: number;
	setSelected: Dispatch<SetStateAction<number>>;
	disabled?: boolean;
	className?: string;
};

const UsersInput: FC<RegionProps> = ({
	selected,
	setSelected,
	disabled = false,
	className = "",
}) => {
	const [users, setUsers] = useState<iUser[]>([]);
	const userRepository = useMemo(() => new UserRepository(), []);

	useEffect(() => {
		const fetchData = async () => {
			await userRepository.fetchAllUsers().then((response) => {
				setUsers(response);
			});
		};

		fetchData();
	}, [userRepository]);

	return (
		<>
			<select
				id="UsersInput"
				onChange={(e) => setSelected(Number(e.target.value))}
				disabled={disabled}
				className={className}
				defaultValue={0}
			>
				<option value="0">
					{"Seleccione un usuario"}
				</option>
				{users &&
					users.map((user) => {
						return (
							<option
								selected={!!(selected && selected === user.id)}
								value={user.id}
								key={user.id}
							>
								{user.name}
							</option>
						);
					})}
			</select>
		</>
	);
};
export default UsersInput;
