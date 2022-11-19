export interface IOrderStatus {
  id: number;
  code: string;
  visible: boolean;
  level: number;
}

export interface IAddOrderStatus {
  code: string;
  level: number;
}