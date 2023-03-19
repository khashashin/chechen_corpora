import {
	ActionIcon,
	Alert,
	Button,
	Drawer,
	Paper,
	ScrollArea,
	Stack,
	Textarea,
	TextInput,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons';
import { RiDeleteBin4Line } from 'react-icons/ri';
import Article from '../../../models/article';
import { Source } from '../../../models/base';

type ArticleMetaInfoProps = {
	opened: boolean;
	onClose: (values: Article) => void;
	articleMeta: Article;
};

function ArticleMetaInfo(props: ArticleMetaInfoProps) {
	const { articleMeta, opened, onClose } = props;
	const theme = useMantineTheme();
	const form = useForm({
		initialValues: {
			title: articleMeta.title,
			summary: articleMeta.summary,
			volume: articleMeta.volume,
			publication_date: articleMeta.publication_date,
			genres: articleMeta.genres,
			authors: articleMeta.authors,
			sources: articleMeta.sources,
			publisher: articleMeta.publisher,
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
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
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

export default ArticleMetaInfo;
