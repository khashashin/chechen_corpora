import { useQuery } from '@tanstack/react-query';
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
import { useNavigate } from '@tanstack/react-location';
import { FaPlus } from 'react-icons/fa';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { BiSearchAlt } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { sortBy } from 'lodash';
import { getOthers } from './services/api';
import DiverseMaterial from '../../models/diverse-materials';

const PAGE_SIZES = [5, 20, 50];

function DiverseMaterials() {
	const {
		data: diverseMaterials,
		isLoading,
		error,
	} = useQuery(['other'], () => getOthers(), {
		initialData: [],
	});
	const [query, setQuery] = useState('');
	const [debouncedQuery] = useDebouncedValue(query, 200);
	const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
	const [records, setRecords] = useState(sortBy(diverseMaterials.slice(0, pageSize), 'title'));
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
		const data = sortBy(diverseMaterials, sortStatus.columnAccessor);
		setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
	}, [sortStatus, diverseMaterials]);

	useEffect(() => {
		const from = (page - 1) * pageSize;
		const to = from + pageSize;
		setRecords(diverseMaterials.slice(from, to));
	}, [page, pageSize, diverseMaterials]);

	useEffect(() => {
		setRecords(
			diverseMaterials.filter(({ title }) => {
				return !(
					debouncedQuery !== '' &&
					!`${title}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
				);
			})
		);
	}, [debouncedQuery, diverseMaterials]);

	const handleReadClick = (article: DiverseMaterial) => {
		const { id } = article;
		if (!id) return undefined;
		return navigate({
			to: `/admin/diverse-materials/${id}`,
		});
	};

	return (
		<>
			<Group position='apart'>
				<Stack spacing='xs'>
					<Title>Список разнообразных материалов</Title>
					<Text>Выберите материал для ознакомления</Text>
				</Stack>
				<Button
					onClick={() => {
						navigate({
							to: '/admin/diverse-materials/add',
						});
					}}
					rightIcon={<FaPlus />}>
					Добавить материал
				</Button>
			</Group>
			<Space h='md' />
			<Paper shadow='xs' p='md'>
				<>
					{isLoading && <Text>Загрузка...</Text>}
					{error && <Text>Ошибка загрузки</Text>}
					{diverseMaterials && (
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
											render: (article: DiverseMaterial) => <Text>{article.title}</Text>,
											sortable: true,
										},
										{
											accessor: 'publication.date',
											title: 'Дата публикации',
											render: (article: DiverseMaterial) => <Text>{article.publication_date}</Text>,
											sortable: true,
										},
										{
											accessor: 'details.link',
											title: 'Читать',
											render: (article: DiverseMaterial) => (
												<Button
													compact
													component='a'
													variant='outline'
													onClick={() => handleReadClick(article)}>
													Читать
												</Button>
											),
										},
									]}
									totalRecords={diverseMaterials.length}
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

export default DiverseMaterials;
