import { Document } from '../base';
import Page from '../page';

interface Article extends Document {
	volume: string;
	pages?: Page[];
}

export default Article;
