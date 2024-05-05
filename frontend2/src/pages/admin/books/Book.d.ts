import { Document } from '../components/Document';

export interface Book extends Document {
	isbn: string;
}

export interface BookCreateResponse {
	[page: string]: string;
}

export interface JSONFile {
	[page: string]: string;
}