import axios from "axios";
import Constants from "../constants/Constants";
import { IToken, IUserLoginForm } from "../models/AuthModel";

const baseUrl = Constants.API_URL + "/auth/";

export const login = async (loginData: IUserLoginForm): Promise<IToken> => {
  const response = await axios.post(baseUrl + "login", loginData);
  return response.data;
}