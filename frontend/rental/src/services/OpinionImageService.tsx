import axios from "axios";
import Constants from "../constants/Constants";
import { IOpinionImages } from "../models/ProductModel";
import { axiosConfigUploadPhoto, getToken } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/opinion-image/";

export const addOpinionImage = async (
  id: number,
  image: File
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

export const deleteOpinionImage = async (imageId: number): Promise<void> => {
  await axios.delete(baseUrl + `disable-visibility-object`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    data: {
      id: imageId,
    },
  });
};
