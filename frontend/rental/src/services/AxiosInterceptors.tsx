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
      toast.error(data);
    }

    if (data === "" && status === 401) {
      toast.error("Invalid credentials");
    }
    
    if (status === 500) {
      toast.error("Internal server error");
    }

    throw error.response;
  });
};
