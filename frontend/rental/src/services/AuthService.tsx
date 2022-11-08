import axios from "axios";
import Constants from "../constants/Constants";
import { IToken, IUserLoginForm, IUserRegistrationForm } from "../models/AuthModel";

const baseUrl = Constants.API_URL + "/auth/";

export const login = async (loginData: IUserLoginForm): Promise<IToken> => {
  const response = await axios.post(baseUrl + "login", loginData);
  return response.data;
}

export const register = async (registrationData: IUserRegistrationForm): Promise<IToken> => {
  const response = await axios.post(baseUrl + "register", registrationData);
  return response.data;
}