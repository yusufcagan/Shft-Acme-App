import {useAuthStore} from '../store/authStore';
import apiClient from './apiClient';

export type Job = {
  companyName: string;
  id: string;
  description: string;
  name: string;
  createdAt: string;
  location: string;
  salary: number;
  keywords: string[];
};
type Meta = {
  total: number;
  page: number;
  perPage: number;
};
export type JobResponse = {
  data: Job[];
  meta: Meta;
};

export const jobList = async (
  page: number,
  perPage: number,
  searchField?: string,
  searchQuery?: string,
): Promise<JobResponse> => {
  const token = useAuthStore.getState().accessToken;
  const response = await apiClient.get('/api/jobs', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      perPage,
      search: {
        field: searchField,
        query: searchQuery,
      },
    },
  });
  return response.data;
};

export const jobById = async (id: string | undefined): Promise<Job> => {
  const token = useAuthStore.getState().accessToken;
  const response = await apiClient.get(`/api/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const applyJobById = async (id: string | undefined): Promise<Job> => {
  const token = useAuthStore.getState().accessToken;
  const response = await apiClient.post(`/api/jobs/${id}/apply`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const withdeawJobById = async (id: string | undefined): Promise<Job> => {
  const token = useAuthStore.getState().accessToken;
  const response = await apiClient.post(`/api/jobs/${id}/withdraw`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
