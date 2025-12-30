import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	PDFViewer,
	Image,
} from "@react-pdf/renderer";
import type { FC } from "react";
import { iRequestView } from "@/entities";
import { Modal, ModalBody } from "@/features/shared/components/Modal";
import { Col, Row } from "@/features/shared/components/Grid";

interface props {
	show: boolean;
	handleClose: () => void;
	info: iRequestView;
}

export const GenerarRotulo: FC<props> = ({ show, handleClose, info }) => {
	return (
		<Modal>
			<ModalBody className="text-center">
				<PDFViewer width={750} height={400}>
					<MyDocument info={info} />
				</PDFViewer>

				<Row>
					<Col className="d-grid">
						<button onClick={handleClose}>Cancelar</button>
					</Col>
				</Row>
			</ModalBody>
		</Modal >
	);
};

// Create styles
const styles = StyleSheet.create({
	page: {
		backgroundColor: "#fff",
		padding: "10px",
	},
	section: {
		margin: 5,
		padding: 5,
	},
	logo: {
		width: "150px",
		margin: "0 auto",
		maxWidth: "100%",
		height: "auto",
	},
	title: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "heavy",
		textTransform: "uppercase",
	},
	info: {
		textAlign: "center",
		fontSize: 11,
		fontWeight: "bold",
		textTransform: "uppercase",
	},
	footer: {
		marginTop: 5,
		textAlign: "center",
		fontSize: 10,
		fontWeight: "bold",
		textTransform: "uppercase",
	}
});

interface MyDocumentProps {
	info: iRequestView
}

// Create Document Component
const MyDocument: FC<MyDocumentProps> = ({ info }) => (
	<Document>
		<Page size="LETTER" style={styles.page}>
			<View style={styles.section}>
				<Image style={styles.logo} src='/logo-meg.png' />

				<Text style={styles.footer}>Formula: {info.formula}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.title}>Detalle del destino</Text>
				<Text style={styles.info}>{`${info.firstname} ${info.surname ?? ''} ${info.lastname_1} ${info.lastname_2 ?? ''}`}</Text>
				<Text style={styles.info}>{info.document_type} {info.document_number}</Text>
				<Text style={styles.info}>{`IPS: ${info.ips !== 'null' ? info.ips : ''}`}</Text>
				<Text style={styles.info}>{`DIRECCION: ${info.address ?? info.address}`}</Text>
				<Text style={styles.info}>{info.department} - {info.city}</Text>
				<Text style={styles.info}>Recibe: {info.ips_delegate ?? `${info.firstname} ${info.surname ?? ''} ${info.lastname_1} ${info.lastname_2 ?? ''}`}</Text>
				<Text style={styles.info}>Telefono: {info.phone ?? ''}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.footer}>DISTRIBUCIONES PHARMASER LTDA</Text>
				<Text style={styles.footer}>Dirección: Mamonal Km 1 N° 7C-39 | Bloc Port Local 15</Text>
				<Text style={styles.footer}>Telefono: 6617875 - 6617879 - 3104976212</Text>
				<Text style={styles.footer}>Cartagena | Colombia</Text>
			</View>
		</Page>
	</Document>
);
