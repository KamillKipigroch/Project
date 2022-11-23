import axios from "axios";
import Constants from "../constants/Constants";
import { IAddCondition, ICondition } from "../models/ConditionModel";
import { axiosConfig } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/condition/";

export const getConditions = async (): Promise<ICondition[]> => {
  const response = await axios.get(baseUrl + "get-all");
  return response.data;
}

export const getConditionById = async (conditionId: number): Promise<ICondition> => {
  const response = await axios.get(baseUrl + `find/${conditionId}`);
  return response.data;
}

export const addCondition = async (data: IAddCondition): Promise<ICondition> => {
  const response = await axios.post(baseUrl + "add", data, axiosConfig);
  return response.data;
}

export const updateCondition = async (data: ICondition): Promise<ICondition> => {
  const response = await axios.put(baseUrl + "update", data, axiosConfig);
  return response.data;
}

export const disableVisibilityCondition = async (conditionId: number): Promise<void> => {
  const response = await axios.put(baseUrl + "disable-visibility", { id: conditionId }, axiosConfig);
  return response.data;
}