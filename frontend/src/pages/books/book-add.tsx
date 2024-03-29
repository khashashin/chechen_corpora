import { useEffect, useState } from 'react';
import {
	ActionIcon,
	Box,
	Button,
	Group,
	Popover,
	Space,
	Stack,
	Text,
	Textarea,
	Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { DataTable } from 'mantine-datatable';
import {
	IconFilePlus,
	IconLayoutSidebarLeftCollapse,
	IconDeviceFloppy,
	IconFileX,
	IconBookUpload,
} from '@tabler/icons';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-location';
import { notifications } from '@mantine/notifications';
import BookMetaDrawer from './components/BookMetaInfo';
import { BookUtils } from './services/utils';
import UploadFileModal from './components/UploadFileModal';
import { createBook } from './services/api';
import SharedUtils from '../../shared/utils';
import { Book, BookCreateResponse } from '../../models/book';
import Page from '../../models/page';

const PAGE_SIZE = 1;

function BooksAdd() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [pages, setPages] = useState<Page[]>([{ text: '', number: 1, id: SharedUtils.uuidv4 }]);
	const [page, setPage] = useState(1);
	const [records, setRecords] = useState(pages.slice(0, PAGE_SIZE));
	const [isSaved, setIsSaved] = useState(false);
	const [popoverOpened, setPopoverOpened] = useState(false);
	const isMobile = useMediaQuery('(max-width: 600px)');
	const [bookMeta, setBookMeta] = useState<Book>({
		title: '',
		summary: '',
		isbn: '',
		publication_date: '',
		sources: [],
	});
	const [dropZoneOpened, setDropZoneOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const onSaveSuccess = () => {
		navigate({ to: '/admin/books' });
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
		mutationFn: createBook,
		onSuccess: onSaveSuccess,
		onError: onSaveError,
	});

	// useEffect(() => {
	// 	// const unsavedBook = BookUtils.getUnsavedBook();
	// 	// console.log('unsavedBook', unsavedBook);
	// 	// if (unsavedBook) {
	// 	// 	const isConfirmed = window.confirm('У вас есть несохраненная книга. Хотите продолжить ее редактирование?');
	// 	// 	if (!isConfirmed) {
	// 	// 		BookUtils.removeUnsavedBook();
	// 	// 		return;
	// 	// 	}
	// 	// 	setBookMeta(unsavedBook.meta);
	// 	// 	setPages(unsavedBook.pages);
	// 	// }
	//
	// 	return () => {
	// 		if (
	// 			!isSaved &&
	// 			(bookMeta.title ||
	// 				bookMeta.summary ||
	// 				bookMeta.isbn ||
	// 				bookMeta.publication_date ||
	// 				bookMeta.sources?.length > 0 ||
	// 				pages.length > 1)
	// 		) {
	// 			BookUtils.saveUnsavedBook({
	// 				meta: bookMeta,
	// 				pages,
	// 			});
	// 		}
	// 	};
	// }, [bookMeta, isSaved, pages]);

	useEffect(() => {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE;
		setRecords(pages.slice(from, to));
	}, [page, pages]);

	const handleBookMetaChange = (values: Book) => {
		setBookMeta(values);
		setDrawerOpen(false);
	};

	const handleBookSave = () => {
		if (!bookMeta.title) {
			setPopoverOpened(true);
			return;
		}

		setIsSaved(true);

		// remove id property from pages
		const pagesWithoutId = pages.map((p) => {
			const { id, ...rest } = p;
			return rest;
		});

		const date = bookMeta.publication_date ? new Date(bookMeta.publication_date) : null;

		const book = {
			title: bookMeta.title,
			summary: bookMeta.summary,
			isbn: bookMeta.isbn,
			publication_date: date
				? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
				: date,
			sources: bookMeta.sources,
			pages: pagesWithoutId,
		} as Book;

		mutation.mutate(book);
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

	const onBookUploadClick = () => {
		setDropZoneOpened(true);
	};

	const onBookUpload = async (book: BookCreateResponse) => {
		setIsLoading(true);
		setDropZoneOpened(false);
		setBookMeta({} as Book);
		const newPages: Page[] = [];
		Object.keys(book).forEach((key: string) => {
			const pageText = book[key];
			newPages.push({ text: pageText, number: parseInt(key, 10), id: SharedUtils.uuidv4 });
		});

		setIsLoading(false);
		setPages(newPages);
	};

	return (
		<>
			<BookMetaDrawer onClose={handleBookMetaChange} opened={drawerOpen} bookMeta={bookMeta} />
			<Group position='apart'>
				<Stack spacing='xs'>
					<Title>Добавить книгу</Title>
					<Text>Вставляйте текст книги постранично</Text>
				</Stack>
				<Group spacing='xl'>
					<ActionIcon title='Загрузить файл' onClick={onBookUploadClick}>
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
								Добавьте дополнительную информацию о книге прежде чем сохранить
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
						<Button leftIcon={<IconDeviceFloppy />} onClick={() => handleBookSave()}>
							Сохранить
						</Button>
					)}
					{isMobile && (
						<ActionIcon title='Сохранить' onClick={() => handleBookSave()}>
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
			<UploadFileModal
				dropZoneOpened={dropZoneOpened}
				setDropZoneOpened={setDropZoneOpened}
				setIsLoading={setIsLoading}
				onBookUpload={onBookUpload}
			/>
		</>
	);
}

export default BooksAdd;
