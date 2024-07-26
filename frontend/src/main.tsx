import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';
import theme from 'src/theme';
import { Notifications } from '@mantine/notifications';
import CookieConsent from 'react-cookie-consent';
import App from './App';
import AuthProvider from './providers/AuthProvider';

import '@mantine/core/styles.css';

Sentry.init({
	dsn: 'https://a995ea29fe37452dbf6644e8270bff92@sentry.khas.dev/7',
	release: '1.0.0',
	autoSessionTracking: false,
	tracesSampleRate: 1.0,
	integrations: [new BrowserTracing()],
});

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<MantineProvider theme={theme} defaultColorScheme='light'>
				<AuthProvider>
					<QueryClientProvider client={queryClient}>
						<Routes>
							<Route path='/*' element={<App />} />
						</Routes>

						<CookieConsent
							location='bottom'
							buttonText='Я согласен'
							cookieName='CeCorporaCookie'
							style={{ background: '#2B373B' }}
							buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
							expires={150}>
							Этот сайт использует файлы cookie для улучшения работы сайта и его контента. Так же мы
							используем сторонние сервисы, которые могут собирать информацию о вас. Продолжая
							использовать сайт, вы соглашаетесь с использованием файлов cookie и сторонних
							сервисов.
						</CookieConsent>
						<Notifications />
						<ReactQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</AuthProvider>
			</MantineProvider>
		</BrowserRouter>
	</React.StrictMode>
);
