import { AppShell as MantineAppShell } from '@mantine/core';
import { ReactNode, useState } from 'react';
import AppFooter from './footer';
import AppHeader from './header';
import AppNavigation from './navigation';

type Props = {
	children: ReactNode;
};

function AppShell({ children }: Props) {
	const [opened, setOpened] = useState(false);

	return (
		<MantineAppShell
			padding='xl'
			navbarOffsetBreakpoint='sm'
			asideOffsetBreakpoint='sm'
			navbar={<AppNavigation opened={opened} />}
			header={<AppHeader setOpened={setOpened} opened={opened} authenticated />}
			footer={<AppFooter />}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			})}>
			{children}
		</MantineAppShell>
	);
}

export default AppShell;
