import axios from "axios";
import Constants from "../constants/Constants";
import { IAddProductImage, IProductImage } from "../models/ProductImageModel";
import { axiosConfigUploadPhoto } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/product-image/";

export const addProductImage = async (body: IAddProductImage): Promise<IProductImage> => {
  const formData = new FormData();

  formData.append("productId", body.productId.toString());
  formData.append("photo", body.photo);

  const response = await axios.post(baseUrl + "add", formData, axiosConfigUploadPhoto);
  return response.data;
}