import Article from '../../../models/article';

type ArticleMetaInfoProps = {
	opened: boolean;
	onClose: (values: Article) => void;
	articleMeta: Article;
};

function ArticleMetaInfo(props: ArticleMetaInfoProps) {}
