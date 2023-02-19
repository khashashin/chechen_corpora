import { Button, Group, Space, Stack, Title, Text, Table, Box } from '@mantine/core';
import { useMatch, MakeGenerics, useNavigate } from '@tanstack/react-location';
import { BiEdit } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { PAGE_SIZE } from './services/constants';
import { Book } from '../../models/books/BookDto';

export type LocationGenerics = MakeGenerics<{
	LoaderData: {
		book: Book;
	};
}>;

function BookDetailsPage() {
	const {
		data: { book },
	} = useMatch<LocationGenerics>();

	const [page, setPage] = useState(1);
	const [records, setRecords] = useState(book?.pages?.slice(0, PAGE_SIZE));
	const navigate = useNavigate();

	useEffect(() => {
		if (!book) navigate({ to: '/books' });
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE;
		setRecords(book?.pages?.slice(from, to));
	}, [book, navigate, page]);

	return (
		<>
			<Group position='apart'>
				<Stack spacing='xs'>
					<Title>{book?.title}</Title>
					<Table withBorder withColumnBorders>
						<tbody>
							<tr>
								<td>Автор: {book?.author}</td>
								<td>Время публикации: {book?.publication_date}</td>
							</tr>
						</tbody>
					</Table>
				</Stack>
				<Button
					onClick={() => {
						console.log('edit');
					}}
					rightIcon={<BiEdit />}>
					Редактировать
				</Button>
			</Group>
			<Space h='md' />
			<Box sx={{ height: 600 }}>
				<DataTable
					records={records}
					columns={[
						{
							accessor: 'id',
							title: '',
							render: (record) => <Text sx={{ height: '501px' }}>{record.text}</Text>,
							titleStyle: {
								display: 'none',
							},
						},
					]}
					withBorder
					borderRadius='sm'
					withColumnBorders
					totalRecords={book?.pages?.length}
					recordsPerPage={PAGE_SIZE}
					page={page}
					onPageChange={(p) => setPage(p)}
					horizontalSpacing='xl'
					verticalSpacing='xl'
				/>
			</Box>
		</>
	);
}

export default BookDetailsPage;
