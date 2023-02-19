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
import { sortBy } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { FaPlus } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { useDebouncedValue } from '@mantine/hooks';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useNavigate } from '@tanstack/react-location';
import { useEffect, useState } from 'react';
import { getBooks } from './services/api';
import { Book } from '../../models/books/BookDto';

const PAGE_SIZES = [5, 20, 50];

function BooksPage() {
	const {
		data: books,
		isLoading,
		error,
	} = useQuery(['books'], () => getBooks(), {
		initialData: [],
	});
	const [query, setQuery] = useState('');
	const [debouncedQuery] = useDebouncedValue(query, 200);
	const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
	const [records, setRecords] = useState(sortBy(books.slice(0, pageSize), 'name'));
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
					!`${title}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
				);
			})
		);
	}, [debouncedQuery, books]);

	const handleReadClick = (id: number) => {
		navigate({
			to: `/admin/books/${id}`,
		});
		return undefined;
	};

	return (
		<>
			<Group position='apart'>
				<Stack spacing='xs'>
					<Title>Список книг</Title>
					<Text>Выберите книгу чтобы ознакомится с содержимом</Text>
				</Stack>
				<Button
					onClick={() => {
						navigate({
							to: '/admin/books/add',
						});
					}}
					rightIcon={<FaPlus />}>
					Добавить книгу
				</Button>
			</Group>
			<Space h='md' />
			<Paper shadow='xs' p='md'>
				<>
					{isLoading && <Text>Загрузка...</Text>}
					{error && <Text>Ошибка загрузки</Text>}
					{books && (
						<>
							<Grid align='center' mb='md'>
								<Grid.Col xs={8} sm={9}>
									<TextInput
										sx={{ flexBasis: '50%' }}
										placeholder='Поиск...'
										icon={<BiSearchAlt size={16} />}
										value={query}
										onChange={(e) => setQuery(e.currentTarget.value)}
									/>
								</Grid.Col>
							</Grid>
							<Box>
								<DataTable
									fetching={isLoading}
									loaderVariant='oval'
									shadow='md'
									borderRadius='sm'
									withBorder
									highlightOnHover
									minHeight={400}
									recordsPerPage={pageSize}
									recordsPerPageOptions={PAGE_SIZES}
									recordsPerPageLabel='Количество записей на странице'
									onRecordsPerPageChange={setPageSize}
									records={records}
									page={page}
									onPageChange={(p) => setPage(p)}
									columns={[
										{
											accessor: 'title',
											title: 'Заголовок',
											render: (book: Book) => <Text>{book.title}</Text>,
											sortable: true,
										},
										{
											accessor: 'publication.date',
											title: 'Дата публикации',
											render: (book: Book) => <Text>{book.publication_date}</Text>,
											sortable: true,
										},
										{
											accessor: 'details.link',
											title: 'Читать',
											render: (book: Book) => (
												<Button
													compact
													component='a'
													variant='outline'
													onClick={() => handleReadClick(book.id)}>
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
