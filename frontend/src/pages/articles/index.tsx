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
import { useDebouncedValue } from '@mantine/hooks';
import { useNavigate } from '@tanstack/react-location';
import { useQuery } from '@tanstack/react-query';
import { sortBy } from 'lodash';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import Article from '../../models/article';
import { getArticles } from './services/api';

const PAGE_SIZES = [5, 20, 50];

function ArticlesPage() {
	const {
		data: articles,
		isLoading,
		error,
	} = useQuery(['articles'], () => getArticles(), {
		initialData: [],
	});
	const [query, setQuery] = useState('');
	const [debouncedQuery] = useDebouncedValue(query, 200);
	const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
	const [records, setRecords] = useState(sortBy(articles.slice(0, pageSize), 'title'));
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
		const data = sortBy(articles, sortStatus.columnAccessor);
		setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
	}, [sortStatus, articles]);

	useEffect(() => {
		const from = (page - 1) * pageSize;
		const to = from + pageSize;
		setRecords(articles.slice(from, to));
	}, [page, pageSize, articles]);

	useEffect(() => {
		setRecords(
			articles.filter(({ title }) => {
				return !(
					debouncedQuery !== '' &&
					!`${title}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
				);
			})
		);
	}, [debouncedQuery, articles]);

	const handleReadClick = (article: Article) => {
		const { id } = article;
		if (!id) return undefined;
		return navigate({
			to: `/admin/articles/${id}`,
		});
	};

	return (
		<>
			<Group position='apart'>
				<Stack spacing='xs'>
					<Title>???????????? ????????????</Title>
					<Text>???????????????? ???????????? ?????????? ?????????????????????? ?? ????????????????????</Text>
				</Stack>
				<Button
					onClick={() => {
						navigate({
							to: '/admin/articles/add',
						});
					}}
					rightIcon={<FaPlus />}>
					???????????????? ????????????
				</Button>
			</Group>
			<Space h='md' />
			<Paper shadow='xs' p='md'>
				<>
					{isLoading && <Text>????????????????...</Text>}
					{error && <Text>???????????? ????????????????</Text>}
					{articles && (
						<>
							<Grid align='center' mb='md'>
								<Grid.Col xs={8} sm={9}>
									<TextInput
										sx={{ flexBasis: '50%' }}
										placeholder='??????????...'
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
									recordsPerPageLabel='???????????????????? ?????????????? ???? ????????????????'
									onRecordsPerPageChange={setPageSize}
									records={records}
									page={page}
									onPageChange={(p) => setPage(p)}
									columns={[
										{
											accessor: 'title',
											title: '??????????????????',
											render: (article: Article) => <Text>{article.title}</Text>,
											sortable: true,
										},
										{
											accessor: 'publication.date',
											title: '???????? ????????????????????',
											render: (article: Article) => <Text>{article.publication_date}</Text>,
											sortable: true,
										},
										{
											accessor: 'details.link',
											title: '????????????',
											render: (article: Article) => (
												<Button
													compact
													component='a'
													variant='outline'
													onClick={() => handleReadClick(article)}>
													????????????
												</Button>
											),
										},
									]}
									totalRecords={articles.length}
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

export default ArticlesPage;
