import axios from 'axios';
import { Client, Account } from 'appwrite';
import { Book, BookCreate, BookResponse } from '../../../models/books/BookDto';
import { JSONFile } from '../models';

const client = new Client()
	.setEndpoint('https://fb.gibbit.ch/v1') // Your API Endpoint
	.setProject('ce-lang-comm-corpora');

const account = new Account(client);

export const getBooks = async (): Promise<Book[]> => {
	await account.createEmailSession('test_email@test.com', 'KBcbrpAn827@#kspuDkDBoux7E3Zs7dct@');
	const { jwt } = await account.createJWT();
	const { $id } = await account.get();

	const response = await axios('http://127.0.0.1:8000/api/books/', {
		headers: {
			'Content-Type': 'application/json',
			'User-ID': `${$id}`,
			Authorization: `Bearer ${jwt}`,
		},
	});
	return response.data;
};

export const getBook = async (id: string): Promise<Book> => {
	await account.createEmailSession('test_email2@test.com', 'KmSburod!TozHxhwEChyK29b*UPZ@^*SU8');
	const { jwt } = await account.createJWT();
	const { $id } = await account.get();

	const response = await axios(`http://127.0.0.1:8000/api/books/${id}/`, {
		headers: {
			'Content-Type': 'application/json',
			'User-ID': `${$id}`,
			Authorization: `Bearer ${jwt}`,
		},
	});
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
