import { Button, Group, Space, Stack, Title, Text, Box } from '@mantine/core';
import { BiEdit } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { useNavigate } from 'react-router-dom';
import { PAGE_SIZE } from 'src/shared/constants';
import { Author, Genre, Publisher, Source, Document } from './Document';

type DocDetailProps = {
  data: Document;
  isLoading: boolean;
  overviewLink: string;
};

function DocDetails({ data, isLoading, overviewLink }: DocDetailProps) {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(data?.pages?.slice(0, PAGE_SIZE));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !data) navigate(overviewLink);
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(data?.pages?.slice(from, to));
  }, [data, navigate, page, isLoading, overviewLink]);

  return (
    <>
      {isLoading && <Text>Загрузка...</Text>}
      {!isLoading && data && (
        <>
          <Group justify="space-between">
            <Stack gap="xs">
              <Title>{data.title}</Title>
              <Box
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {data.authors && data.authors.length > 0 && (
                  <Box>
                    {data.authors.length > 1 ? 'Авторы:' : 'Автор:'}
                    &nbsp;
                    {data.authors.map((author: Author) => (
                      <Text key={author.name}>{author.name};</Text>
                    ))}
                  </Box>
                )}
                {data.genres && data.genres.length > 0 && (
                  <Box>
                    {data.genres.length > 1 ? 'Жанры:' : 'Жанр:'}
                    &nbsp;
                    {data.genres.map((genre: Genre) => (
                      <Text key={genre.name}>{genre.name};</Text>
                    ))}
                  </Box>
                )}
                {data.publisher && data.publisher.length > 0 && (
                  <Box>
                    {data.publisher.length > 1
                      ? 'Издательства:'
                      : 'Издательство:'}
                    &nbsp;
                    {data.publisher.map((publisher: Publisher) => (
                      <Text key={publisher.name}>{publisher.name};</Text>
                    ))}
                  </Box>
                )}
                {data.sources && data.sources.length > 0 && (
                  <Box>
                    {data.sources.length > 1 ? 'Источники:' : 'Источник:'}
                    &nbsp;
                    {data.sources.map((source: Source) => (
                      <Text key={source.name}>{source.name};</Text>
                    ))}
                  </Box>
                )}
                <Box>Время публикации: {data.publication_date}</Box>
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
              totalRecords={data.pages?.length}
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

export default DocDetails;
