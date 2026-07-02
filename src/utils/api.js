import axios from "axios";
import { getLang } from "./lang";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = getLang();
  return config;
});

export default api;