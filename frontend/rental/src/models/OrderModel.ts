export interface IOrder {
  id: number;
  statusId: number;
  statusCode: string;
  productID: number;
  productName: string;
  userID: number;
  userName: string;
}

export interface IAddOrder {
  productID: number;
  userID: number;
}