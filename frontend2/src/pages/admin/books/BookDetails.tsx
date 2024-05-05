import { Button, Group, Space, Stack, Title, Text, Box } from '@mantine/core';
import { BiEdit } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { useParams, useNavigate } from 'react-router-dom';
import { PAGE_SIZE } from 'src/shared/constants';
import { useQuery } from '@tanstack/react-query';
import { Author, Genre, Publisher, Source } from './Book';
import { getBook } from './API';

function BookDetailsPage() {
  const { bookId } = useParams();
  const { data: book, isLoading } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBook(bookId as string),
  });

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(book?.pages?.slice(0, PAGE_SIZE));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !book) navigate('/admin/books');
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(book?.pages?.slice(from, to));
  }, [book, navigate, page, isLoading]);

  return (
    <>
      {isLoading && <Text>Загрузка...</Text>}
      {!isLoading && book && (
        <>
          <Group justify="space-between">
            <Stack gap="xs">
              <Title>{book.title}</Title>
              <Box
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {book.authors && book.authors.length > 0 && (
                  <Box>
                    {book.authors.length > 1 ? 'Авторы:' : 'Автор:'}
                    &nbsp;
                    {book.authors.map((author: Author) => (
                      <Text key={author.name}>{author.name};</Text>
                    ))}
                  </Box>
                )}
                {book.genres && book.genres.length > 0 && (
                  <Box>
                    {book.genres.length > 1 ? 'Жанры:' : 'Жанр:'}
                    &nbsp;
                    {book.genres.map((genre: Genre) => (
                      <Text key={genre.name}>{genre.name};</Text>
                    ))}
                  </Box>
                )}
                {book.publisher && book.publisher.length > 0 && (
                  <Box>
                    {book.publisher.length > 1
                      ? 'Издательства:'
                      : 'Издательство:'}
                    &nbsp;
                    {book.publisher.map((publisher: Publisher) => (
                      <Text key={publisher.name}>{publisher.name};</Text>
                    ))}
                  </Box>
                )}
                {book.sources && book.sources.length > 0 && (
                  <Box>
                    {book.sources.length > 1 ? 'Источники:' : 'Источник:'}
                    &nbsp;
                    {book.sources.map((source: Source) => (
                      <Text key={source.name}>{source.name};</Text>
                    ))}
                  </Box>
                )}
                <Box>Время публикации: {book.publication_date}</Box>
              </Box>
            </Stack>
            <Button
              onClick={() => {
                console.log('edit');
              }}
              disabled
              rightSection={<BiEdit />}
            >
              Редактировать
            </Button>
          </Group>
          <Space h="md" />
          <Box style={{ height: 600 }}>
            <DataTable
              records={records}
              columns={[
                {
                  accessor: 'id',
                  render: ({ text }) => <Text>{text as string}</Text>,
                  titleStyle: { display: 'none' },
                },
              ]}
              withTableBorder
              withRowBorders={false}
              withColumnBorders={false}
              borderRadius="sm"
              totalRecords={book.pages?.length}
              recordsPerPage={PAGE_SIZE}
              page={page}
              onPageChange={(p) => setPage(p)}
              horizontalSpacing="xl"
              verticalSpacing="xl"
            />
          </Box>
        </>
      )}
    </>
  );
}

export default BookDetailsPage;
