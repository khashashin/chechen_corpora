import { ArticleMeta } from '../models';

type ArticleMetaInfoProps = {
	opened: boolean;
	onClose: (values: ArticleMeta) => void;
	articleMeta: ArticleMeta;
};

function ArticleMetaInfo(props: ArticleMetaInfoProps) {}
