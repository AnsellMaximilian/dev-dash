import axios from "axios";
import { API_BASE_URL } from "../const/common";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
      config.headers["api-key"] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
