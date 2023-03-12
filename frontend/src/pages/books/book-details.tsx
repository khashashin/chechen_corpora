import { Button, Group, Space, Stack, Title, Text, Box, createStyles } from '@mantine/core';
import { useMatch, MakeGenerics, useNavigate } from '@tanstack/react-location';
import { BiEdit } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { PAGE_SIZE } from './services/constants';
import { Book } from '../../models/book';
import { Author } from '../../models/base';

const useStyles = createStyles((theme) => ({
	meta: {
		display: 'flex',
		padding: '4px 8px',
		border: '1px solid',
		borderColor: theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[4],
	},
}));

export type LocationGenerics = MakeGenerics<{
	LoaderData: {
		book: Book;
	};
}>;

function BookDetailsPage() {
	const {
		data: { book },
	} = useMatch<LocationGenerics>();
	const { classes } = useStyles();

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
			{!book && <Text>Загрузка...</Text>}
			{book && (
				<>
					<Group position='apart'>
						<Stack spacing='xs'>
							<Title>{book.title}</Title>
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
								}}>
								{book.authors && book.authors.length > 0 && (
									<Box className={classes.meta}>
										{book.authors.length > 1 ? 'Авторы:' : 'Автор:'}
										&nbsp;
										{book.authors.map((author: Author) => (
											<Text key={author.name}>{author.name};</Text>
										))}
									</Box>
								)}
								{book.genres && book.genres.length > 0 && (
									<Box className={classes.meta}>
										{book.genres.length > 1 ? 'Жанры:' : 'Жанр:'}
										&nbsp;
										{book.genres.map((genre) => (
											<Text key={genre.name}>{genre.name};</Text>
										))}
									</Box>
								)}
								{book.publishers && book.publishers.length > 0 && (
									<Box className={classes.meta}>
										{book.publishers.length > 1 ? 'Издательства:' : 'Издательство:'}
										&nbsp;
										{book.publishers.map((publisher) => (
											<Text key={publisher.name}>{publisher.name};</Text>
										))}
									</Box>
								)}
								{book.sources && book.sources.length > 0 && (
									<Box className={classes.meta}>
										{book.sources.length > 1 ? 'Источники:' : 'Источник:'}
										&nbsp;
										{book.sources.map((source) => (
											<Text key={source.name}>{source.name};</Text>
										))}
									</Box>
								)}
								<Box className={classes.meta}>Время публикации: {book.publication_date}</Box>
							</Box>
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
							totalRecords={book.pages?.length}
							recordsPerPage={PAGE_SIZE}
							page={page}
							onPageChange={(p) => setPage(p)}
							horizontalSpacing='xl'
							verticalSpacing='xl'
						/>
					</Box>
				</>
			)}
		</>
	);
}

export default BookDetailsPage;
