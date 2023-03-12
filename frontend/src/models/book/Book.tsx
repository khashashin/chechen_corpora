import { Document } from '../base';
import Page from '../page';

export interface Book extends Document {
	isbn: string;
	pages?: Page[];
}

export interface BookCreateResponse {
	[page: string]: string;
}

export interface JSONFile {
	[page: string]: string;
}
