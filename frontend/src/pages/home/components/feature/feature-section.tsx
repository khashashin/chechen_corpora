import React from 'react';
import {
	Text,
	Title,
	Container,
	SimpleGrid,
	Paper,
	Group,
	Image,
	createStyles,
} from '@mantine/core';
import imageBooks from '../../../../assets/books_icon.png';
import imageArticles from '../../../../assets/articles_icon.png';
import newsPapers from '../../../../assets/newspapers_icon.png';
import various from '../../../../assets/various_icon.png';

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

	cardTitle: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 700,
		fontSize: 16,
		textAlign: 'left',

		[theme.fn.smallerThan('sm')]: {
			fontSize: 28,
		},
	},

	cardImage: {
		width: '70px !important',
		position: 'absolute',
		right: '16px',
		top: '36px',

		[theme.fn.smallerThan('sm')]: {
			width: '80px !important',
			top: 'auto',
			bottom: '16px',
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
		title: 'Книги',
		image: imageBooks,
		count: 234,
		description: 'Всего книг в базе данных',
	},
	{
		title: 'Статьи',
		image: imageArticles,
		count: 345,
		description: 'Всего статей в базе данных',
	},
	{
		title: 'Газеты и журналы',
		image: newsPapers,
		count: 7345,
		description: 'Всего газет и журналов в базе данных',
	},
	{
		title: 'Остальное',
		image: various,
		count: 8123975,
		description: 'Данных без категории',
	},
];

function FeaturesSection() {
	const { classes, theme } = useStyles();

	return (
		<Container className={classes.wrapper}>
			<Title className={classes.title}>
				Статистика по <span style={{ color: theme.colors.green[6] }}>проекту</span>
			</Title>

			<Container size={560} p={0}>
				<Text size='sm' className={classes.description}>
					Некоторые цифры, дающие представление о состоянии банка данных
				</Text>
			</Container>

			<SimpleGrid
				mt={60}
				cols={4}
				breakpoints={[
					{ maxWidth: 'md', cols: 2 },
					{ maxWidth: 'xs', cols: 1 },
				]}
				spacing={theme.spacing.xl * 2}>
				{PaperData.map((item) => (
					<Paper
						key={item.title}
						withBorder
						p='md'
						radius='md'
						sx={{
							position: 'relative',
						}}>
						<Group position='apart'>
							<Text size='xs' color='dimmed' className={classes.cardTitle}>
								{item.title}
							</Text>
						</Group>

						<Group align='flex-end' spacing='xs' mt={25}>
							<Text>{item.count}</Text>
						</Group>

						<Text size='xs' color='dimmed' mt={7}>
							{item.description}
						</Text>

						<Image src={item.image} className={classes.cardImage} />
					</Paper>
				))}
			</SimpleGrid>
		</Container>
	);
}

export default FeaturesSection;
