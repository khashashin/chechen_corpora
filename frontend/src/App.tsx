import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import SearchPage from './pages/search';
import PageNotFound from './pages/PageNotFound';
import RequireAuth from './pages/RequireAuth';
import WordsPage from './pages/words';
import AuthWrapper from './pages/auth/auth-wrapper';
import Login from './pages/auth/login';
import Logout from './pages/auth/logout';
import Registration from './pages/auth/register';
import ForgotPassword from './pages/auth/forgot-password';
import Recovery from './pages/auth/recovery';
import Verify from './pages/auth/verify';
import AppShell from './layout/shell';
import BooksPage from './pages/books';
import BooksAdd from './pages/books/book-add';
import BookDetailsPage from './pages/books/book-details';
import BookUpdatePage from './pages/books/book-update';
import BookUpload from './pages/books/book-upload';
import ArticlesPage from './pages/articles';
import ArticleAdd from './pages/articles/article-add';
import ArticleDetailsPage from './pages/articles/article-details';
import DiverseMaterials from './pages/diverse-materials';
import AddMaterial from './pages/diverse-materials/add';
import UploadPage from './pages/upload';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Outlet />}>
				{/* public routes */}
				<Route path='/' element={<HomePage />} />
				<Route path='/search' element={<SearchPage />} />
				<Route path='/words' element={<WordsPage />} />
				<Route path='/auth' element={<AuthWrapper />}>
					<Route path='/auth' element={<Navigate to='/auth/login' replace />} />
					<Route path='/auth/login' element={<Login />} />
					<Route path='/auth/register' element={<Registration />} />
					<Route path='/auth/logout' element={<Logout />} />
					<Route path='/auth/forgot-password' element={<ForgotPassword />} />
					<Route path='/auth/recovery' element={<Recovery />} />
					<Route path='/auth/verify' element={<Verify />} />
				</Route>

				{/* private routes */}
				<Route element={<RequireAuth />}>
					<Route path='/admin' element={<AppShell />}>
						<Route path='/admin' element={<Navigate to='/admin/books' replace />} />
						<Route path='/admin/books' element={<BooksPage />} />
						<Route path='/admin/books/add' element={<BooksAdd />} />
						<Route path='/admin/books/:bookId' element={<BookDetailsPage />} />
						<Route path='/admin/books/:bookId/update' element={<BookUpdatePage />} />
						<Route path='/admin/books/upload' element={<BookUpload />} />

						<Route path='/admin/articles' element={<ArticlesPage />} />
						<Route path='/admin/articles/add' element={<ArticleAdd />} />
						<Route path='/admin/articles/:articleId' element={<ArticleDetailsPage />} />

						<Route path='/admin/diverse-materials' element={<DiverseMaterials />} />
						<Route path='/admin/diverse-materials/add' element={<AddMaterial />} />

						<Route path='/admin/upload' element={<UploadPage />} />
					</Route>
				</Route>

				{/* catch all */}
				<Route path='*' element={<PageNotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
