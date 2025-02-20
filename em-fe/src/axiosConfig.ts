import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAxios = () => {
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('Token');
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('Token');
        navigate("/"); 
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
