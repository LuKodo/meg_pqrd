import { type iModule } from "./Module.ts";

export interface role_module_role {
  id: number;
  module: iModule;
  active: boolean;
}
