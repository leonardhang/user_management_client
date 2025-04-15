import axios, {AxiosInstance } from 'axios';
import { refreshToken } from '../services/authService';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    if(config.url?.startsWith("auth/")) {
        return config;
    }
    const tokenJson = localStorage.getItem('token');
    if (tokenJson) {
        const tokenData = JSON.parse(tokenJson);
        if(tokenData.value) {
            if(tokenData.expiresAt > Date.now()) {
                config.headers.Authorization = `Bearer ${tokenData.value}`;
                return config;
            }else {
                refreshToken().then((newToken) => {
                    if (newToken) {
                      config.headers.Authorization = `Bearer ${newToken}`;
                    }
                    return config;
                });
            }
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
