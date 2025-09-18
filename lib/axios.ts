import axios, { type AxiosInstance, type AxiosError } from "axios"

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authToken")
      if (authToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let message = "Network error occurred"

    if (error.response?.data) {
      const errorData = error.response.data as any
      message = errorData.message || errorData.error || message
    } else if (error.message) {
      message = error.message
    }

    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken")
      }
    }

    return Promise.reject(new Error(message))
  },
)

export default api
