import { Center, createStyles, Group, Loader, Stack, Text, Anchor } from '@mantine/core';
import { ReactNode, useState } from 'react';

const useStyles = createStyles((theme) => ({
	container: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],

		position: 'absolute',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
	},
	textContainer: {
		textAlign: 'center',
	},
	textMuted: {
		color: theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.colors.gray[5],
	},
}));

interface GenericFallbackProps {
	title: string;
	icon: ReactNode;
}

function GenericFallback({ title, icon }: GenericFallbackProps) {
	const [showGoHome, setShowGoHome] = useState(false);

	// Перейти на главную
	setTimeout(() => {
		setShowGoHome(true);
	}, 4000);

	const { classes } = useStyles();
	return (
		<Center className={classes.container}>
			<Stack align='center'>
				<Loader variant='bars' color='indigo' />
				<div className={classes.textContainer}>
					<Text className={classes.textMuted} size='xs' transform='uppercase' weight='bold'>
						Загрузка...
					</Text>
					<Group spacing='xs'>
						{icon}
						<Text size='xl'>{title}</Text>
					</Group>
					{showGoHome && (
						<Anchor href='/' target='_self'>
							Перейти на главную
						</Anchor>
					)}
				</div>
			</Stack>
		</Center>
	);
}

export default GenericFallback;
