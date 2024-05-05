export interface Publisher {
	id?: string;
	name: string;
}

export interface Source {
	id?: string;
	name: string;
}

export interface Author {
	id?: string;
	name: string;
}

export interface Genre {
	id?: string;
	name: string;
}

export interface Page {
	id?: string;
	number: number;
	text: string;
	book?: string;
}

export interface Document {
	id?: string;
	title: string;
	summary?: string;
	publication_date?: string;
	genres?: Genre[];
	authors?: Author[];
	sources?: Source[];
	publisher?: Publisher[];
  pages?: Page[];

	// method which each document should have to get additional meta information
	getMeta: () => JSX.Element;
}