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
import WordsPage from '../../pages/words';
import AuthWrapper from '../../pages/auth/auth-wrapper';
import Logout from '../../pages/auth/logout';
import Login from '../../pages/auth/login';
import Registration from '../../pages/auth/register';
import ForgotPassword from '../../pages/auth/forgot-password';
import Recovery from '../../pages/auth/recovery';
import Verify from '../../pages/auth/verify';
import ArticlesPage from '../../pages/articles';
import ArticleAdd from '../../pages/articles/article-add';
import ArticleDetailsPage from '../../pages/articles/article-details';
import { getArticle } from '../../pages/articles/services/api';
import DiverseMaterials from '../../pages/diverse-materials';
import AddMaterial from '../../pages/diverse-materials/add';

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
				id: 'articles',
				path: '/articles',
				children: [
					{
						path: '/',
						element: <ArticlesPage />,
					},
					{
						path: '/add',
						element: <ArticleAdd />,
					},
					{
						id: 'article-details',
						path: '/:articleId',
						children: [
							{
								id: 'article-details',
								path: '/',
								loader: async ({ params }) => ({
									article: await getArticle(params.articleId),
								}),
								element: <ArticleDetailsPage />,
							},
						],
					},
				],
			},
			{
				id: 'diverseMaterials',
				path: '/diverse-materials',
				children: [
					{
						path: '/',
						element: <DiverseMaterials />,
					},
					{
						path: '/add',
						element: <AddMaterial />,
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
		id: 'auth',
		path: '/auth',
		element: (
			<AuthWrapper>
				<Outlet />
			</AuthWrapper>
		),
		children: [
			{
				id: 'login',
				path: '/login',
				element: <Login />,
			},
			{
				id: 'logout',
				path: '/logout',
				element: <Logout />,
			},
			{
				id: 'register',
				path: '/register',
				element: <Registration />,
			},
			{
				id: 'forgot-password',
				path: '/forgot-password',
				element: <ForgotPassword />,
			},
			{
				id: 'recovery',
				path: '/recovery',
				element: <Recovery />,
			},
			{
				id: 'verify',
				path: '/verify',
				element: <Verify />,
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
