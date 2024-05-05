import { useQuery } from '@tanstack/react-query';

import { getBooks } from './API';
import DocOverview from '../components/DocOverview';
import { Document } from '../components/Document';

function BooksPage() {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    initialData: [],
  });

  return (
    <DocOverview
      data={books as Document[]}
      isLoading={isLoading}
      error={error}
      addLink="/admin/books/add"
    />
  );
}

export default BooksPage;
