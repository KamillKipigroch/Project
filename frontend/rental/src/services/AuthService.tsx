import axios from "axios";
import Constants from "../constants/Constants";
import { IToken, IUserLoginForm, IUserRegistrationForm } from "../models/AuthModel";

const loginUrl = Constants.API_URL + "/auth/";
const registrationUrl = Constants.API_URL + "/api/v1/";

export const login = async (loginData: IUserLoginForm): Promise<IToken> => {
  const response = await axios.post(loginUrl + "login", loginData);
  return response.data;
}

export const registration = async (registrationData: IUserRegistrationForm): Promise<IToken> => {
  const response = await axios.post(registrationUrl + "registration", registrationData);
  return response.data;
}