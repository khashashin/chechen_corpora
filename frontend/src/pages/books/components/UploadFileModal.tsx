import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { Button, createStyles, Group, Modal, Text } from '@mantine/core';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons';
import { memo, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { uploadJson } from '../services/api';
import { JSONFile } from '../modals';
import { BookResponse } from '../../../models/books/BookDto';

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
	onBookUpload: (book: BookResponse) => void;
};

function UploadFileModal(props: UploadFileModalProps) {
	const { dropZoneOpened, setDropZoneOpened, setIsLoading, onBookUpload } = props;
	const { classes, theme } = useStyles();
	const dropZoneRef = useRef<() => void>(null);
	const { mutate, isLoading } = useMutation(uploadJson, {
		onSuccess: (res: BookResponse) => {
			onBookUpload(res);
			setDropZoneOpened(false);
			setIsLoading(false);
		},
		onError: () => {
			setDropZoneOpened(false);
			setIsLoading(false);
		},
	});

	const handleJsonFile = (file: File) => {
		setIsLoading(isLoading);
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = async () => {
			const json = JSON.parse(reader.result as string) as JSONFile;
			mutate(json);
		};
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
					loading={isLoading}>
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
							<Dropzone.Accept>Перетащите файл сюда или нажмите на кнопку ниже</Dropzone.Accept>
							<Dropzone.Reject>
								Неверный формат файла. Попробуйте загрузить другой файл.
							</Dropzone.Reject>
							<Dropzone.Idle>Возобновление загрузки</Dropzone.Idle>
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
