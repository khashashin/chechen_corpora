import { Switch, Group, useMantineColorScheme, useMantineTheme } from '@mantine/core';
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
		<Group position='center'>
			<Switch
				checked={colorScheme === 'dark'}
				onChange={() => saveColorScheme()}
				size='md'
				onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
				offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
			/>
		</Group>
	);
}

export default memo(ColorSchemeToggle);
