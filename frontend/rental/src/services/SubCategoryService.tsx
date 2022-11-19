import axios from "axios";
import Constants from "../constants/Constants";
import { IAddSubCategory, ISubCategory } from "../models/SubCategoryModel";
import { axiosConfig } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/sub-category/";

export const getSubCategories = async (): Promise<ISubCategory[]> => {
  const response = await axios.get(baseUrl + "get-all", axiosConfig);
  return response.data;
};

export const getSubCategoryById = async (subCategoryId: number): Promise<ISubCategory> => {
  const response = await axios.get(baseUrl + subCategoryId, axiosConfig);
  return response.data;
};

export const addSubCategory = async (data: IAddSubCategory): Promise<ISubCategory> => {
  const response = await axios.post(baseUrl + "add", data, axiosConfig);
  return response.data; 
};

export const updateSubCategory = async (data: ISubCategory): Promise<ISubCategory> => {
  const response = await axios.put(baseUrl + "update", data, axiosConfig);
  return response.data; 
};

export const disableVisibilitySubCategory = async (qualityId: number): Promise<void> => {
  const response = await axios.put(baseUrl + "disable-visibility", { id: qualityId }, axiosConfig);
  return response.data;
};