import { type Balance } from "@/entities/Balance";

export interface iMedicine {
  id?: number;
  plu: string;
  code: string;
  barcode: string;
  description: string;
  balances?: Balance[];
}