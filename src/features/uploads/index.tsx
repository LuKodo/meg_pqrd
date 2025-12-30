// Uploads index page - File upload dashboard
import { useState } from 'react';
import { Header } from '@/features/shared/components/Header';
import { Card, CardBody, CardTitle } from '@/features/shared/components/Card';
import { Button } from '@/features/shared/components/Button';
import { formatUploadType, formatFileSize } from './uploads.presenter';
import type { UploadType } from './uploads.model';

export default function Uploads() {
    const [selectedType, setSelectedType] = useState<UploadType>('forms');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const uploadTypes: { type: UploadType; label: string; description: string }[] = [
        { type: 'forms', label: 'Formularios', description: 'Cargar formularios en formato Excel' },
        { type: 'auths', label: 'Autorizaciones', description: 'Cargar autorizaciones masivas' },
        { type: 'requests', label: 'Solicitudes', description: 'Cargar solicitudes desde archivo' }
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!selectedFile) return;
        // Upload logic here
        console.log('Uploading file:', selectedFile.name);
    };

    return (
        <div className="px-4 md:px-12 md:pt-6">
            <Header
                title="Cargar Archivos"
                subItem="Uploads"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">
                {uploadTypes.map((ut) => (
                    <div
                        key={ut.type}
                        className={`card ${selectedType === ut.type ? 'border-2 border-blue-500' : ''}`}
                    >
                        <div className="card-body">
                            <h3 className="font-semibold text-lg mb-2">{ut.label}</h3>
                            <p className="text-sm text-gray-600 mb-4">{ut.description}</p>
                            <Button
                                variant={selectedType === ut.type ? 'primary' : 'secondary'}
                                size="sm"
                                onClick={() => setSelectedType(ut.type)}
                            >
                                Seleccionar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Card>
                <CardBody>
                    <CardTitle>Cargar Archivo - {formatUploadType(selectedType)}</CardTitle>

                    <div className="mt-4">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="file-input file-input-bordered w-full max-w-xs"
                            accept=".xlsx,.xls,.csv"
                        />

                        {selectedFile && (
                            <div className="mt-4 p-4 bg-gray-50 rounded">
                                <p className="text-sm">
                                    <strong>Archivo:</strong> {selectedFile.name}
                                </p>
                                <p className="text-sm">
                                    <strong>Tamaño:</strong> {formatFileSize(selectedFile.size)}
                                </p>
                            </div>
                        )}

                        <div className="mt-4">
                            <Button
                                variant="primary"
                                onClick={handleUpload}
                                disabled={!selectedFile}
                            >
                                Cargar Archivo
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
