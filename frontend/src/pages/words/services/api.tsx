import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const getUniqueWords = async () => {
	const response = await axios.get(`http://127.0.0.1:8000/api/unique-words`);
	console.log('getUniqueWords response', response);
	return response;
};
