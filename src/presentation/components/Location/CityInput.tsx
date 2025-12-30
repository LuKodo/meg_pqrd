import { ControllerRenderProps } from "react-hook-form";
import { FC, Suspense, use, useState } from "react";
import { iRequestOne, iDepartment, iCity } from "@/entities";
import { LocationRepository } from "@/features/shared/repositories";
import { Typeahead } from "@/features/shared/components/Typeahead";
import { Col, Row } from "@/features/shared/components/Grid";

type RegionProps = {
  field: ControllerRenderProps<iRequestOne, "city">;
  error?: boolean;
  showLabels?: boolean;
  showError?: boolean;
};

interface ErrorMessageProps {
  show?: boolean;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="flex justify-start">
      <small className="badge badge-danger text-white font-medium bg-red-500">
        Campo requerido
      </small>
    </div>
  );
};

const locationRepository = new LocationRepository();
const departmentsPromise = locationRepository.getAllDep();
const citiesPromiseCache = new Map<number, Promise<any>>();

const getCitiesPromise = (departmentId: number) => {
  if (departmentId === 0) {
    return Promise.resolve([]);
  }

  if (!citiesPromiseCache.has(departmentId)) {
    citiesPromiseCache.set(departmentId, locationRepository.getAllCitiesByDep(departmentId));
  }

  return citiesPromiseCache.get(departmentId)!;
};

const DepartmentSelect = ({
  value,
  onChange,
  error,
  showError
}: {
  value: number;
  onChange: (id: number) => void;
  error?: boolean;
  showError?: boolean;
}) => {
  const departments = use(departmentsPromise);

  return (
    <>
      <select
        className="select rounded-lg w-full"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value="0">Seleccionar</option>
        {departments.map((dep: iDepartment) => (
          <option key={dep.id} value={dep.id}>
            {dep.name}
          </option>
        ))}
      </select>
      {showError && <ErrorMessage show={error} />}
    </>
  );
};

const CityTypeahead = ({
  departmentId,
  field,
  error,
  showError
}: {
  departmentId: number;
  field: ControllerRenderProps<iRequestOne, "city">;
  error?: boolean;
  showError?: boolean;
}) => {
  const cities = use(getCitiesPromise(departmentId));

  return (
    <>
      <Suspense
        fallback={
          <div className="form-control bg-gray-100 rounded-lg placeholder-glow">
            Cargando ciudades...
          </div>
        }
      >
        <Typeahead
          disabled={departmentId === 0}
          options={cities.map((city: iCity) => ({
            label: city.name,
            value: city.id,
          }))}
          placeholder="Ciudad"
          onSelect={field.onChange}
        />
        {showError && <ErrorMessage show={error} />}
      </Suspense>
    </>
  );
};

const CityInputContent: FC<RegionProps> = ({ field, error, showLabels = true, showError = true }) => {
  const [departmentId, setDepartmentId] = useState(0);

  return (
    <Row>
      <Col md={6}>
        {showLabels && <label className="label">Departamento</label>}
        <Suspense
          fallback={
            <div className="form-control bg-gray-100 rounded-lg placeholder-glow">
              Cargando departamentos...
            </div>
          }
        >
          <DepartmentSelect
            value={departmentId}
            onChange={setDepartmentId}
            error={error}
            showError={showError}
          />
        </Suspense>
      </Col>
      <Col md={6}>
        {showLabels && <label className="label">Ciudad</label>}
        <Suspense
          fallback={
            <div className="form-control bg-gray-100 rounded-lg placeholder-glow">
              Cargando ciudades...
            </div>
          }
        >
          <CityTypeahead
            departmentId={departmentId}
            field={field}
            error={error}
            showError={showError}
          />
        </Suspense>
      </Col>
    </Row >
  );
};

export const CityInput: FC<RegionProps> = (props) => {
  return (
    <Suspense
      fallback={
        <div className="form-control bg-gray-100 rounded-lg placeholder-glow">Cargando...</div>
      }
    >
      <CityInputContent {...props} />
    </Suspense>
  );
};
export default CityInput;
