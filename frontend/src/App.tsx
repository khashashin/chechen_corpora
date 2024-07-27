import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useState } from 'react';
import { ReactLocation } from '@tanstack/react-location';
import CookieConsent from 'react-cookie-consent';
import AppRoutes from './routes/main';
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
					<AppRoutes location={location} />
					<CookieConsent
						location='bottom'
						buttonText='Я согласен'
						cookieName='CeCorporaCookie'
						style={{ background: '#2B373B' }}
						buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
						expires={150}>
						Этот сайт использует файлы cookie для улучшения работы сайта и его контента. Так же мы
						используем сторонние сервисы, которые могут собирать информацию о вас. Продолжая
						использовать сайт, вы соглашаетесь с использованием файлов cookie и сторонних сервисов.
					</CookieConsent>
				</EnvProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default App;
