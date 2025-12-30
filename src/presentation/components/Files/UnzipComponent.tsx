import React, { useState, ChangeEvent, useEffect, Fragment, useRef } from 'react';
import JSZip from 'jszip';
import { instance } from "@/utils";
import Swal from "sweetalert2";
import { Col, Row } from '@/features/shared/components/Grid';
import { Card, CardBody } from '@/features/shared/components/Card';


interface ExtractedFile {
    name: string;
    file: File;
    error?: string;
}

interface ZipInfo {
    zipName: string;
    files: ExtractedFile[];
}

interface UnzipComponentProps {
    type: string
}

const UnzipComponent: React.FC<UnzipComponentProps> = ({ type }) => {
    const [zipInfo, setZipInfo] = useState<ZipInfo | null>(null);
    const [fileErrors, setFileErrors] = useState<string[]>([]);
    const [file, setFile] = useState<File | null | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (file !== undefined && !file) {
            Swal.fire({
                title: 'Error',
                text: 'El radicado no existe, renombre el archivo con un numero de radicado correcto',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return
        }

        const validate = async () => {
            try {
                if (file && zipInfo) {
                    const validFiles = zipInfo.files.filter((doc) => doc.error === 'Asignado');
                    await Promise.all(validFiles.map(async (doc) => {
                        await handleUpload(doc.file);
                        await updateRequest(doc.name.split('.')[0]);
                    }));
                }
            } catch (error: any) {
                console.error('Error uploading the file:', error);
                return false
            }
        }
        validate()
    }, [file, zipInfo]);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setFile(selectedFile);

        if (selectedFile) {
            setLoading(true);
            const zip = new JSZip();
            const content = await zip.loadAsync(selectedFile);
            const extractedFiles: ExtractedFile[] = [];
            const errors: string[] = [];

            for (const fileName in content.files) {
                const fileData = await content.files[fileName].async('blob');
                const fileExtension = fileName.split('.').pop()?.toLowerCase();

                if (fileExtension === 'pdf') {
                    const newFile = new File([fileData], fileName, { type: 'application/pdf' });
                    const error = await validateRequest(fileName.split('.')[0]) ? 'Asignado' : 'Esta solicitud no existe'
                    extractedFiles.push({ name: fileName, file: newFile, error });
                } else {
                    errors.push(fileName);
                }
            }

            if (errors.length > 0) {
                await Swal.fire({
                    title: 'Error',
                    text: 'El archivo no contiene archivos PDF',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return
            }

            setZipInfo({
                zipName: selectedFile.name,
                files: extractedFiles,
            });
            setFileErrors(errors);
            setLoading(false);
        }
    };


    const validateRequest = async (request: string) => {
        try {
            const res = await instance.get(`request/search?id=${request}&page=1&perPage=1`)
            return res.data.data.length > 0;
        } catch (error: any) {
            console.error('Error validating the request:', error);
            return false
        }
    }

    const updateRequest = async (request: string) => {
        try {
            await fetch(`${import.meta.env.VITE_URI_API}request/${request}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url_attachment: '/medicar/MEG/' + (type === 'formulas' ? 'formulas' : 'autorizaciones') + '/' + request + '.pdf'
                })
            });
        } catch (error) {
            console.error('Error updating the request:', error);
        }
    };

    const handleUpload = async (file: File) => {
        if (!file) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, selecciona un archivo',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await fetch(`${import.meta.env.VITE_URI_API}files/upload?type=${type}`, {
                method: 'POST',
                body: formData,
            });
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    }

    return (
        <Fragment>
            <Row>
                <Col lg={5} md={6}>
                    <Card>
                        <CardBody>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="w-100">
                                    <div
                                        className="bg-primary-subtle rounded-3 p-5 border-2 border-primary"
                                        style={{ borderStyle: 'dashed' }}
                                        onClick={handleClick}
                                    >
                                        <i className="bi bi-file-earmark-arrow-up-fill text-primary" />
                                        <span className="text-primary fw-bold ms-2">Haz click aqui para cargar tu archivo</span>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        style={{ display: 'none' }}
                                        accept=".zip"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {loading && <Spinner animation="border" />}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {
                zipInfo && (
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <table className="table table-sm table-hover">
                                        <thead>
                                            <tr>
                                                <th>Nombre del Archivo</th>
                                                <th>Observaciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {zipInfo.files.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file.name}</td>
                                                    <td>{file.error}</td>
                                                </tr>
                                            ))}
                                            {fileErrors.map((error, index) => (
                                                <tr key={index} style={{ color: 'red' }}>
                                                    <td>{error}</td>
                                                    <td>Error: No es un PDF</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row >
                )}
        </Fragment >
    );
};

export default UnzipComponent;
