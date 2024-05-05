import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { Book } from './Book';
import { Document } from '../components/Document';
import { createBook } from './API';
import DocAdd from '../components/DocAdd';

function BooksAdd() {
  const [bookMeta, setBookMeta] = useState<Document>();
  const navigate = useNavigate();

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

  const handleBookSave = () => {
    if (!bookMeta.title) {
      setPopoverOpened(true);
      return;
    }

    // setIsSaved(true);

    // remove id property from pages
    const pagesWithoutId = pages.map((p) => {
      const { id, ...rest } = p;
      return rest;
    });

    const date = bookMeta.publication_date
      ? new Date(bookMeta.publication_date)
      : null;

    const book = {
      title: bookMeta.title,
      summary: bookMeta.summary,
      isbn: bookMeta.isbn,
      publication_date: date
        ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        : date,
      sources: bookMeta.sources,
      pages: pagesWithoutId,
    } as Book;

    mutation.mutate(book);
  };

  return (
    <DocAdd
      handleSave={handleBookSave}
      metaState={bookMeta}
      setMetaState={setBookMeta}
    />
  );
}

export default BooksAdd;
