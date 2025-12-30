import { type iRequest, type iRequestView } from "./Request";
import { type iUser } from "./User";

export interface Observation {
    id: number;
    observation: string;
    userOrigin: string;
    userDestination: string;
    createdAt: string;
    updatedAt: string;
}

export interface ObservationManage {
    id: number;
    request: iRequestView;
    destination: Observation;
    managed: boolean;
    buyed: boolean;
    observation: string;
    saf_owner: iUser;
    createdAt: string;
    updatedAt: string;
}