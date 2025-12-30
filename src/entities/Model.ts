import { type iCategoryModel } from "@/entities/CategoryModel";

export interface iModel {
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  name?: string;
  email?: string;
  promise_days?: number;
  categories?: iCategoryModel;
  categoriesId?: number;
}
