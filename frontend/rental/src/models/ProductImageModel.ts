export interface IProductImage {
  id: number;
  code: string;
  visible: boolean;
}

export interface IAddProductImage {
  productId: number;
  photo: File;
}