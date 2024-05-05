import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBook } from './API';
import DocDetails from '../components/DocDetails';
import { Document } from '../components/Document';

function BookDetailsPage() {
  const { bookId } = useParams();
  const { data: book, isLoading } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBook(bookId as string),
  });

  return (
    <DocDetails
      data={book as Document}
      isLoading={isLoading}
      overviewLink="/admin/books"
    />
  );
}

export default BookDetailsPage;
