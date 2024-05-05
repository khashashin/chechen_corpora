import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getArticle } from './API';
import { Document } from '../components/Document';
import DocDetails from '../components/DocDetails';

function ArticleDetailsPage() {
  const { articleId } = useParams();
  const { data: article, isLoading } = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => getArticle(articleId as string),
  });

  return (
    <DocDetails
      data={article as Document}
      isLoading={isLoading}
      overviewLink="/admin/articles"
    />
  );
}

export default ArticleDetailsPage;
