import axios from 'axios';
import { Book, BookCreate, BookResponse } from '../../../models/books/BookDto';
import { JSONFile } from '../models';

export const getBooks = async (): Promise<Book[]> => {
	const response = await axios('http://127.0.0.1:8000/api/books/');
	return response.data;
};

export const getBook = async (id: string): Promise<Book> => {
	const response = await axios(`http://127.0.0.1:8000/api/books/${id}/`);
	return response.data;
};

export const uploadJson = async (data: JSONFile): Promise<BookResponse> => {
	const response = await axios(`http://127.0.0.1:8000/api/upload/json/`, {
		method: 'POST',
		data: { file: data },
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return response.data;
};

export const createBook = async (data: BookCreate): Promise<any> => {
	const response = await axios(`http://127.0.0.1:8000/api/books/`, {
		method: 'POST',
		data,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return response.data;
};
