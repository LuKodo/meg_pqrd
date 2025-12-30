import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";
import { Button } from "@/features/shared/components/Button";
import { Col, Row } from "@/features/shared/components/Grid";
import { iActivity, iRecord } from "../pqrd.model";
import { listActivities, onActivityCreate } from "../pqrd.presenter";
import { For } from "@/features/shared/components/For";

interface CreateActivityModalProps {
    show: boolean;
    onClose: () => void;
    pqrd_id: string;
    onActivityCreated: () => void;
}

export const CreateActivityModal = ({ show, onClose, pqrd_id, onActivityCreated }: CreateActivityModalProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<iRecord>>({
        pqrs_id: pqrd_id,
        activity_id: '',
    });
    const [activities, setActivities] = useState<iActivity[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await listActivities();
                if (response) {
                    setActivities(response);
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };
        fetchActivities();
    }, []);

    const handleChange = (field: keyof iRecord, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onActivityCreate(formData);
            onActivityCreated();
            onClose();
            // Reset form
            setFormData({
                pqrs_id: '',
                activity_id: '',
            });
        } catch (error) {
            console.error('Error creating Activity:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose} size="xl">
            <ModalHeader onClose={onClose}>
                <ModalTitle>Crear Nueva Actividad</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        {/* Información del Afectado */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 w-full">
                            <h3 className="text-sm font-semibold text-blue-800 mb-3">Información del Afectado</h3>

                            <Row className="p-2">
                                <Col md={12} className="mt-2 flex flex-col gap-2">
                                    <label className="label">Actividad *</label>
                                    <select name="" id="" className="select" onChange={(e) => handleChange('activity_id', e.target.value)} value={formData.activity_id}>
                                        <option value="">Seleccione una actividad</option>
                                        <For each={activities}>
                                            {activity => (
                                                <option key={activity.id} value={activity.id}>
                                                    {activity.description}
                                                </option>
                                            )}
                                        </For>
                                    </select>
                                </Col>
                                <Col md={6} className="mt-4 flex flex-col gap-2">
                                    <label className="label">
                                        <span className="label-text">Adjunto *</span>
                                    </label>
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
                            {loading ? 'Creando...' : 'Crear Actividad'}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};
