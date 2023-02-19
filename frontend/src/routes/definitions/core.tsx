import { Navigate, Outlet, Route } from '@tanstack/react-location';
import BooksPage from '../../pages/books';
import { getBook } from '../../pages/books/services/api';
import BooksAdd from '../../pages/books/book-add';
import BookDetailsPage from '../../pages/books/book-details';
import BookUpdatePage from '../../pages/books/book-update';
import UploadPage from '../../pages/upload';
import PageNotFound from '../../pages/PageNotFound';
import SearchPage from '../../pages/search';
import BookUpload from '../../pages/books/book-upload';
import AuthOnly from '../components/auth-only.component';
import HomePage from '../../pages/home';
import AppShell from '../../layout/shell';

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
		id: 'admin',
		path: '/admin',
		element: (
			<AuthOnly>
				<AppShell>
					<Outlet />
				</AppShell>
			</AuthOnly>
		),
		children: [
			{
				id: 'redirect-to-books',
				path: '/',
				element: <Navigate to='/admin/books' />,
			},
			{
				id: 'books',
				path: '/books',
				children: [
					{
						path: '/',
						element: <BooksPage />,
					},
					{
						path: '/add',
						element: <BooksAdd />,
					},
					{
						id: 'book-details',
						path: '/:bookId',
						children: [
							{
								id: 'book-details',
								path: '/',
								loader: async ({ params }) => ({
									book: await getBook(params.bookId),
								}),
								element: <BookDetailsPage />,
							},
							{
								id: 'book-update',
								path: '/update',
								element: <BookUpdatePage />,
							},
						],
					},
					{
						path: '/upload',
						element: <BookUpload />,
					},
				],
			},
			{
				id: 'upload',
				path: '/upload',
				element: <UploadPage />,
			},
		],
	},
	{
		id: 'not-found',
		path: '*',
		element: <PageNotFound />,
	},
];

export default coreRoutes;
