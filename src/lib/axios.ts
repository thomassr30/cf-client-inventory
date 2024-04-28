import { useAuthStore } from "@/store/auth.store";
import axios, { AxiosRequestHeaders } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().access_token;
  config.headers = {
    Authorization: `Bearer ${token}`,
  } as AxiosRequestHeaders;

  return config;
});

export default api;
