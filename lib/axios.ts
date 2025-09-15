import axios, { AxiosInstance, AxiosError } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.roboimpex.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
});

api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      error.message ||
      "Network error occurred";
    return Promise.reject(new Error(message));
  }
);

export default api;