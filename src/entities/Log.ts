import { type iRequest } from "./Request.ts";
import { type iStatus } from "./Status.ts";
import { type iUser } from "./User.ts";

export interface iLog {
  id: number;
  observations: string;
  prev_status: iStatus;
  new_status: iStatus;
  user: iUser;
  createdAt?: Date;
  updatedAt?: Date;
  request: iRequest;
}
