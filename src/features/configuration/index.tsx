// Configuration index page - Account Settings
import { Card, CardBody, CardTitle } from '@/features/shared/components/Card';
import { Header } from '@/features/shared/components/Header';
import { useSessionManager } from '@/features/shared/hooks/useSessionManager';

export default function AccountSettings() {
    const { userData } = useSessionManager();

    return (
        <div className="px-4 md:px-12 md:pt-6">
            <Header
                title="Configuración de Cuenta"
                subItem="Ajustes"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* User Information Card */}
                <Card>
                    <CardBody>
                        <CardTitle>Información Personal</CardTitle>
                        <div className="space-y-3 mt-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Nombre</label>
                                <p className="text-base">{userData?.name || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Email</label>
                                <p className="text-base">{userData?.mail || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Usuario</label>
                                <p className="text-base">{userData?.username || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Rol</label>
                                <p className="text-base">{userData?.role?.name || 'N/A'}</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Settings Card */}
                <Card>
                    <CardBody>
                        <CardTitle>Preferencias</CardTitle>
                        <div className="space-y-3 mt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Notificaciones</span>
                                <input type="checkbox" className="toggle" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Notificaciones por Email</span>
                                <input type="checkbox" className="toggle" />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
