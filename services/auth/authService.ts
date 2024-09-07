import apiClient from '../apiClient';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/api/login', {email, password});
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await apiClient.post('/register', {email, password});
  return response.data;
};
