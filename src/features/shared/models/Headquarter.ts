import { iCity } from "./Location.ts";

export interface iHeadquarter {
  id?: number;
  city?: iCity;
  name?: string;
  user?: string;
  zip?: number;
}
