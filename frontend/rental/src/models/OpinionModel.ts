import { IOpinionImages, IOpinionUser } from "./ProductModel";

export interface IOpinion {
  id: number;
  value: number;
  description: string;
  createDate: string;
  visible: boolean;
  product: IOpinionProduct;
  opinionImages: IOpinionImages[];
  user: IOpinionUser;
}

export interface IUpdateOpinion {
  id: number;
  emailUser: string;
  value: number;
  description: string;
  productID: number;
  images: FileList;
}

export interface IAddOpinion {
  id: number;
  emailUser: string;
  value: number;
  description: string;
  productID: number;
  images: FileList;
}

export interface IAddOpinionResponse {
  id: number;
  value: number;
  description: number;
  createDate: number;
  visible: boolean;
}

export interface IAddOpinionImage {
  opinionId: number;
  images: FileList;
}

export interface IOpinionProduct {
  id: number;
}