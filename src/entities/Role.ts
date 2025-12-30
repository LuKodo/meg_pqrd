import type { role_module_role } from "./RoleModule.ts";

export interface iRole {
  id?: number;
  name?: string;
  role_module_role?: role_module_role[];
}
