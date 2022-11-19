import axios from "axios";
import Constants from "../constants/Constants";
import { IOpinion, IUpdateOpinion } from "../models/OpinionModel";
import { axiosConfig } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/opinion/";

export const getOpinions = async (): Promise<IOpinion[]> => {
  const response = await axios.get(baseUrl + "get-all");
  return response.data;
}

export const updateOpinion = async (data: IUpdateOpinion): Promise<IOpinion> => {
  const response = await axios.put(baseUrl + "update-object", data, axiosConfig);
  return response.data;
}