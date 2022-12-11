import axios from "axios";
import Constants from "../constants/Constants";
import { IAddOrder, IOrder } from "../models/OrderModel";
import { axiosConfig } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/order/";

export const getOrders = async (): Promise<IOrder[]> => {
  const response = await axios.get(baseUrl + "get-all-objects", axiosConfig);
  return response.data;
};

export const addOrder = async (data: IAddOrder): Promise<any> => {
  debugger
  const response = await axios.post(baseUrl + "add-object", data, axiosConfig);
  return response.data;
};

export const updateOrderStatus = async (data: IOrder): Promise<any> => {
  const response = await axios.put(baseUrl + "update-status-object", data, axiosConfig);
  return response.data;
};

export const disableVisibilityOrder = async (orderId: number): Promise<void> => {
  const response = await axios.put(baseUrl + "disable-visibility-object", { id: orderId }, axiosConfig);
  return response.data;
};