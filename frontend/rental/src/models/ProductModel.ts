import { ICondition } from "./ConditionModel";
import { IProductImage } from "./ProductImageModel";
import { IProductType } from "./ProductTypeModel";
import { IQuality } from "./QualityModel";
import { ISubCategory } from "./SubCategoryModel";

export interface IProduct {
  id: number;
  businessKey: string;
  code: string;
  description: string;
  price: number;
  hero: string;
  createDate: Date;
  visible: boolean;
  productType: IProductType;
  images: IProductImage[];
  subcategory: ISubCategory;
  condition: ICondition;
  quality: IQuality;
  opinions: IProductOpinion[];
}

export interface IProductOpinion {
  id: number;
  value: number;
  description: string;
  createDate: string;
  visible: boolean;
  opinionImages: IOpinionImages[];
  user: IOpinionUser;
}

export interface IAddProduct {
  productTypeID: number;
  subCategoryID: number;
  conditionID: number;
  qualityID: number;
  code: string;
  description: string;
  price: number;
  hero: string;
  productImages: IAddProductProductImages[];
}

export interface IAddProductProductImages {
  productID: number;
  fileUrl: string;
}

export interface IOpinionImages {
  id: number;
  code: string;
  visible: boolean;
}

export interface IOpinionUser {
  firstName: string;
  lastName: string;
  email: string;
}