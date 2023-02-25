import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const getSearchResult = async (query: string) => {
	const response = await axios.get(`http://127.0.0.1:8000/api/search?q=${query}`);
	console.log('getSearchResult response', response);
	return response;
};
