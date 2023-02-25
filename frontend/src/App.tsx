import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from 'react';
import { ReactLocation } from '@tanstack/react-location';
import AppRoutes from './routes/main';

export const location = new ReactLocation();

function App() {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				theme={{ colorScheme, primaryColor: 'green' }}
				withGlobalStyles
				withNormalizeCSS>
				<NotificationsProvider>
					<AppRoutes location={location} />
				</NotificationsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default App;
