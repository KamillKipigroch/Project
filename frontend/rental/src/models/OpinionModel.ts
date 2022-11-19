export interface IOpinion {
  id: number;
  userName: string;
  productName: string;
  value: string;
  description: string;
  opinionImages: IOpinionOpinionImage[];
  productID: number;
  userID: number;
}

export interface IOpinionOpinionImage {
  opinionId: number;
  fileUrl: string;
}

export interface IUpdateOpinion {
  id: number;
  value: number;
  description: string;
  opinionImages: IOpinionOpinionImage[];
  productID: number;
  userID: number;
}