import axios from 'axios';
import { getEnvVar } from '@/utils/env';

const api = axios.create({
  baseURL: getEnvVar('VITE_API_URL'),
  timeout: 6000,
    headers: {
    'Content-Type': 'application/json',
  },
});

export default api;