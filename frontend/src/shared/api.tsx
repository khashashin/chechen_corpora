import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const getStats = async () => {
	const response = await axios.get(`http://127.0.0.1:8000/api/stats`);
	console.log('getStats response', response);
	return response;
};
