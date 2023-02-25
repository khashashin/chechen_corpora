import { Group, useMantineColorScheme, useMantineTheme, ActionIcon } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';
import { useLocalStorage } from '@mantine/hooks';
import { memo, useEffect } from 'react';

function ColorSchemeToggle() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const [currentScheme, setScheme] = useLocalStorage({ key: 'colorScheme', defaultValue: 'light' });
	const theme = useMantineTheme();

	// save color scheme to local storage
	const saveColorScheme = () => {
		const scheme = colorScheme === 'dark' ? 'light' : 'dark';
		setScheme(scheme);
		toggleColorScheme(scheme);
	};

	// get color scheme from local storage
	useEffect(() => {
		if (currentScheme) toggleColorScheme(currentScheme as 'light' | 'dark');
	}, [toggleColorScheme, currentScheme]);

	return (
		<Group position='center' mx='md'>
			<ActionIcon
				onClick={() => saveColorScheme()}
				size='lg'
				sx={() => ({
					backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
					color: colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
				})}>
				{colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
			</ActionIcon>
		</Group>
	);
}

export default memo(ColorSchemeToggle);
