export interface PageRead {
	id: number;
	number: number;
	text: string;
	book: number;
}

export interface PageCreate {
	id?: string;
	number: number;
	text: string;
}

export interface Book {
	id: number;
	title: string;
	summary: string;
	isbn: string;
	publication_date: string;
	author: number;
	pages?: PageRead[];
}

export interface BookCreate {
	title: string;
	summary: string;
	isbn: string;
	publication_date: string;
	author: number;
	pages: PageCreate[];
}

export interface BookResponse {
	[page: string]: string;
}
