import axios from 'src/api/axios';
import { Book, BookCreateResponse, JSONFile } from './Book';

const { VITE_API_ENDPOINT } = import.meta.env;

export const getBooks = async (): Promise<Book[]> => {
  const response = await axios(`${VITE_API_ENDPOINT}/books/`);
  return response.data;
};

export const getBook = async (id: string): Promise<Book> => {
  const response = await axios(`${VITE_API_ENDPOINT}/books/${id}/`);
  return response.data;
};

export const uploadJson = async (
  data: JSONFile,
): Promise<BookCreateResponse> => {
  const response = await axios(`${VITE_API_ENDPOINT}/upload/json/`, {
    method: 'POST',
    data: { file: data },
  });

  return response.data;
};

export const createBook = async (data: Book): Promise<Book> => {
  const response = await axios(`${VITE_API_ENDPOINT}/books/`, {
    method: 'POST',
    data,
  });

  return response.data;
};
