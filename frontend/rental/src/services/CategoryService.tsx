import axios from "axios";
import Constants from "../constants/Constants";
import { IAddCategory, ICategory } from "../models/CategoryModel";
import { axiosConfig } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/category/";

export const getCategories = async (): Promise<ICategory[]> => {
  const response = await axios.get(baseUrl + "get-all");
  return response.data;
}

export const addCategory = async (data: IAddCategory): Promise<ICategory> => {
  const response = await axios.post(baseUrl + "add", data, axiosConfig);
  return response.data;
}

export const updateCategory = async (data: ICategory): Promise<ICategory> => {
  const response = await axios.put(baseUrl + "update", data, axiosConfig);
  return response.data;
}