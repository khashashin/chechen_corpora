import { Route } from '@tanstack/react-location';
import PageNotFound from '../../pages/PageNotFound';
import SearchPage from '../../pages/search';
import HomePage from '../../pages/home';
import WordsPage from '../../pages/words';

const coreRoutes: Route[] = [
	{
		id: 'home',
		path: '/',
		element: <HomePage />,
	},
	{
		id: 'search',
		path: '/search',
		element: <SearchPage />,
	},
	{
		id: 'words',
		path: '/words',
		element: <WordsPage />,
	},
	{
		id: 'not-found',
		path: '*',
		element: <PageNotFound />,
	},
];

export default coreRoutes;
