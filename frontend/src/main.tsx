import React from 'react';
import { Global } from '@mantine/core';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';

Sentry.init({
	dsn: 'https://a995ea29fe37452dbf6644e8270bff92@sentry.khas.dev/7',
	release: '1.0.0',
	autoSessionTracking: false,
	tracesSampleRate: 1.0,
	integrations: [new BrowserTracing()],
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Global
			styles={(theme) => ({
				':root': {
					'--remove-scroll-width': '0px',
				},
			})}
		/>
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
		</QueryClientProvider>
	</React.StrictMode>
);
