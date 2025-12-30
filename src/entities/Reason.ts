import { iStatus } from "./Status.ts";

export interface iReason {
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  description?: string;
  status?: iStatus;
}
