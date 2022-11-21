import axios from "axios";
import Constants from "../constants/Constants";
import { IAddQuality, IQuality } from "../models/QualityModel";
import { axiosConfig } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/quality/";

export const getQualities = async (): Promise<IQuality[]> => {
  const response = await axios.get(baseUrl + "get-all", axiosConfig);
  return response.data;
};

export const getQualityById = async (qualityId: number): Promise<IQuality> => {
  const response = await axios.get(baseUrl + `find/${qualityId}`, axiosConfig);
  return response.data;
};

export const addQuality = async (data: IAddQuality): Promise<IQuality> => {
  const response = await axios.post(baseUrl + "add", data, axiosConfig);
  return response.data;
};

export const updateQuality = async (data: IQuality): Promise<IQuality> => {
  const response = await axios.put(baseUrl + "update", data, axiosConfig);
  return response.data;
};

export const disableVisibilityQuality = async (
  qualityId: number
): Promise<void> => {
  const response = await axios.put(
    baseUrl + "disable-visibility",
    { id: qualityId },
    axiosConfig
  );
  return response.data;
};
