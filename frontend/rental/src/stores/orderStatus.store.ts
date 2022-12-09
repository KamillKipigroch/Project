import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";
import { IAddOrderStatus, IOrderStatus } from "../models/OrderStatusModel";
import {
  addOrderStatus,
  disableVisibilityOrderStatus,
  getOrderStatusById,
  getOrderStatuses,
  updateOrderStatus,
} from "../services/OrderStatusService";

export class OrderStatusStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable orderStatuses: IOrderStatus[] = [];
  @observable loading: boolean = false;

  @computed get allOrderStatuses() {
    return this.orderStatuses;
  }

  @computed get visibleOrderStatuses() {
    return this.orderStatuses.filter((x) => x.visible === true);
  }

  @computed get notVisibleOrderStatuses() {
    return this.orderStatuses.filter((x) => x.visible === false);
  }

  @action
  fetchOrderStatuses = async () => {
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
  getOrderStatusById = async (orderStatusId: number) => {
    try {
      this.loading = true;
      const response = await getOrderStatusById(orderStatusId);
      this.loading = false;
      return response;
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
      this.orderStatuses = [...this.orderStatuses, response];

      toast.success("Successfully added new order status!")

      this.loading = false;
      return response;
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
      const foundIndex = this.orderStatuses.findIndex(
        (x) => x.id === response.id
      );
      this.orderStatuses[foundIndex] = response;

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  disableVisibility = async (orderStatusId: number) => {
    try {
      this.loading = true;
      await disableVisibilityOrderStatus(orderStatusId);
      runInAction(async () => {
        await this.fetchOrderStatuses();

        toast.success("Successfully disabled visibility of a order status!");

        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };
}
