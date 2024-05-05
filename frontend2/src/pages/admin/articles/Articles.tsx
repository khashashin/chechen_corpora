import { useQuery } from '@tanstack/react-query';

import DocOverview from '../components/DocOverview';
import { Document } from '../components/Document';
import { getArticles } from './API';

function BooksPage() {
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
    initialData: [],
  });

  return (
    <DocOverview
      data={articles as Document[]}
      isLoading={isLoading}
      error={error}
      addLink="/admin/articles/add"
    />
  );
}

export default BooksPage;
