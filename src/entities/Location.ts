import { iHeadquarter } from "@/entities/Headquarter";

export interface iDepartment {
    id?: number;
    code?: string;
    name?: string;
}

export interface iCity {
    id?: number;
    code?: string;
    name?: string;
    department?: iDepartment;
}

export interface iDestination {
    id?: number;
    name?: string;
    origin?: iHeadquarter;
    destination?: iHeadquarter;
}