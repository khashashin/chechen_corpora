import {
	Group,
	Stack,
	Title,
	Text,
	ActionIcon,
	Popover,
	Button,
	Space,
	Box,
	Textarea,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
	IconBookUpload,
	IconDeviceFloppy,
	IconFilePlus,
	IconFileX,
	IconLayoutSidebarLeftCollapse,
} from '@tabler/icons';
import { useMutation } from '@tanstack/react-query';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import Article from '../../models/article';
import Page from '../../models/page';
import { PAGE_SIZE } from '../../shared/constants';
import SharedUtils from '../../shared/utils';
import ArticleMetaInfo from './components/ArticleMetaInfo';
import { createArticle } from './services/api';

function ArticleAdd() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [articleMeta, setArticleMeta] = useState<Article>({
		title: '',
		summary: '',
		volume: '',
		publication_date: '',
		sources: [],
	});
	const [popoverOpened, setPopoverOpened] = useState(false);
	const [pages, setPages] = useState<Page[]>([{ text: '', number: 1, id: SharedUtils.uuidv4 }]);
	const [page, setPage] = useState(1);
	const [records, setRecords] = useState(pages.slice(0, PAGE_SIZE));
	const isMobile = useMediaQuery('(max-width: 600px)');
	const mutation = useMutation({
		mutationFn: createArticle,
	});

	const handleArticleMetaChange = (values: Article) => {
		setArticleMeta(values);
		setDrawerOpen(false);
	};

	const handlePageTextChange = (value: string, index: number) => {
		const newPages = [...pages];
		newPages[index].text = value;
		setPages(newPages);
	};

	const onAddPageClick = () => {
		setPages([...pages, { text: '', number: pages.length + 1, id: SharedUtils.uuidv4 }]);
		setPage(pages.length + 1);
	};

	const onRemovePageClick = () => {
		if (pages.length === 1) {
			return;
		}
		const newPages = [...pages];
		newPages.pop();
		setPages(newPages);
		setPage(pages.length - 1);
	};

	const handleArticleSave = () => {
		if (!articleMeta.title) {
			setPopoverOpened(true);
			return;
		}

		// remove id property from pages
		const pagesWithoutId = pages.map((p) => {
			const { id, ...rest } = p;
			return rest;
		});

		const date = articleMeta.publication_date ? new Date(articleMeta.publication_date) : null;

		const article = {
			title: articleMeta.title,
			summary: articleMeta.summary,
			volume: articleMeta.volume,
			publication_date: date
				? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
				: date,
			sources: articleMeta.sources,
			pages: pagesWithoutId,
		} as Article;

		mutation.mutate(article);
	};

	useEffect(() => {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE;
		setRecords(pages.slice(from, to));
	}, [page, pages]);

	return (
		<>
			<ArticleMetaInfo
				onClose={handleArticleMetaChange}
				opened={drawerOpen}
				articleMeta={articleMeta}
			/>
			<Group position='apart'>
				<Stack spacing='xs'>
					<Title>Добавить статью</Title>
					<Text>Вставляйте текст статьи постранично</Text>
				</Stack>
				<Group spacing='xl'>
					<ActionIcon title='Загрузка файлов пока не поддерживается' disabled>
						<IconBookUpload />
					</ActionIcon>
					<Popover
						width={250}
						position='bottom'
						withArrow
						shadow='md'
						transitionProps={{
							duration: 200,
						}}
						opened={popoverOpened}>
						<Popover.Target>
							<ActionIcon variant='light' title='Дополнительная информация'>
								<IconLayoutSidebarLeftCollapse
									onClick={() => {
										setPopoverOpened(false);
										setDrawerOpen(true);
									}}
								/>
							</ActionIcon>
						</Popover.Target>
						<Popover.Dropdown>
							<Text size='sm' color='red'>
								Добавьте дополнительную информацию о статье прежде чем сохранить
							</Text>
						</Popover.Dropdown>
					</Popover>
					<Button.Group>
						<ActionIcon title='Удалить последнюю страницу' onClick={onRemovePageClick} color='red'>
							<IconFileX />
						</ActionIcon>
						<ActionIcon title='Добавить страницу' onClick={onAddPageClick} color='green'>
							<IconFilePlus />
						</ActionIcon>
					</Button.Group>
					{!isMobile && (
						<Button leftIcon={<IconDeviceFloppy />} onClick={() => handleArticleSave()}>
							Сохранить
						</Button>
					)}
					{isMobile && (
						<ActionIcon title='Сохранить' onClick={() => handleArticleSave()}>
							<IconDeviceFloppy />
						</ActionIcon>
					)}
				</Group>
			</Group>
			<Space h='md' />
			<Box>
				<DataTable
					records={records}
					columns={[
						{
							accessor: 'id',
							title: '',
							render: (record) => (
								<Textarea
									value={record.text}
									onChange={(e) => handlePageTextChange(e.target.value, record.number - 1)}
									autosize
									minRows={12}>
									{record.text}
								</Textarea>
							),
							titleStyle: {
								display: 'none',
							},
						},
					]}
					withBorder
					borderRadius='sm'
					withColumnBorders
					totalRecords={pages.length}
					recordsPerPage={PAGE_SIZE}
					page={page}
					onPageChange={(p) => setPage(p)}
					horizontalSpacing='xs'
					verticalSpacing='xs'
				/>
			</Box>
		</>
	);
}

export default ArticleAdd;
