export interface PageRead {
	id: number;
	number: number;
	text: string;
	book: number;
}

export interface Article {
	id: number;
	title: string;
	summary: string;
	value: string;
	publication_date: string;
	author: number;
	pages?: PageRead[];
}
