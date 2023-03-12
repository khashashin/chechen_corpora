import Author from './Author';
import Genre from './Genre';
import Publisher from './Publisher';
import Source from './Source';

interface Document {
	id?: string;
	title: string;
	summary?: string;
	publication_date?: string;
	genres?: Genre[];
	authors?: Author[];
	sources?: Source[];
	publishers?: Publisher[];
}

export default Document;
