import { action, makeObservable, observable, runInAction } from "mobx";
import { IAddOrderStatus, IOrderStatus } from "../models/OrderStatusModel";
import { addOrderStatus, getOrderStatuses, updateOrderStatus } from "../services/OrderStatusService";

export class OrderStatusStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable orderStatuses: IOrderStatus[] = [];
  @observable loading: boolean = false;

  @action
  getOrderStatuses = async () => {
    try {
      this.loading = true;
      const response = await getOrderStatuses();
      runInAction(() => {
        this.orderStatuses = response;
        this.loading = false;
      });
      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  addOrderStatus = async (orderStatusData: IAddOrderStatus) => {
    try {
      this.loading = true;
      const response = await addOrderStatus(orderStatusData);
      runInAction(() => {
        this.orderStatuses = [...this.orderStatuses, response];
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  updateOrderStatus = async (orderStatusData: IOrderStatus) => {
    try {
      this.loading = true;
      const response = await updateOrderStatus(orderStatusData);
      runInAction(() => {
        const foundIndex = this.orderStatuses.findIndex(x => x.id === response.id);
        this.orderStatuses[foundIndex] = response;
        this.loading = false;
      })
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }
}
