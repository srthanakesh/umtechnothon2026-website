import axios from "axios";
import Cookies from "js-cookie";
import envConfig from "../config/envConfig";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: envConfig.serverBaseApi,
});

// Add a request interceptor to attach the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from cookies instead of localStorage
    const token = Cookies.get('accessToken');

    if (token) {
      try {
        config.headers.Authorization = `${token}`;
      } catch (error) {
        console.error("Error setting Authorization header:", error);
      }
    } else {
      console.warn("No token found in cookies");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;