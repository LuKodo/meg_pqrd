import type { Product } from "./Product.ts";

export interface Balance {
  cost_center: string;
  id?: number;
  point: string;
  price: number;
  product: Product;
  quantity: number;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
}
