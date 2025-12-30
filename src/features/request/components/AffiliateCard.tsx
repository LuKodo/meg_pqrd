import { type FC, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Affiliate } from "@/entities/Affiliate";
import { documentType } from "@/entities/DocumentType";
import { Tooltip } from "../../../presentation/components/Common/TooltipComponent.tsx";
import { AffiliateHttpRepository } from "@/features/shared/repositories";
import { httpClient } from "@/http";
import { Card, CardBody } from "@/features/shared/components/Card.tsx";
import { Button } from "@/features/shared/components/Button.tsx";
import { toast } from "sonner";
import { IconSearch } from "@/svg/search.tsx";
import { IconBrush } from "@/svg/brush.tsx";

interface AffiliateComponentProps {
  affiliate: Affiliate | null;
  setAffiliate: (affiliate: Affiliate) => void;
}

export const AffiliateCard: FC<AffiliateComponentProps> = ({
  affiliate,
  setAffiliate
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeSearch, setActiveSearch] = useState<boolean>(true);
  const repository = new AffiliateHttpRepository(httpClient);

  useEffect(() => {
    setAffiliate({
      document_type: "",
      document_number: "",
      lastname_1: "",
      lastname_2: "",
      firstname: "",
      surname: "",
      phone: "",
      cellphone: "",
      address: "",
      isTutela: false
    });
  }, []);

  const handleAffiliate = (param: string, value: string) => {
    if (!param) {
      toast.warning("Por favor, complete todos los campos");
      return;
    };

    if (!affiliate) {
      toast.warning("Por favor, complete todos los campos");
      return;
    };

    setAffiliate({ ...affiliate, [param]: value });
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!affiliate) {
      toast.warning("Por favor, complete todos los campos");
      return;
    }

    if (affiliate.document_type === "" || affiliate.document_number === "") {
      toast.warning("Por favor, complete todos los campos");
      return;
    }

    try {
      setLoading(true);
      const response = await repository.getAffiliateByDocument({ document_number: affiliate.document_number, document_type: affiliate.document_type })

      if (!response) {
        toast.warning("Afiliado no encontrado, por favor, cree el afiliado");
        setActiveSearch(false);
        return;
      }

      setAffiliate(response);
      setActiveSearch(true);
    } catch (error: any) {
      console.error(error);
      toast.error("Error al buscar el afiliado");
    } finally {
      setLoading(false);
    }
  };

  const saveAffiliate = async () => {
    if (!affiliate) {
      toast.warning("Por favor, complete todos los campos");
      return;
    }

    if (affiliate.document_type === "" || affiliate.document_number === "") {
      toast.warning("Por favor, complete todos los campos");
      return;
    }

    affiliate.isTutela = false

    try {
      setLoading(true);
      const response = await repository.createAffiliate(affiliate);
      if (!response.success) {
        toast.error(response.error);
        return;
      }
      setAffiliate(response?.data!);
      setActiveSearch(true);
    } catch (error: any) {
      console.error(error);
      toast.error("Error al guardar el afiliado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardBody>
        <div className="mb-3">
          <h5 className="card-title mb-0">Datos del Afiliado</h5>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Tipo de Documento</label>
            <select
              className="select w-full rounded-lg"
              disabled={loading}
              value={affiliate?.document_type}
              onChange={(e) => handleAffiliate("document_type", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            >
              <option value="">Seleccionar</option>
              {documentType.map((DT) => {
                return (
                  <option key={DT} value={DT}>
                    {DT}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="label">Número de Documento</label>
            <input
              type="number"
              className="input w-full rounded-lg"
              value={affiliate?.document_number}
              onChange={(e) => handleAffiliate("document_number", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
              disabled={loading}
              placeholder="Número de Documento"
            />

          </div>
          <div className="col flex items-end gap-2">
            <Tooltip title="Buscar" id="btnSearch">
              <Button
                variant="primary"
                className="rounded-lg"
                disabled={loading}
                onClick={handleSearch}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <IconSearch />
                )}
              </Button>
            </Tooltip>

            <Tooltip title="Limpiar" id="btnClean">
              <Button
                variant="primary"
                className="rounded-lg"
                onClick={() => {
                  setAffiliate({
                    document_type: "",
                    document_number: "",
                    lastname_1: "",
                    lastname_2: "",
                    firstname: "",
                    surname: "",
                    phone: "",
                    cellphone: "",
                    address: "",
                    isTutela: false
                  });
                }}
                disabled={loading}
              >
                <IconBrush />
              </Button>
            </Tooltip>
          </div>
        </div>
        {loading ? (
          <div>
            Cargando ...
          </div>
        ) : (
          <>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-2 flex-col w-1/4">
                <label className="label w-full">Primer Apellido</label>
                <input
                  className="input rounded-lg w-full"
                  value={affiliate?.lastname_1}
                  onChange={(e) => handleAffiliate("lastname_1", e.target.value)}
                  placeholder="Primer Apellido"
                  disabled={activeSearch}
                />
              </div>
              <div className="flex items-center gap-2 flex-col w-1/4">
                <label className="label w-full">Segundo Apellido</label>
                <input
                  className="input rounded-lg w-full"
                  value={affiliate?.lastname_2}
                  onChange={(e) => handleAffiliate("lastname_2", e.target.value)}
                  placeholder="Segundo Apellido"
                  disabled={activeSearch}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-2 flex-col w-1/4">
                <label className="label w-full">Primer Nombre</label>
                <input
                  className="input rounded-lg w-full"
                  value={affiliate?.firstname}
                  onChange={(e) => handleAffiliate("firstname", e.target.value)}
                  placeholder="Primer Nombre"
                  disabled={activeSearch}
                />
              </div>
              <div className="flex items-center gap-2 flex-col w-1/4">
                <label className="label w-full">Segundo Nombre</label>
                <input
                  className="input rounded-lg w-full"
                  value={affiliate?.surname}
                  onChange={(e) => handleAffiliate("surname", e.target.value)}
                  placeholder="Segundo Nombre"
                  disabled={activeSearch}
                />
              </div>
            </div>

            <div className="mt-3 flex items-end gap-2">
              <div className="flex items-center gap-2 flex-col w-1/4">
                <label className="label w-full">Teléfono</label>
                <input
                  className="input rounded-lg w-full"
                  value={affiliate?.phone}
                  onChange={(e) => handleAffiliate("phone", e.target.value)}
                  placeholder="Teléfono"
                  disabled={activeSearch}
                />
              </div>
              <div className="flex items-center gap-2 flex-col w-1/4">
                <label className="label w-full">Otro Teléfono</label>
                <input
                  className="input rounded-lg w-full"
                  value={affiliate?.cellphone}
                  onChange={(e) => handleAffiliate("cellphone", e.target.value)}
                  placeholder="Otro Teléfono"
                  disabled={activeSearch}
                />
              </div>
              <div className={`flex items-center gap-2 w-1/6 ${activeSearch ? 'hidden' : ''}`}>
                <Button onClick={saveAffiliate} variant="primary" className="w-100" disabled={activeSearch}><i className="bi bi-person-fill-add me-2" />Crear</Button>
              </div>
            </div>
          </>
        )}
      </CardBody >
    </Card >
  );
};
