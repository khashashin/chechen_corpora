import axios from './ApiService';

const { VITE_API_ENDPOINT } = import.meta.env;

// eslint-disable-next-line import/prefer-default-export
export const getStats = async () => {
	return axios.get(`${VITE_API_ENDPOINT}/stats/`);
};
