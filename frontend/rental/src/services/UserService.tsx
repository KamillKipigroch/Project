import axios from "axios";
import Constants from "../constants/Constants";
import { IUser, IUserLock } from "../models/UserModel";
import { axiosConfig } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/user/";

export const getUsers = async (): Promise<IUser[]> => {
  const response = await axios.get(baseUrl + "get-all-users", axiosConfig);
  return response.data;
};

export const lockUser = async (data: IUserLock): Promise<IUser> => {
  const response = await axios.put(baseUrl + "lock-user", data, axiosConfig);
  return response.data;
}

export const unlockUser = async (data: IUserLock): Promise<IUser> => {
  const response = await axios.put(baseUrl + "unlock-user", data, axiosConfig);
  return response.data;
}