import { ControllerRenderProps } from "react-hook-form";
import { iRequestOne } from "@/entities";
import { FC, useEffect, useState } from "react";
import { iModel } from "@/entities";
import { httpClient } from "@/http";
import { ModelRepository } from "@/features/shared/repositories";

interface SearchInputProps {
  field: ControllerRenderProps<iRequestOne, "model">;
  error?: boolean;
  type?: string;
}

const modelRepository = new ModelRepository(httpClient);
const getModels = async () => {
  return await modelRepository.getAll();
};

export const ModelInput: FC<SearchInputProps> = ({ field }) => {
  const [models, setModels] = useState<iModel[] | null>(null);

  useEffect(() => {
    try {
      getModels().then((res) => {
        setModels(
          res.filter((model: iModel) => model.categoriesId === 3)
        );
      });
    } catch (error: any) {
      console.error(error);
    }
  }, []);

  if (!models) {
    return <div className="placeholder-glow form-control bg-gray-100 rounded-lg">Cargando modelos...</div>;
  }

  return (
    <select
      name="model"
      id="model"
      className="select rounded-lg w-full"
      onChange={(e) => field.onChange(e.target.value)}
      value={field.value as any}
    >
      <option value="" disabled>
        Seleccione un modelo
      </option>
      {models.map((model: iModel) => (
        <option key={model.id} value={model as any}>
          {model.name}
        </option>
      ))}
    </select>
  );
};