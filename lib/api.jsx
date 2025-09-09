import axios from 'axios';

const apiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.roboimpex.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiInstance;