export interface IOrder {
  id: number;
  statusId: number;
  statusCode: string;
  productID: number;
  productName: string;
  userID: number;
  userName: string;
  isFinished: boolean;
  dateStart: string;
  dateEnd: string | null;
  price: number | null;
}

export interface IAddOrder {
  productID: number;
  userID: number;
}