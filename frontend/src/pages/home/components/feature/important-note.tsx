import { Text, Title, Container, Paper, createStyles, Grid, Col, Image } from '@mantine/core';
import { memo } from 'react';
import image from '../../../../assets/owl-hint.png';

const useStyles = createStyles((theme) => ({
	wrapper: {
		paddingTop: `calc(${theme.spacing.xl} * 4)`,
		paddingBottom: `calc(${theme.spacing.xl} * 4)`,
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

function ImportantNote() {
	const { classes } = useStyles();

	return (
		<Container className={classes.wrapper}>
			<Title className={classes.title}>Важно</Title>

			<Container size={560} p={0}>
				<Text size='sm' className={classes.description}>
					Приложение находится в стадии разработки и может содержать ошибки. Пожалуйста, сообщайте
					об ошибках в <a href='mailto:info@dosham.info'>техническую поддержку</a>.
				</Text>
			</Container>

			<Container p={15}>
				<Grid gutter={50} align='center'>
					<Col span={12} md={6}>
						<Image src={image} />
					</Col>
					<Col span={12} md={6}>
						<Paper>
							<Text size='sm' className={classes.description}>
								Создание чистого, высококачественного языкового корпуса может быть сложной задачей,
								особенно при работе с текстами, содержащими несколько языков. Для обучения точным и
								целенаправленным языковым моделям очень важно сохранять в корпусе фокус на одном
								языке. Тем не менее, полностью исключить иноязычные экземпляры из корпуса не всегда
								представляется возможным. Чтобы минимизировать присутствие предложений на
								иностранных языках, обычно используются различные подходы к предварительной
								обработке и машинному обучению. Однако необходимо признать, что даже в самых
								обширных и тщательно обработанных корпусах может остаться минимальное количество
								иноязычных примеров.
							</Text>
						</Paper>
					</Col>
				</Grid>
			</Container>
		</Container>
	);
}

export default memo(ImportantNote);
