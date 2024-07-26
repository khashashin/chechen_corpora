import { Group, useMantineColorScheme, useMantineTheme, ActionIcon } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { memo } from 'react';

function ColorSchemeToggle() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();

	return (
		<Group justify='center' mx='md'>
			<ActionIcon
				onClick={() => toggleColorScheme()}
				size='lg'
				autoContrast
				color={colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6]}>
				{colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
			</ActionIcon>
		</Group>
	);
}

export default memo(ColorSchemeToggle);
