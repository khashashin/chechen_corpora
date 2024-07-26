import { useMemo, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '@mantine/core';
import { Book } from './Book';
import { Document } from '../components/Document';
import { createBook } from './API';
import DocAdd from '../components/DocAdd';

type BookMetaProps = {
  isbn: string;
  setBookMeta: (values: any) => void;
};

function BookMeta({ isbn, setBookMeta }: BookMetaProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookMeta((prevMeta: Book) => {
      const newState = { ...prevMeta, isbn: event.target.value };
      return newState;
    });
  };

  return (
    <TextInput
      label="ISBN"
      placeholder="Enter the ISBN number"
      value={isbn}
      onChange={handleInputChange}
    />
  );
}

function BooksAdd() {
  const navigate = useNavigate();

  const [bookMeta, setBookMeta] = useState<Book | undefined>();

  const metaComponent = useMemo(() => {
    if (bookMeta) {
      return <BookMeta isbn={bookMeta.isbn} setBookMeta={setBookMeta} />;
    }

    return null;
  }, [bookMeta, setBookMeta]);

  const onSaveSuccess = () => {
    navigate('/admin/books');
    notifications.show({
      title: 'Успешное сохранение',
      message: 'Материал успешно сохранен',
    });
  };

  const onSaveError = () => {
    notifications.show({
      title: 'Ошибка сохранения',
      message: 'Не удалось сохранить материал',
    });
  };

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: onSaveSuccess,
    onError: onSaveError,
  });

  const handleBookSave = (newMeta: Book) => {
    const date = newMeta.publication_date
      ? new Date(newMeta.publication_date)
      : null;

    const book = {
      title: newMeta.title,
      summary: newMeta.summary,
      isbn: newMeta.isbn,
      publication_date: date
        ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        : date,
      sources: newMeta.sources,
      pages: pagesWithoutId,
    } as Book;

    mutation.mutate(book);
  };

  return (
    <DocAdd
      handleOnSave={handleBookSave}
      metaState={bookMeta as Document}
      setMetaState={setBookMeta as (values: Document) => void}
      getMetaComponent={() => metaComponent}
    />
  );
}

export default BooksAdd;
