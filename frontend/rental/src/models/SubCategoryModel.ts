import { ICategory } from "./CategoryModel";

export interface ISubCategory {
  id: number;
  category: ICategory;
  code: string;
  description: string;
  visible: boolean;
}

export interface IAddSubCategory {
  code: string;
  categoryID: number;
  description: string;
}