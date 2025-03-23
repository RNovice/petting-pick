import axios from "axios";
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

const api = axios.create({
  baseURL: `${VITE_API_BASE}/api/${VITE_API_PATH}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.noApiPath) {
    config.baseURL = `${VITE_API_BASE}/`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
