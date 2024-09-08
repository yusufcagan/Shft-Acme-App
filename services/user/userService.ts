import {useAuthStore} from '../../store/authStore';
import apiClient from '../apiClient';

export type Address = {
  details: string;
  city: string;
  country: string;
};

export type UserResponse = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  profileImage: string;
  dateOfBirth: string;
  address: Address;
  appliedJobs: string[];
};

export const user = async (): Promise<UserResponse> => {
  const token = useAuthStore.getState().accessToken;
  const response = await apiClient.get('/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
