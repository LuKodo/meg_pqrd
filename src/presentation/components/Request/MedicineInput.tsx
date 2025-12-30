import { ControllerRenderProps } from "react-hook-form";
import { iRequestOne } from "@/entities";
import { Typeahead } from "@/features/shared/components/Typeahead";

interface SearchInputProps {
	field: ControllerRenderProps<iRequestOne, "medicine">;
	error: boolean | undefined;
}

export const MedicineInput: React.FC<SearchInputProps> = ({ field, error }) => {
	return (
		<>
			<label>Medicamento</label>
			<Typeahead
				options={[]}
				placeholder="Medicamento"
				onSelect={(value) => field.onChange(value)}
			/>
			{error && (
				<div className="d-flex justify-content-start">
					<small
						id="name1"
						className="badge badge-danger text-danger font-medium bg-danger-subtle form-text"
					>
						Campo requerido
					</small>
				</div>
			)}
		</>
	);
};
