import Article from '../../../models/article';
import axios from '../../../shared/ApiService';

const { VITE_API_ENDPOINT } = import.meta.env;

export const getArticles = async (): Promise<Article[]> => {
	const response = await axios(`${VITE_API_ENDPOINT}/articles/`);
	return response.data;
};

export const getArticle = async (id: string): Promise<Article> => {
	const response = await axios(`${VITE_API_ENDPOINT}/articles/${id}/`);
	return response.data;
};

export const createArticle = async (data: any): Promise<any> => {
	const response = await axios(`${VITE_API_ENDPOINT}/articles/`, {
		method: 'POST',
		data,
	});

	return response.data;
};
