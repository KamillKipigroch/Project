export interface IOrder {
  id: number;
  statusId: number;
  statusCode: string;
  productID: number;
  productName: string;
  userID: number;
  userName: string;
}

export interface IUpdateOrder {
  id: number;
  statusId: number;
}