import { Box, Button, Group, Space, Stack, Text, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Author, Genre, Publisher, Source } from '../../models/base';
import { PAGE_SIZE } from '../../shared/constants';

function ArticleDetailsPage() {
	const article = useMemo<any>(() => ({}), []);

	const [page, setPage] = useState(1);
	const [records, setRecords] = useState(article?.pages?.slice(0, PAGE_SIZE));
	const navigate = useNavigate();

	useEffect(() => {
		if (!article) navigate('/articles');
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE;
		setRecords(article?.pages?.slice(from, to));
	}, [article, navigate, page]);

	return (
		<>
			{!article && <Text>Загрузка...</Text>}
			{article && (
				<>
					<Group justify='apart'>
						<Stack gap='xs'>
							<Title>{article.title}</Title>
							<Box
								style={{
									display: 'flex',
									flexWrap: 'wrap',
								}}>
								{article.authors && article.authors.length > 0 && (
									<Box>
										{article.authors.length > 1 ? 'Авторы:' : 'Автор:'}
										&nbsp;
										{article.authors.map((author: Author) => (
											<Text key={author.name}>{author.name};</Text>
										))}
									</Box>
								)}
								{article.genres && article.genres.length > 0 && (
									<Box>
										{article.genres.length > 1 ? 'Жанры:' : 'Жанр:'}
										&nbsp;
										{article.genres.map((genre: Genre) => (
											<Text key={genre.name}>{genre.name};</Text>
										))}
									</Box>
								)}
								{article.publisher && article.publisher.length > 0 && (
									<Box>
										{article.publisher.length > 1 ? 'Издательства:' : 'Издательство:'}
										&nbsp;
										{article.publisher.map((publisher: Publisher) => (
											<Text key={publisher.name}>{publisher.name};</Text>
										))}
									</Box>
								)}
								{article.sources && article.sources.length > 0 && (
									<Box>
										{article.sources.length > 1 ? 'Источники:' : 'Источник:'}
										&nbsp;
										{article.sources.map((source: Source) => (
											<Text key={source.name}>{source.name};</Text>
										))}
									</Box>
								)}
								<Box>Время публикации: {article.publication_date}</Box>
							</Box>
						</Stack>
						<Button
							onClick={() => {
								console.log('edit');
							}}
							rightSection={<BiEdit />}>
							Редактировать
						</Button>
					</Group>
					<Space h='md' />
					<Box style={{ height: 600 }}>
						<DataTable
							records={records}
							columns={[
								{
									accessor: 'id',
									title: '',
									render: ({ id }) => <Text style={{ height: '501px' }}>{id as string}</Text>,
									titleStyle: {
										display: 'none',
									},
								},
							]}
							withTableBorder
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
