import axios from "axios";
import Constants from "../constants/Constants";
import { IAddProductType, IProductType } from "../models/ProductTypeModel";
import { axiosConfig } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/product-type/";

export const getProductTypes = async (): Promise<IProductType[]> => {
  const response = await axios.get(baseUrl + "get-all");
  return response.data;
}

export const getProductTypeById = async (orderStatusId: number): Promise<IProductType> => {
  const response = await axios.get(baseUrl + `find/${orderStatusId}`);
  return response.data;
}

export const addProductType = async (data: IAddProductType): Promise<IProductType> => {
  const response = await axios.post(baseUrl + "add", data, axiosConfig);
  return response.data; 
}

export const updateProductType = async (data: IProductType): Promise<IProductType> => {
  const response = await axios.put(baseUrl + "update", data, axiosConfig);
  return response.data; 
}

export const disableVisibilityProductType = async (orderStatusId: number): Promise<void> => {
  const response = await axios.put(baseUrl + "disable-visibility", { id: orderStatusId }, axiosConfig);
  return response.data;
}