// Massive Operations index page - Main dashboard for status transitions
import { Header } from '@/features/shared/components/Header';
import { Card, CardBody } from '@/features/shared/components/Card';
import { Button } from '@/features/shared/components/Button';
import { formatOperationType } from './massive-operations.presenter';
import type { MassiveOperationType } from './massive-operations.model';

export default function MassiveOperations() {
    const operations: { type: MassiveOperationType; description: string }[] = [
        { type: 'OpenToProgrammed', description: 'Cambiar solicitudes de Abierto a Programado' },
        { type: 'ProgrammedToSend', description: 'Cambiar solicitudes de Programado a Enviado' },
        { type: 'SendedToDelivered', description: 'Cambiar solicitudes de Enviado a Entregado' },
        { type: 'DigitedToSend', description: 'Cambiar solicitudes de Digitado a Enviado' },
        { type: 'IPSToOpen', description: 'Importar desde IPS a Abierto' },
        { type: 'DeliveredToApply', description: 'Cambiar solicitudes de Entregado a Aplicado' },
        { type: 'ProgrammedToDigited', description: 'Cambiar solicitudes de Programado a Digitado' }
    ];

    return (
        <div className="px-4 md:px-12 md:pt-6">
            <Header
                title="Operaciones Masivas"
                subItem="Gestión"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {operations.map((op) => (
                    <Card key={op.type}>
                        <CardBody>
                            <h3 className="font-semibold text-lg mb-2">
                                {formatOperationType(op.type)}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                {op.description}
                            </p>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                    // Navigate to specific operation page
                                    window.location.href = `/manage/${op.type.toLowerCase()}`;
                                }}
                            >
                                Gestionar
                            </Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
