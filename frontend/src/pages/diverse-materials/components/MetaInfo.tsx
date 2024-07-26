import {
	Drawer,
	Paper,
	Stack,
	TextInput,
	Textarea,
	Text,
	ScrollArea,
	ActionIcon,
	Alert,
	Button,
	useMantineTheme,
	useMantineColorScheme,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { IconAlertCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Source } from '../../../models/base';
import DiverseMaterial from '../../../models/diverse-materials';

type MetaInfoProps = {
	opened: boolean;
	onClose: (values: DiverseMaterial) => void;
	meta: DiverseMaterial;
};

function MetaInfo(props: MetaInfoProps) {
	const { colorScheme } = useMantineColorScheme();
	const { meta, opened, onClose } = props;
	const theme = useMantineTheme();
	const form = useForm({
		initialValues: {
			title: meta.title,
			summary: meta.summary,
			publication_date: meta.publication_date,
			genres: meta.genres,
			authors: meta.authors,
			sources: meta.sources,
			publisher: meta.publisher,
		},
	});

	const handleDeleteSource = (index: number) => {
		if (form.values.sources === undefined) return;
		const { sources } = form.values;
		sources.splice(index, 1);
		form.setFieldValue('sources', sources);
	};

	const handleAddSource = () => {
		if (form.values.sources === undefined) return;
		const { sources } = form.values;
		sources.push({ name: '' });
		form.setFieldValue('sources', sources);
	};

	return (
		<Drawer
			opened={opened}
			position='right'
			title='Дополнительная информация'
			padding='xl'
			size='xl'
			onClose={() => onClose({ ...form.values, authors: [], genres: [], publisher: [] })}>
			<Paper
				style={{
					position: 'relative',
					backgroundColor: colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
				}}>
				<form noValidate>
					<TextInput
						mt='md'
						required
						placeholder='Введите название статьи'
						label='Название статьи'
						{...form.getInputProps('title')} // eslint-disable-line react/jsx-props-no-spreading
					/>
					<Textarea
						mt='md'
						autosize
						placeholder='Введите краткое описание статьи'
						minRows={4}
						label='Описание статьи'
						{...form.getInputProps('summary')} // eslint-disable-line react/jsx-props-no-spreading
					/>
					<TextInput
						mt='md'
						placeholder='Введите том'
						label='Том'
						{...form.getInputProps('volume')} // eslint-disable-line react/jsx-props-no-spreading
					/>
					<DatePickerInput
						mt='md'
						value={
							form.values.publication_date ? new Date(form.values.publication_date) : new Date()
						}
						onChange={(date) => {
							if (date) {
								form.setFieldValue('publication_date', date.toISOString());
							}
						}}
						locale='ru'
						placeholder='Выберите дату'
						label='Дата публикации'
						defaultValue={new Date()}
					/>
					<Stack mt='md'>
						<Text component='label' fw={500} fz='sm'>
							Источники (ссылки на сайты, где можно найти статью)
						</Text>
						{form.values.sources && form.values.sources.length > 0 && (
							<ScrollArea
								mt='md'
								style={{
									height: 'auto',
									...(form.values.sources &&
										form.values.sources.length > 3 && {
											height: 200,
										}),
								}}
								type='auto'
								offsetScrollbars>
								{form.values.sources &&
									form.values.sources.map((source: Source, index: number) => (
										<TextInput
											key={source.name}
											placeholder='Введите ссылку на источник'
											label={`Источник ${index + 1}`}
											size='xs'
											{...form.getInputProps(`sources.${index}`)} // eslint-disable-line react/jsx-props-no-spreading
											rightSection={
												<ActionIcon
													variant='transparent'
													size='sm'
													onClick={() => {
														handleDeleteSource(index);
													}}>
													<RiDeleteBin4Line size={18} />
												</ActionIcon>
											}
										/>
									))}
							</ScrollArea>
						)}
						{form.values.sources && form.values.sources.length === 0 && (
							<Alert
								icon={<IconAlertCircle size={16} />}
								title='Вы не добавили ни одного источника! (необязательно)'
								color='yellow'
								variant='outline'>
								Добавьте хотя бы один источник, чтобы другие пользователи могли проверить
								информацию.
							</Alert>
						)}
						<Button
							mt='md'
							onClick={() => {
								handleAddSource();
							}}>
							Добавить ресурс
						</Button>
					</Stack>
				</form>
			</Paper>
		</Drawer>
	);
}

export default MetaInfo;
