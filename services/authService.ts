import {useAuthStore} from '../store/authStore';
import apiClient from './apiClient';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/api/login', {email, password});

  const {accessToken, refreshToken} = response.data;

  const setTokens = useAuthStore.getState().setTokens;
  setTokens(accessToken, refreshToken);

  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await apiClient.post('/api/register', {email, password});
  return response.data;
};
