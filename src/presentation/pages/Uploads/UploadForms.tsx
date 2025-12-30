import UnzipComponent from "@/presentation/components/Files/UnzipComponent";
import { Header } from "@/presentation/components/Header.tsx";

const UploadForms: React.FC = () => {
	return (
		<div>
			<Header title="Cargar Formulas" subItem="Cargue de Archivos" />
			<section className="section dashboard">
				<UnzipComponent type="formulas" />
			</section>
		</div>
	);
}

export default UploadForms