import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { IAddOrder, IOrder } from "../models/OrderModel";
import { addOrder, getOrders, updateOrderStatus } from "../services/OrderService";
import { authStore } from "./auth.store";
import i18n from "i18next";

export class OrderStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable orders: IOrder[] = [];
  @observable loading: boolean = false;

  @computed get allOrders() {
    return this.orders;
  }

  @computed get ordersCount() {
    return this.orders.length;
  }

  @action
  fetchOrders = async () => {
    try {
      this.loading = true;
      const response = await getOrders();
      runInAction(() => {
        this.orders = response;
        this.loading = false;
      });
      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  addOrder = async (orderData: IAddOrder) => {
    try {
      this.loading = true;

      const response = await addOrder(orderData);
      toast.success(i18n.t("orderAddToast"));

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  updateOrderStatus = async (orderData: IOrder) => {
    try {
      this.loading = true;

      const response = await updateOrderStatus(orderData);
      await this.fetchOrders();

      toast.success(i18n.t("orderUpdateToast"));

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  getUserOrders = async () => {
    await this.fetchOrders();
    this.orders = this.orders.filter(x => x.userName === authStore.name)
  }
}
