import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Response interceptor to format error responses consistently
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Return custom error message from backend if exists
    return Promise.reject(error.response?.data?.msg || error.message || 'Something went wrong');
  }
);

export default api;
