import { Document } from '../base';
import Page from '../page';

interface DiverseMaterial extends Document {
	pages?: Page[];
}

export default DiverseMaterial;
