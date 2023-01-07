import axios from "axios";
import Constants from "../constants/Constants";
import { IAddProductImage, IProductImage } from "../models/ProductImageModel";
import { axiosConfigUploadPhoto, getToken } from "./AxiosConfiguration";

const baseUrl = Constants.API_URL + "/api/product-image/";

export const addProductImage = async (
  body: IAddProductImage
): Promise<IProductImage> => {
  const formData = new FormData();

  formData.append("productId", body.productId.toString());
  formData.append("image", body.photo[0]);

  const response = await axios.post(
    baseUrl + "add",
    formData,
    axiosConfigUploadPhoto
  );
  return response.data;
};

export const deleteProductImage = async (imageId: number): Promise<void> => {
  await axios.delete(baseUrl + `disable-visibility`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    data: {
      id: imageId,
    },
  });
};
