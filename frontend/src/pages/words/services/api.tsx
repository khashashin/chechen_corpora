import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const getUniqueWords = async () => {
	return axios.get(`http://127.0.0.1:8000/api/unique-words`);
};
