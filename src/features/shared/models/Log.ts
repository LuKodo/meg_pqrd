import { iRequest } from "./Request.ts";
import { iStatus } from "./Status.ts";
import { iUser } from "./User.ts";

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
