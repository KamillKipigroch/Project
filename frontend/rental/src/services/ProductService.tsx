import axios from "axios";
import Constants from "../constants/Constants";
import { IAddProduct, IProduct } from "../models/ProductModel";
import { axiosConfig } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/product/";

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await axios.get(baseUrl + "get-all");
  return response.data;
};

export const getProductById = async (productId: number): Promise<IProduct> => {
  const response = await axios.get(baseUrl + `find/${productId}`);
  return response.data;
};

export const addProduct = async (productData: IAddProduct): Promise<IProduct> => {
  const response = await axios.post(baseUrl + "add", productData, axiosConfig);
  return response.data;
};

export const updateProduct = async (productData: IProduct): Promise<IProduct> => {
  const response = await axios.put(baseUrl + "update", productData, axiosConfig);
  return response.data;
};

export const disableVisibilityProduct = async (productId: number): Promise<void> => {
  const response = await axios.put(baseUrl + "disable-visibility", { id: productId }, axiosConfig);
  return response.data;
}