import axios from 'axios';

const { VITE_LS_SESSION_KEY } = import.meta.env;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
	const newConfig = {
		...config,
	};
	const jwt = localStorage.getItem(`${VITE_LS_SESSION_KEY}-jwt`);
	const userId = localStorage.getItem(`${VITE_LS_SESSION_KEY}-user-id`);

	if (jwt && userId) {
		newConfig.headers.Authorization = `Bearer ${jwt}`;
		newConfig.headers['User-ID'] = userId;
	}

	newConfig.headers['Content-Type'] = 'application/json';

	return newConfig;
});

export default axiosInstance;
