import { Card, CardBody } from "@/features/shared/components/Card";
import { FC } from "react";

interface DownloadFileProps {
  filename: string;
}

export const DownloadFile: FC<DownloadFileProps> = ({ filename }) => {
  const handleDownload = async () => {
    const response = await fetch(`${import.meta.env.VITE_URI_PUBLIC}/files/${filename}.xlsx`)
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}.xlsx`)
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Card>
      <CardBody>
        <div
          className="flex items-center mt-0"
          onClick={handleDownload}
        >
          <button type="button" className="btn btn-primary btn-circle btn-xl me-1 mb-1">
            <i className="bi bi-cloud-download fs-7"></i>
          </button>
          <div className="ps-3">
            {" "}
            <h6 className="text-primary font-bold text-md" >Puedes descargar la plantilla aquí</h6>{" "}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
