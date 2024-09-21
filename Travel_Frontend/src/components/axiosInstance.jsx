import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  
  baseURL: 'http://127.0.0.1:8000/api/', // Replace with your API base URL
  
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensure credentials (cookies) are sent with requests
});

// Automatically include the Authorization header in each request
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token'); // Retrieve the token from cookies
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;