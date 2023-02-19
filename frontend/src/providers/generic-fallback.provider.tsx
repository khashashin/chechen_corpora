import { Center, createStyles, Group, Loader, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';

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
	const { classes } = useStyles();
	return (
		<Center className={classes.container}>
			<Stack align='center'>
				<Loader variant='bars' color='indigo' />
				<div className={classes.textContainer}>
					<Text className={classes.textMuted} size='xs' transform='uppercase' weight='bold'>
						Loading
					</Text>
					<Group spacing='xs'>
						{icon}
						<Text size='xl'>{title}</Text>
					</Group>
				</div>
			</Stack>
		</Center>
	);
}

export default GenericFallback;
