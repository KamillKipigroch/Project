import axios from "axios";
import Constants from "../constants/Constants";
import {
  IAddOpinion,
  IAddOpinionResponse,
  IOpinion,
} from "../models/OpinionModel";
import { axiosConfig, getToken } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/opinion/";

export const getOpinions = async (): Promise<IOpinion[]> => {
  const response = await axios.get(baseUrl + "get-all");
  return response.data;
};

export const addOpinion = async (
  data: IAddOpinion
): Promise<IAddOpinionResponse> => {
  const response = await axios.post(baseUrl + "add-object", data, axiosConfig);
  return response.data;
};

export const updateOpinion = async (data: IAddOpinion): Promise<IOpinion> => {
  const response = await axios.put(
    baseUrl + "update-object",
    data,
    axiosConfig
  );
  return response.data;
};

export const disableVisibilityOpinion = async (
  opinionId: number
): Promise<void> => {
  const response = await axios.delete(baseUrl + "disable-visibility-object", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    data: {
      id: opinionId,
    },
  });
  return response.data;
};
