import axios from "axios";
import Constants from "../constants/Constants";
import { IAddOrderStatus, IOrderStatus } from "../models/OrderStatusModel";
import { axiosConfig } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/order-status/";

export const getOrderStatuses = async (): Promise<IOrderStatus[]> => {
  const response = await axios.get(baseUrl + "get-all-object", axiosConfig);
  return response.data;
}

export const getOrderStatusById = async (orderStatusId: number): Promise<IOrderStatus> => {
  const response = await axios.get(baseUrl + `find/${orderStatusId}`);
  return response.data;
}

export const addOrderStatus = async (data: IAddOrderStatus): Promise<IOrderStatus> => {
  const response = await axios.post(baseUrl + "add", data, axiosConfig);
  return response.data; 
}

export const updateOrderStatus = async (data: IOrderStatus): Promise<IOrderStatus> => {
  const response = await axios.put(baseUrl + "update", data, axiosConfig);
  return response.data; 
}

export const disableVisibilityOrderStatus = async (orderStatusId: number): Promise<void> => {
  const response = await axios.put(baseUrl + "disable-visibility", { id: orderStatusId }, axiosConfig);
  return response.data;
}