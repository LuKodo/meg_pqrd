import { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";
import { Button } from "@/features/shared/components/Button";
import { Col, Row } from "@/features/shared/components/Grid";
import { iPQRD, PQRDTypeText } from "../pqrd.model";

interface CreatePQRDModalProps {
    show: boolean;
    onClose: () => void;
    onCreate: (pqrd: Partial<iPQRD>) => Promise<void>;
}

export const CreatePQRDModal = ({ show, onClose, onCreate }: CreatePQRDModalProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<iPQRD>>({
        channel: '',
        pqr_type: '',
        pqr_description: '',
        person_name: '',
        person_type: 'natural',
        person_response_type: 'Correo electrónico',
        person_last_name: '',
        person_document_type: '',
        person_document_number: '',
        person_phone: '',
        person_email: '',
        pqr_city: '',
        person_is_same: true,
        status: true,
    });

    const handleChange = (field: keyof iPQRD, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onCreate(formData);
            onClose();
            // Reset form
            setFormData({
                channel: '',
                pqr_type: '',
                pqr_description: '',
                person_name: '',
                person_document_type: '',
                person_document_number: '',
                person_phone: '',
                person_email: '',
                pqr_city: '',
                person_type: 'natural',
                person_response_type: 'Correo electrónico',
                person_is_same: true,
                status: true,
            });
        } catch (error) {
            console.error('Error creating PQRD:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose} size="5xl">
            <ModalHeader onClose={onClose}>
                <ModalTitle>Crear Nueva PQRD</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        {/* Información del Afectado */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 w-1/2">
                            <h3 className="text-sm font-semibold text-blue-800 mb-3">Información del Afectado</h3>

                            <Row className="p-2">
                                <Col md={6}>
                                    <label className="label">
                                        <span className="label-text">Nombres *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input rounded-xl w-full"
                                        value={formData.person_name}
                                        onChange={(e) => handleChange('person_name', e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={6}>
                                    <label className="label">
                                        <span className="label-text">Apellidos *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input rounded-xl w-full"
                                        value={formData.person_last_name}
                                        onChange={(e) => handleChange('person_last_name', e.target.value)}
                                        required
                                    />
                                </Col>

                                <Col md={3} className="mt-2">
                                    <label className="label">
                                        <span className="label-text">Tipo de Documento *</span>
                                    </label>
                                    <select
                                        className="select rounded-xl w-full"
                                        value={formData.person_document_type}
                                        onChange={(e) => handleChange('person_document_type', e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="CC">C.C.</option>
                                        <option value="TI">T.I.</option>
                                        <option value="CE">C.E.</option>
                                        <option value="PA">Pasaporte</option>
                                        <option value="RC">R.C.</option>
                                    </select>
                                </Col>

                                <Col md={3} className="mt-2">
                                    <label className="label">
                                        <span className="label-text">Número de Documento *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input rounded-xl w-full"
                                        value={formData.person_document_number}
                                        onChange={(e) => handleChange('person_document_number', e.target.value)}
                                        required
                                    />
                                </Col>

                                <Col md={4} className="mt-2">
                                    <label className="label">
                                        <span className="label-text">Teléfono</span>
                                    </label>
                                    <input
                                        type="tel"
                                        className="input rounded-xl w-full"
                                        value={formData.person_phone}
                                        onChange={(e) => handleChange('person_phone', e.target.value)}
                                    />
                                </Col>

                                <Col md={4} className="mt-2">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="input rounded-xl w-full"
                                        value={formData.person_email}
                                        onChange={(e) => handleChange('person_email', e.target.value)}
                                    />
                                </Col>

                                <Col md={4} className="mt-2">
                                    <label className="label">
                                        <span className="label-text">Ciudad *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input rounded-xl w-full"
                                        value={formData.pqr_city}
                                        onChange={(e) => handleChange('pqr_city', e.target.value)}
                                        required
                                    />
                                </Col>
                            </Row>
                        </div>

                        {/* Información de la PQRD */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 w-1/2">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Información de la PQRD</h3>

                            <Row className="g-3">
                                <Col md={4}>
                                    <label className="label">
                                        <span className="label-text">Canal *</span>
                                    </label>
                                    <select
                                        className="select rounded-xl w-full"
                                        value={formData.channel}
                                        onChange={(e) => handleChange('channel', e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="EMAIL">Email</option>
                                        <option value="TELEFONICO">Telefónico</option>
                                        <option value="WEB">Web</option>
                                        <option value="PRESENCIAL">Presencial</option>
                                        <option value="WHATSAPP">WhatsApp</option>
                                    </select>
                                </Col>

                                <Col md={8} className="mt-2">
                                    <label className="label">
                                        <span className="label-text">Tipo de PQRD *</span>
                                    </label>
                                    <select
                                        className="select rounded-xl w-full"
                                        value={formData.pqr_type}
                                        onChange={(e) => handleChange('pqr_type', e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar</option>
                                        {PQRDTypeText.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </Col>

                                <Col md={12} className="mt-2">
                                    <label className="label">
                                        <span className="label-text">Descripción *</span>
                                    </label>
                                    <textarea
                                        className="textarea rounded-xl w-full h-32"
                                        value={formData.pqr_description}
                                        onChange={(e) => handleChange('pqr_description', e.target.value)}
                                        placeholder="Describa detalladamente la PQRD..."
                                        required
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    {/* Botones */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                        >
                            {loading ? 'Creando...' : 'Crear PQRD'}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};
