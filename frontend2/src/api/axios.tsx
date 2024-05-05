import axios from 'axios';

const PUBLIC_ROUTES = ['/', '/search', '/auth/login', '/auth/register'];

const { VITE_API_ENDPOINT } = import.meta.env;

const axe = axios.create({
  baseURL: VITE_API_ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
});

const jwt = localStorage.getItem('jwt');

axe.interceptors.request.use(
  async (config) => {
    const newConfig = { ...config };
    if (jwt) {
      newConfig.headers.Authorization = `Bearer ${jwt}`;
    }

    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axe.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('jwt');
      // if the path is not public, redirect to login
      if (!PUBLIC_ROUTES.includes(window.location.pathname)) {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  },
);

export default axe;
