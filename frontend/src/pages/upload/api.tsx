import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const uploadPdf = async (file: any): Promise<any> => {
	const formData = new FormData();
	formData.append('file', file);
	const response = await axios('http://127.0.0.1:8000/api/upload/pdf/', {
		method: 'post',
		data: formData,
	});
	console.log(response);
	return response.data;
};
