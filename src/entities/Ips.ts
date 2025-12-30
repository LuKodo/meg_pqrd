import { type iCity } from "./Location.ts";

export interface iDelegate {
  id: number;
  name: string;
  phone: string;
  mail: string;
}

export interface iIPS {
  id?: number;
  nit?: string;
  name?: string;
  city?: iCity;
  delegate?: iDelegate;
  createdAt?: Date;
  updatedAt?: Date;
}
