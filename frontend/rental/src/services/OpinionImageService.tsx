import axios from "axios";
import Constants from "../constants/Constants";
import { IOpinionImages } from "../models/ProductModel";
import { axiosConfigUploadPhoto } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/opinion-image/";

export const addOpinionImage = async (
  id: number, image: File
): Promise<IOpinionImages> => {
  const formData = new FormData();

  formData.append("opinionId", id.toString());
  formData.append("image", image);

  const response = await axios.post(
    baseUrl + "add-object",
    formData,
    axiosConfigUploadPhoto
  );
  return response.data;
};
