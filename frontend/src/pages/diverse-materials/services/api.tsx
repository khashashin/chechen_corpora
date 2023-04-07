import axios from '../../../shared/ApiService';

const { VITE_API_ENDPOINT } = import.meta.env;

export const getOther = async (id: string): Promise<any> => {
	const response = await axios(`${VITE_API_ENDPOINT}/diverses/${id}/`);
	return response.data;
};

export const getOthers = async (): Promise<any[]> => {
	const response = await axios(`${VITE_API_ENDPOINT}/diverses/`);
	return response.data;
};

export const createOther = async (data: any): Promise<any> => {
	const response = await axios(`${VITE_API_ENDPOINT}/diverses/`, {
		method: 'POST',
		data,
	});

	return response.data;
};
