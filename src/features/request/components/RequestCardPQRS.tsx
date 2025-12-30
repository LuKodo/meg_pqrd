import { type FC, FormEventHandler } from "react";
import { Controller, SubmitHandler, UseFormWatch, UseFormRegister, UseFormSetValue, Control, FieldErrors } from "react-hook-form";
import { useLocation } from "wouter";
import { DateTime } from "luxon";

import { iRequestOne } from "@/entities";
import { Card, CardBody } from "@/features/shared/components/Card.tsx";
import { Col, Row } from "@/features/shared/components/Grid.tsx";

import { CityInput } from "../../../presentation/components/Location/CityInput.tsx";
import { IPSInput } from "../../../presentation/components/IPS/IpsInput.tsx";
import { ModelInput } from "../../../presentation/components/Request/ModelInput.tsx";
import { ProductSearchModal } from "../../../presentation/components/Request/ProductSearchModal.tsx";
import { FormField } from "../../shared/components/FormField.tsx";
import { useRequestPQRS } from "@/features/request/useRequestPQRS";
import { addBusinessDays } from "../../../presentation/components/utils/addBusinessDays.ts";

interface RequestCardProps {
  control: Control<iRequestOne & { file?: FileList }>;
  setValue: UseFormSetValue<iRequestOne & { file?: FileList }>;
  watch: UseFormWatch<iRequestOne & { file?: FileList }>;
  handleSubmit: (callback: SubmitHandler<iRequestOne & { file?: FileList }>) => FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<iRequestOne & { file?: FileList }>;
  errors: FieldErrors<iRequestOne & { file?: FileList }>;
}

export const RequestCardPQRS: FC<RequestCardProps> = ({ control, setValue, handleSubmit, register, errors, watch }) => {
  const [, navigate] = useLocation();

  const {
    loading,
    productModal,
    setProductModal,
    productName,
    mark,
    isCalculable,
    handleProductSelect,
    handleProductClose,
    handleFileChange,
    onSubmit
  } = useRequestPQRS({ setValue, watch, navigate });

  if (loading) {
    return (
      <Card className="mt-4">
        <CardBody>
          <div className="flex justify-center p-5">
            <h5>Cargando...</h5>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <ProductSearchModal
        show={productModal}
        handleClose={handleProductClose}
        setProduct={handleProductSelect}
      />

      <CardBody>
        <div className="mb-3">
          <h5 className="card-title mb-0">Datos de la Solicitud</h5>
        </div>

        <form className="section" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={5}>
              <FormField label="Número de autorización" error={errors.auth_number}>
                <input
                  className="input rounded-lg w-full"
                  placeholder="Número de autorización"
                  {...register("auth_number", { required: true })}
                />
              </FormField>
            </Col>
            <Col md={3}>
              <Controller
                name="model"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <FormField label="Modelo" error={errors.model}>
                    <ModelInput field={field} error={!!errors.model} type="PQRSC" />
                  </FormField>
                )}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={4}>
              <FormField label="# Radicado Queja" error={errors.claimNumber}>
                <input
                  className="input rounded-lg w-full"
                  {...register("claimNumber", { required: true })}
                />
              </FormField>
            </Col>

            <Col md={4}>
              <FormField label="Fecha y hora de vencimiento de Queja" error={errors.date_expiration}>
                <input
                  className={`input rounded-lg w-full ${isCalculable ? "bg-gray-100" : "bg-white"}`}
                  placeholder="Fecha y hora de vencimiento"
                  {...register("date_expiration", { required: true })}
                  type="datetime-local"
                />
              </FormField>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <FormField label="Medicamento" error={!productName && !!errors.medicineId}>
                <div className="flex items-center gap-2">
                  <input
                    className="input rounded-lg w-full"
                    onClick={() => setProductModal(true)}
                    placeholder="Medicamento"
                    readOnly
                    value={productName}
                  />
                  <span
                    role="button"
                    className="btn btn-primary rounded-lg"
                    onClick={() => setProductModal(true)}
                  >
                    <i className="bi bi-search"></i>
                  </span>
                </div>
              </FormField>
            </Col>
            <Col md={2}>
              <FormField label="Tipo de marca">
                <input
                  className="input rounded-lg w-full"
                  disabled
                  placeholder="Tipo de marca"
                  value={mark}
                />
              </FormField>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Row>
                <Col md={4}>
                  <FormField label="Cantidad" error={errors.quantity}>
                    <input
                      className="input rounded-lg w-full"
                      placeholder="Cantidad"
                      {...register("quantity", { required: true })}
                    />
                  </FormField>
                </Col>
                <Col md={4}>
                  <FormField label="Frecuencia" error={errors.frequency}>
                    <input
                      className="input rounded-lg w-full"
                      disabled
                      value="Mensual"
                      placeholder="Frequencia"
                      {...register("frequency")}
                    />
                  </FormField>
                </Col>
                <Col md={4}>
                  <FormField label="Tiempo" error={errors.frequency_time}>
                    <input
                      className="input rounded-lg w-full"
                      type="number"
                      min={30}
                      max={360}
                      step={30}
                      placeholder="Tiempo"
                      {...register("frequency_time", { required: true })}
                    />
                  </FormField>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Controller
                name="city"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <FormField label="Ciudad" error={errors.city}>
                    <CityInput field={field} error={!!errors.city} showLabels={false} showError={false} />
                  </FormField>
                )}
              />
            </Col>
            <Col md={2}>
              <Controller
                name="programed_date"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <FormField label="Fecha de programación" error={errors.programed_date}>
                    <input
                      className="input rounded-lg w-full"
                      type="date"
                      {...field}
                      min={addBusinessDays(DateTime.now(), 1).toFormat("yyyy-MM-dd")}
                    />
                  </FormField>
                )}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={4}>
              <Controller
                name="ips"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <FormField label="IPS" error={errors.ips}>
                    <IPSInput field={field} error={!!errors.ips} />
                  </FormField>
                )}
              />
            </Col>
            <Col md={4}>
              <FormField label="Dirección IPS / Domicilio" error={errors.address}>
                <input
                  className="input rounded-lg w-full"
                  placeholder="Dirección IPS / Domicilio"
                  {...register("address", { required: true })}
                />
              </FormField>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={4}>
              <FormField label="Nombre funcionario / Destinatario" error={errors.name}>
                <input
                  className="input rounded-lg w-full"
                  {...register("name", { required: true })}
                  placeholder="Nombre funcionario / Destinatario"
                />
              </FormField>
            </Col>
            <Col md={4}>
              <FormField label="Teléfono funcionario / Teléfono destinatario" error={errors.phone}>
                <input
                  className="input rounded-lg w-full"
                  placeholder="Teléfono funcionario / Teléfono destinatario"
                  {...register("phone", { required: true })}
                />
              </FormField>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={4}>
              <FormField label="Número de pedido" error={errors.requested_number}>
                <input
                  className="input rounded-lg w-full"
                  type="number"
                  placeholder="Número de pedido"
                  {...register("requested_number", { required: true })}
                />
              </FormField>
            </Col>
            <Col md={4}>
              <FormField label="Fórmula" error={errors.file} errorMessage="Debe seleccionar un archivo válido">
                <input
                  className="file-input rounded-lg w-full"
                  type="file"
                  {...register("file", { required: true })}
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </FormField>
            </Col>
          </Row>

          <div className="mt-6 flex justify-center">
            <button className="btn btn-primary font-bold" type="submit">
              <i className="bi bi-floppy-fill" /> Registrar solicitud
            </button>
          </div>

          <button
            className="btn rounded-3xl btn-lg btn-primary fixed bottom-5 right-5 z-50 group"
            type="submit"
          >
            <i className="bi bi-floppy-fill" />
            <span className="group-hover:visible invisible text-sm font-medium group-hover:w-32 w-0 transition-all ml-2">
              Registrar solicitud
            </span>
          </button>
        </form>
      </CardBody>
    </Card>
  );
};
