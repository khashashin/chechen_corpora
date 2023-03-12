import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { Button, createStyles, Group, Modal, Text } from '@mantine/core';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons';
import { memo, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { showNotification, updateNotification } from '@mantine/notifications';
import { uploadJson } from '../services/api';
import { BookCreateResponse, JSONFile } from '../../../models/book';

const useStyles = createStyles((theme) => ({
	wrapper: {
		position: 'relative',
		marginBottom: 30,
	},

	dropzone: {
		borderWidth: 1,
		paddingBottom: 50,
	},

	icon: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
	},

	control: {
		position: 'absolute',
		width: 250,
		left: 'calc(50% - 125px)',
		bottom: -20,
	},
}));

type UploadFileModalProps = {
	dropZoneOpened: boolean;
	setDropZoneOpened: (value: boolean) => void;
	setIsLoading: (value: boolean) => void;
	onBookUpload: (book: BookCreateResponse) => void;
};

function UploadFileModal(props: UploadFileModalProps) {
	const { dropZoneOpened, setDropZoneOpened, setIsLoading, onBookUpload } = props;
	const { classes, theme } = useStyles();
	const dropZoneRef = useRef<() => void>(null);
	const mutation = useMutation({
		mutationFn: uploadJson,
	});

	const handleJsonFile = (file: File) => {
		setIsLoading(mutation.isLoading);
		showNotification({
			id: 'uploadingJSON',
			loading: true,
			title: 'Загрузка книги',
			message: 'Загрузка книги в процессе',
			autoClose: false,
			disallowClose: true,
		});
		try {
			const reader = new FileReader();
			reader.readAsText(file);
			reader.onload = async () => {
				const json = JSON.parse(reader.result as string) as JSONFile;
				const response = await mutation.mutateAsync(json);
				onBookUpload(response as BookCreateResponse);
				updateNotification({
					id: 'uploadingJSON',
					loading: false,
					title: 'Успешно',
					message: 'Книга успешно загружена',
					autoClose: true,
				});

				return setDropZoneOpened(false);
			};
		} catch (e) {
			updateNotification({
				id: 'uploadingJSON',
				loading: false,
				title: 'Ошибка',
				message: 'Ошибка при загрузке книги',
				autoClose: true,
			});

			console.error(e);
		}

		return setDropZoneOpened(false);
	};

	const onDrop = (files: FileWithPath[]) => {
		// check file type 'application/json', 'text/plain', 'text/csv'
		if (files[0].type === 'application/json') {
			handleJsonFile(files[0]);
		}
		// if (file.type === 'text/plain') {
		// 	handleTextFile(file);
		// }
		// if (file.type === 'text/csv') {
		// 	handleCsvFile(file);
		// }
	};

	return (
		<Modal opened={dropZoneOpened} onClose={() => setDropZoneOpened(false)} withCloseButton={false}>
			<div className={classes.wrapper}>
				<Dropzone
					openRef={dropZoneRef}
					onDrop={onDrop}
					className={classes.dropzone}
					radius='md'
					accept={['application/json', 'text/plain', 'text/csv']}
					maxSize={30 * 1024 ** 2}
					maxFiles={1}
					loading={mutation.isLoading}>
					<div style={{ pointerEvents: 'none' }}>
						<Group position='center'>
							<Dropzone.Accept>
								<IconDownload size={50} color={theme.colors[theme.primaryColor][6]} stroke={1.5} />
							</Dropzone.Accept>
							<Dropzone.Reject>
								<IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
							</Dropzone.Reject>
							<Dropzone.Idle>
								<IconCloudUpload
									size={50}
									color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
									stroke={1.5}
								/>
							</Dropzone.Idle>
						</Group>

						<Text align='center' weight={700} size='lg' mt='xl'>
							<Dropzone.Accept>Отпустите файл, чтобы загрузить его</Dropzone.Accept>
							<Dropzone.Reject>
								Неверный формат файла. Попробуйте загрузить другой файл.
							</Dropzone.Reject>
							<Dropzone.Idle>Перетащите файл сюда или нажмите на кнопку ниже</Dropzone.Idle>
						</Text>
						<Text align='center' size='sm' mt='xs' color='dimmed'>
							Drag&apos;n&apos;Drop Только файлы с расширением <i>.json, .txt, .csv</i> и размером
							не более <i>30 МБ</i> могут быть загружены.
						</Text>
					</div>
				</Dropzone>

				<Button
					className={classes.control}
					size='md'
					radius='xl'
					onClick={() => dropZoneRef.current?.()}>
					Загрузить файл
				</Button>
			</div>
		</Modal>
	);
}

export default memo(UploadFileModal);
