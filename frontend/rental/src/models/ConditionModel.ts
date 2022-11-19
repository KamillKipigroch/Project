export interface ICondition {
  id: number;
  price: number;
  code: string;
  visible: boolean;
}

export interface IAddCondition {
  price: number;
  code: string;
}