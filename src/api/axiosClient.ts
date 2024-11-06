import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import useStore from "../store/useStore";
import { isTokenExpired } from "../utils/jwt";

// Instancia para el servicio de seguridad
const axiosSecurity = axios.create({
  baseURL: import.meta.env.VITE_SECURITY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Instancia para el servicio de lógica de negocio
const axiosBusiness = axios.create({
  baseURL: import.meta.env.VITE_BUSINESS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de autenticación con tipado de TypeScript
const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  if (token && !isTokenExpired(token)) {
    config.headers = config.headers || {}; // Asegúrate de que headers no sea undefined
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    useStore.getState().resetUser();
  }

  return config;
};

axiosSecurity.interceptors.request.use(authInterceptor);
axiosBusiness.interceptors.request.use(authInterceptor);

// Interceptor de respuesta con tipado de TypeScript
const errorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

axiosSecurity.interceptors.response.use(
  (response) => response,
  errorInterceptor,
);
axiosBusiness.interceptors.response.use(
  (response) => response,
  errorInterceptor,
);

export { axiosBusiness, axiosSecurity };
