import { IOpinionImages, IOpinionUser } from "./ProductModel";

export interface IOpinion {
  id: number;
  value: number;
  description: string;
  createDate: string;
  visible: boolean;
  opinionImages: IOpinionImages[];
  user: IOpinionUser;
}

export interface IUpdateOpinion {
  id: number;
  userEmail: string;
  value: number;
  description: string;
  opinionImages: IOpinionImages[];
  productID: number;
}

export interface IAddOpinion {
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