import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import * as Sentry from '@sentry/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AuthProvider from './providers/AuthProvider';
import theme from './theme';
import App from './App';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import 'mantine-datatable/styles.css';

// Checking if the current hostname is not localhost
if (window.location.hostname !== 'localhost') {
  Sentry.init({
    dsn: 'https://a995ea29fe37452dbf6644e8270bff92@sentry.khas.dev/7',
    release: '1.0.0',
    autoSessionTracking: false,
    tracesSampleRate: 1.0,
    integrations: [new Sentry.BrowserTracing()],
  });
}

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
            <Notifications />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
