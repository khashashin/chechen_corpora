import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useState } from 'react';
import { ReactLocation } from '@tanstack/react-location';
import AppRoutes from './routes/main';
import AuthProvider from './providers/auth-provider';
import EnvProvider from './providers/env-provider';

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
				<Notifications />
				<EnvProvider>
					<AuthProvider>
						<AppRoutes location={location} />
					</AuthProvider>
				</EnvProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default App;
