import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
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
import {
	IconBookUpload,
	IconDeviceFloppy,
	IconFilePlus,
	IconFileX,
	IconLayoutSidebarLeftCollapse,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import DiverseMaterial from '../../models/diverse-materials';
import Page from '../../models/page';
import { PAGE_SIZE } from '../../shared/constants';
import SharedUtils from '../../shared/utils';
import { createOther } from './services/api';
import MetaInfo from './components/MetaInfo';

function AddMaterial() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [metaInfo, setMetaInfo] = useState<DiverseMaterial>({
		title: '',
		summary: '',
		publication_date: '',
		sources: [],
	});
	const [popoverOpened, setPopoverOpened] = useState(false);
	const [pages, setPages] = useState<Page[]>([{ text: '', number: 1, id: SharedUtils.uuidv4 }]);
	const [page, setPage] = useState(1);
	const [records, setRecords] = useState(pages.slice(0, PAGE_SIZE));
	const isMobile = useMediaQuery('(max-width: 600px)');
	const navigate = useNavigate();

	const onSaveSuccess = () => {
		navigate('/admin/diverse-materials');
		notifications.show({
			title: 'Успешное сохранение',
			message: 'Материал успешно сохранен',
		});
	};

	const onSaveError = () => {
		notifications.show({
			title: 'Ошибка сохранения',
			message: 'Не удалось сохранить материал',
		});
	};

	const mutation = useMutation({
		mutationFn: createOther,
		onSuccess: onSaveSuccess,
		onError: onSaveError,
	});

	const handleMetaChange = (values: DiverseMaterial) => {
		setMetaInfo(values);
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

	const handleMaterialSave = () => {
		if (!metaInfo.title) {
			setPopoverOpened(true);
			return;
		}

		// remove id property from pages
		const pagesWithoutId = pages.map((p) => {
			const { id, ...rest } = p;
			return rest;
		});

		const date = metaInfo.publication_date ? new Date(metaInfo.publication_date) : null;

		const material = {
			title: metaInfo.title,
			summary: metaInfo.summary,
			publication_date: date
				? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
				: date,
			sources: metaInfo.sources,
			authors: metaInfo.authors,
			publisher: metaInfo.publisher,
			genres: metaInfo.genres,
			pages: pagesWithoutId,
		} as DiverseMaterial;

		mutation.mutate(material);
	};

	useEffect(() => {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE;
		setRecords(pages.slice(from, to));
	}, [page, pages]);

	return (
		<>
			<MetaInfo opened={drawerOpen} onClose={handleMetaChange} meta={metaInfo} />
			<Group justify='apart'>
				<Stack gap='xs'>
					<Title>Добавить статью</Title>
					<Text>Вставляйте текст статьи постранично</Text>
				</Stack>
				<Group gap='xl'>
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
						<Button leftSection={<IconDeviceFloppy />} onClick={() => handleMaterialSave()}>
							Сохранить
						</Button>
					)}
					{isMobile && (
						<ActionIcon title='Сохранить' onClick={() => handleMaterialSave()}>
							<IconDeviceFloppy />
						</ActionIcon>
					)}
				</Group>
			</Group>
			<Space h='md' />
			<Box>
				<DataTable
					withTableBorder
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
					borderRadius='sm'
					withColumnBorders
					totalRecords={pages.length}
					recordsPerPage={PAGE_SIZE}
					page={page}
					onPageChange={(newPage) => setPage(newPage)}
				/>
			</Box>
		</>
	);
}

export default AddMaterial;
