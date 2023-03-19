import axios from '../../../shared/ApiService';

const { VITE_API_ENDPOINT } = import.meta.env;

// eslint-disable-next-line import/prefer-default-export
export const getSearchResult = async (query: string) => {
	const response = await axios.get(`${VITE_API_ENDPOINT}/search?q=${query}`);
	console.log('getSearchResult response', response);
	return response;
};

export const getRandomWords = async () => {
	const response = await axios.get(`${VITE_API_ENDPOINT}/random-words/`);
	console.log('getRandomWords response', response);
	return response;
};
