import { Center, Group, Loader, Stack, Text, Anchor } from '@mantine/core';
import { ReactNode, useState } from 'react';

interface LoadingScreenProps {
	title: string;
	icon: ReactNode;
}

function LoadingScreen({ title, icon }: LoadingScreenProps) {
	const [showGoHome, setShowGoHome] = useState(false);

	// Перейти на главную
	setTimeout(() => {
		setShowGoHome(true);
	}, 4000);

	return (
		<Center>
			<Stack align='center'>
				<Loader variant='bars' color='indigo' />
				<div>
					<Text size='xs' tt='uppercase' fw={700}>
						Загрузка...
					</Text>
					<Group gap='xs'>
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

export default LoadingScreen;
