import axios from 'axios';

const { VITE_LS_SESSION_KEY } = import.meta.env;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
	const jwt = localStorage.getItem(`${VITE_LS_SESSION_KEY}-jwt`);
	const userId = localStorage.getItem(`${VITE_LS_SESSION_KEY}-user-id`);

	if (jwt && userId) {
		config.headers.Authorization = `Bearer ${jwt}`; // eslint-disable-line no-param-reassign
		config.headers['User-ID'] = userId; // eslint-disable-line no-param-reassign
	}

	return config;
});

export default axiosInstance;
