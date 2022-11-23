export interface IOpinion {
  id: number;
  productName: string;
  value: number;
  description: string;
  opinionImages: IOpinionOpinionImage[];
  productID: number;
  userEmail: string;
}

export interface IOpinionOpinionImage {
  opinionId: number;
  fileUrl: string;
}

export interface IUpdateOpinion {
  id: number;
  userEmail: string;
  value: number;
  description: string;
  opinionImages: IOpinionOpinionImage[];
  productID: number;
}

export interface IAddOpinion {
  emailUser: string;
  value: number;
  description: string;
  opinionImages: IOpinionOpinionImage[];
  productID: number;
}

export interface IAddOpinionResponse {
  id: number;
  value: number;
  description: number;
  createDate: number;
  visible: boolean;
}