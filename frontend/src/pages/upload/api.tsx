import axios from 'axios';

const { VITE_API_ENDPOINT } = import.meta.env;

// eslint-disable-next-line import/prefer-default-export
export const uploadPdf = async (file: any): Promise<any> => {
	const formData = new FormData();
	formData.append('file', file);
	const response = await axios(`${VITE_API_ENDPOINT}/upload/pdf/`, {
		method: 'post',
		data: formData,
	});
	console.log(response);
	return response.data;
};
