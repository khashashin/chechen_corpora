import axios from '../../../shared/ApiService';
import { Book, BookCreate, BookResponse } from '../../../models/books/BookDto';
import { JSONFile } from '../models';

const { VITE_API_ENDPOINT } = import.meta.env;

export const getBooks = async (): Promise<Book[]> => {
	const response = await axios(`${VITE_API_ENDPOINT}/books/`);
	return response.data;
};

export const getBook = async (id: string): Promise<Book> => {
	const response = await axios(`${VITE_API_ENDPOINT}/books/${id}/`);
	return response.data;
};

export const uploadJson = async (data: JSONFile): Promise<BookResponse> => {
	const response = await axios(`${VITE_API_ENDPOINT}/upload/json/`, {
		method: 'POST',
		data: { file: data },
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return response.data;
};

export const createBook = async (data: BookCreate): Promise<any> => {
	const response = await axios(`${VITE_API_ENDPOINT}/books/`, {
		method: 'POST',
		data,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return response.data;
};
