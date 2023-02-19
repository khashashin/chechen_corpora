import React from 'react';
import { Text, Title, Container, SimpleGrid, Paper, Group, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
	wrapper: {
		paddingTop: theme.spacing.xl * 4,
		paddingBottom: theme.spacing.xl * 4,
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 900,
		marginBottom: theme.spacing.md,
		textAlign: 'center',

		[theme.fn.smallerThan('sm')]: {
			fontSize: 28,
			textAlign: 'left',
		},
	},

	description: {
		textAlign: 'center',

		[theme.fn.smallerThan('sm')]: {
			textAlign: 'left',
		},
	},
}));

const PaperData = [
	{
		title: 'Добавлена новая книга',
		description:
			'Добавлена новая книга "Как стать программистом", которая включает в себя 1000 страниц и 987123 уникальных слов.',
	},
	{
		title: 'Добавлена новая статья',
		description:
			'Добавлена новая статья о том, как горы меняют свою форму. Статья включает в себя 1000 страниц и 987123 уникальных слов.',
	},
	{
		title: 'Отредактирована книга "Как стать программистом"',
		description:
			'Отредактирована книга "Как стать программистом", которая включает в себя 1000 страниц и 987123 уникальных слов.',
	},
	{
		title: 'Добавлен новый журнал',
		description:
			'Добавлен новый журнал "Как стать программистом", который включает в себя 1000 страниц и 987123 уникальных слов.',
	},
];

function LastChanges() {
	const { classes, theme } = useStyles();

	return (
		<Container className={classes.wrapper}>
			<Title className={classes.title}>Последние обновления</Title>

			<Container size={560} p={0}>
				<Text size='sm' className={classes.description}>
					Описание событий, таких как: добавление новых функций, обновление старых, исправление
					ошибок и т.д.
				</Text>
			</Container>

			<SimpleGrid
				mt={60}
				spacing={theme.spacing.sm * 2}
				breakpoints={[
					{ maxWidth: 980, cols: 2, spacing: 'xl' },
					{ maxWidth: 755, cols: 1, spacing: 'xl' },
				]}>
				{PaperData.map((item) => (
					<Paper key={`${item.title}-${Date.now()}`} withBorder p='lg' radius='md' shadow='md'>
						<Group position='apart' mb='xs'>
							<Text size='md' weight={500}>
								{item.title}
							</Text>
						</Group>
						<Text color='dimmed' size='xs'>
							{item.description}
						</Text>
					</Paper>
				))}
			</SimpleGrid>
		</Container>
	);
}

export default LastChanges;
