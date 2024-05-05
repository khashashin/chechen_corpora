import {
  Group,
  Stack,
  Title,
  Text,
  Button,
  Space,
  Paper,
  Grid,
  TextInput,
  Box,
} from '@mantine/core';
import { sortBy } from 'lodash-es';
import { useQuery } from '@tanstack/react-query';
import { FaPlus } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { useDebouncedValue } from '@mantine/hooks';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBooks } from './API';

const PAGE_SIZES = [5, 20, 50];

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
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [records, setRecords] = useState(
    sortBy(books.slice(0, pageSize), 'title'),
  );
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'title',
    direction: 'asc',
  });
  const navigate = useNavigate();

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const data = sortBy(books, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus, books]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(books.slice(from, to));
  }, [page, pageSize, books]);

  useEffect(() => {
    setRecords(
      books.filter(({ title }) => {
        return !(
          debouncedQuery !== '' &&
          !`${title}`
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        );
      }),
    );
  }, [debouncedQuery, books]);

  return (
    <>
      <Group justify="space-between">
        <Stack gap="xs">
          <Title>Список книг</Title>
          <Text>Выберите книгу чтобы ознакомится с содержимом</Text>
        </Stack>
        <Button
          onClick={() => {
            navigate('/admin/books/add');
          }}
          rightSection={<FaPlus />}
        >
          Добавить книгу
        </Button>
      </Group>
      <Space h="md" />
      <Paper shadow="xs" p="md">
        <>
          {isLoading && <Text>Загрузка...</Text>}
          {error && <Text>Ошибка загрузки</Text>}
          {books && (
            <>
              <Grid align="center" mb="md">
                <Grid.Col span={{ xs: 8, sm: 9 }}>
                  <TextInput
                    style={{ flexBasis: '50%' }}
                    placeholder="Поиск..."
                    leftSection={<BiSearchAlt size={16} />}
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                  />
                </Grid.Col>
              </Grid>
              <Box>
                <DataTable
                  fetching={isLoading}
                  loaderType="oval"
                  shadow="md"
                  borderRadius="sm"
                  withTableBorder
                  highlightOnHover
                  minHeight={400}
                  recordsPerPage={pageSize}
                  recordsPerPageOptions={PAGE_SIZES}
                  recordsPerPageLabel="Количество записей на странице"
                  onRecordsPerPageChange={setPageSize}
                  records={records as any[]}
                  page={page}
                  onPageChange={(p) => setPage(p)}
                  columns={[
                    {
                      accessor: 'title',
                      title: 'Заголовок',
                      render: ({ title }) => <Text>{title as string}</Text>,
                      sortable: true,
                    },
                    {
                      accessor: 'publication.date',
                      title: 'Дата публикации',
                      render: ({ publication_date }) => (
                        <Text>{publication_date as string}</Text>
                      ),
                      sortable: true,
                    },
                    {
                      accessor: 'details.link',
                      title: 'Читать',
                      render: ({ id }) => (
                        <Button
                          component={Link}
                          size="compact-md"
                          variant="outline"
                          to={`/admin/books/${id}`}
                        >
                          Читать
                        </Button>
                      ),
                    },
                  ]}
                  totalRecords={books.length}
                  sortStatus={sortStatus}
                  onSortStatusChange={setSortStatus}
                />
              </Box>
            </>
          )}
        </>
      </Paper>
    </>
  );
}

export default BooksPage;
