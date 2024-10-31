import axios from "axios";
import useStore from "../store/useStore";
import { isTokenExpired } from "../utils/jwt";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = useStore.getState().user.token;

  if (!!token && !isTokenExpired(token)) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    useStore.getState().resetUser();
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
