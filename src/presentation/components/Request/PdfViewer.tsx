import { useEffect, useState } from 'react';
import { ModalBody, ModalFooter, Modal } from '@/features/shared/components/Modal.tsx';

import { Loading } from '../Loading.tsx';
import { iRequestView } from '@/entities/Request.ts';
import { httpClient } from '@/http/HttpClient.ts';

interface PdfViewerProps {
    fileUrl: string;
    onClose: () => void;
    show: boolean;
    request: iRequestView;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl, onClose, show, request }) => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPdfUrl(null);
        const downloadPdf = async () => {
            try {
                setLoading(true);
                const response = await httpClient.post(`files/download?filename=${fileUrl}.pdf&type=formulas`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                setPdfUrl(url);
            } catch (error) {
                console.error('Error downloading PDF:', error);
            } finally {
                setLoading(false);
            }
        };

        downloadPdf();
    }, [fileUrl]);

    const handleClose = () => {
        setPdfUrl(null);
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose}>
            <ModalBody style={{ width: '100%', height: 'calc(100vh - 200px)' }}>
                {pdfUrl && !loading && (
                    <iframe src={pdfUrl} style={{ border: 'none' }} className='w-100 h-100' />
                )}

                <div className='text-center mt-5'>
                    {loading && <Loading />}
                </div>

            </ModalBody>
            <ModalFooter>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                >
                    Cerrar
                </button>
            </ModalFooter>
        </Modal>
    );
};

export { PdfViewer };
