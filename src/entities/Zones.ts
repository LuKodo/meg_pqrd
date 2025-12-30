import { type iCity } from "./Location";

export interface Zone {
    id: number;
    origin: iCity;
    createdAt: string;
    updatedAt: string;
}