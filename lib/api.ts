import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios'

const apiInstance: AxiosInstance = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_BASE_URL as string | undefined) || 'https://api.roboimpex.com',
  headers: { 'Content-Type': 'application/json' },
})

apiInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError<any>) => {
    console.error('API Error:', (error.response?.data as any) || error.message)
    return Promise.reject(error)
  },
)

export default apiInstance


