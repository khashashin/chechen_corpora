import { Text, Title, Container, SimpleGrid, Paper, Group, createStyles } from '@mantine/core';
import { Client, Databases, Query } from 'appwrite';
import { memo, useEffect, useMemo, useState } from 'react';

const { VITE_AUTH_ENDPOINT, VITE_AUTH_PROJECT_ID } = import.meta.env;

const client = new Client();
client.setEndpoint(VITE_AUTH_ENDPOINT).setProject(VITE_AUTH_PROJECT_ID);

const databases = new Databases(client);

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

type Notifications = {
	title: string;
	message: string;
};

function LastChanges() {
	const { classes, theme } = useStyles();
	const [notifications, setNotifications] = useState<Notifications[]>([]);

	const getNotifications = useMemo(async () => {
		return databases.listDocuments('640dec564dd6addc5f2f', '640dec68e9ae407e09f5', [
			Query.orderDesc('$updatedAt'),
			Query.limit(4),
		]);
	}, []);

	useEffect(() => {
		(async () => {
			const messages = await getNotifications;
			const data = messages.documents.map((item) => {
				console.log(item);
				return {
					title: item.title,
					message: item.message,
				};
			});

			setNotifications(data);
		})();
	}, [getNotifications]);

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
				spacing={`calc(${theme.spacing.sm} * 2)`}
				breakpoints={[
					{ maxWidth: 980, cols: 2, spacing: 'xl' },
					{ maxWidth: 755, cols: 1, spacing: 'xl' },
				]}>
				{notifications.map((item) => (
					<Paper key={`${item.title}-${Date.now()}`} withBorder p='lg' radius='md' shadow='md'>
						<Group position='apart' mb='xs'>
							<Text size='md' weight={500}>
								{item.title}
							</Text>
						</Group>
						<Text color='dimmed' size='xs'>
							{item.message}
						</Text>
					</Paper>
				))}
			</SimpleGrid>
		</Container>
	);
}

export default memo(LastChanges);
