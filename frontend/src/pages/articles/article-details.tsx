import { Box, Button, createStyles, Group, Space, Stack, Text, Title } from '@mantine/core';
import { MakeGenerics, useMatch, useNavigate } from '@tanstack/react-location';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import Article from '../../models/article';
import { Author, Genre, Publisher, Source } from '../../models/base';
import { PAGE_SIZE } from '../../shared/constants';

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
		article: Article;
	};
}>;

function ArticleDetailsPage() {
	const {
		data: { article },
	} = useMatch<LocationGenerics>();
	const { classes } = useStyles();

	const [page, setPage] = useState(1);
	const [records, setRecords] = useState(article?.pages?.slice(0, PAGE_SIZE));
	const navigate = useNavigate();

	useEffect(() => {
		if (!article) navigate({ to: '/articles' });
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE;
		setRecords(article?.pages?.slice(from, to));
	}, [article, navigate, page]);

	return (
		<>
			{!article && <Text>Загрузка...</Text>}
			{article && (
				<>
					<Group position='apart'>
						<Stack spacing='xs'>
							<Title>{article.title}</Title>
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
								}}>
								{article.authors && article.authors.length > 0 && (
									<Box className={classes.meta}>
										{article.authors.length > 1 ? 'Авторы:' : 'Автор:'}
										&nbsp;
										{article.authors.map((author: Author) => (
											<Text key={author.name}>{author.name};</Text>
										))}
									</Box>
								)}
								{article.genres && article.genres.length > 0 && (
									<Box className={classes.meta}>
										{article.genres.length > 1 ? 'Жанры:' : 'Жанр:'}
										&nbsp;
										{article.genres.map((genre: Genre) => (
											<Text key={genre.name}>{genre.name};</Text>
										))}
									</Box>
								)}
								{article.publishers && article.publishers.length > 0 && (
									<Box className={classes.meta}>
										{article.publishers.length > 1 ? 'Издательства:' : 'Издательство:'}
										&nbsp;
										{article.publishers.map((publisher: Publisher) => (
											<Text key={publisher.name}>{publisher.name};</Text>
										))}
									</Box>
								)}
								{article.sources && article.sources.length > 0 && (
									<Box className={classes.meta}>
										{article.sources.length > 1 ? 'Источники:' : 'Источник:'}
										&nbsp;
										{article.sources.map((source: Source) => (
											<Text key={source.name}>{source.name};</Text>
										))}
									</Box>
								)}
								<Box className={classes.meta}>Время публикации: {article.publication_date}</Box>
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
							totalRecords={article.pages?.length}
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

export default ArticleDetailsPage;
