import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useAuthStore} from '../store/authStore';

const apiClient = axios.create({
  baseURL: 'https://novel-project-ntj8t.ampt.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async config => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const {data} = await axios.post(
            'https://novel-project-ntj8t.ampt.app/api/refresh',
            {refreshToken},
          );

          await AsyncStorage.setItem('accessToken', data.accessToken);
          await AsyncStorage.setItem('refreshToken', data.refreshToken);

          const setTokens = useAuthStore.getState().setTokens;
          setTokens(data.accessToken, data.refreshToken);

          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${data.accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error('Refresh token expired or invalid:', refreshError);

          const clearTokens = useAuthStore(state => state.clearTokens);
          clearTokens();

          return Promise.reject(refreshError);
        }
      } else {
        const clearTokens = useAuthStore(state => state.clearTokens);
        clearTokens();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
