import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://novel-project-ntj8t.ampt.app', // Temel URL burada tanımlanıyor
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
