import axios from "axios";
import { toast } from "react-toastify";

export const AxiosInterceptors = () => {
  axios.interceptors.response.use(undefined, (error) => {
    if (error.message === "Network Error" && !error.response) {
      toast.error("Network error");
      return;
    }

    const { status, data } = error.response;

    if (data) {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.error(data);
      }
    } else if (data === "" && status === 401) {
      toast.error("Invalid credentials");
    } else if (status === 500) {
      toast.error("Internal server error");
    }

    throw error.response;
  });
};
