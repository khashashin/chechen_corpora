import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import HomePage from './pages/home/Home';
import RequireAuth from './pages/admin/RequireAuth';
import SearchPage from './pages/search/Search';
import WordsPage from './pages/words/Words';
import LoadingScreen from './components/LoadingScreen';

const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const AuthWrapper = lazy(() => import('./pages/auth/AuthWrapper'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const RecoveryEmailSent = lazy(() => import('./pages/auth/RecoveryEmailSent'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const AccountConfirm = lazy(() => import('./pages/auth/AccountConfirm'));
const Logout = lazy(() => import('./pages/auth/Logout'));
const AppShell = lazy(() => import('./pages/admin/AppShell'));
const BooksPage = lazy(() => import('./pages/admin/books/Books'));
const BooksAdd = lazy(() => import('./pages/admin/books/BookAdd'));
const BookDetailsPage = lazy(() => import('./pages/admin/books/BookDetails'));
const ArticlesPage = lazy(() => import('./pages/admin/articles/Articles'));
const ArticleDtls = lazy(() => import('./pages/admin/articles/ArticleDetails'));

// prettier-ignore
function S({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingScreen title="Загрузка администраторского контента..." />}>
      {children}
    </Suspense>
  );
}

// prettier-ignore
function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/words" element={<WordsPage />} />
        <Route path="/auth" element={<S><AuthWrapper /></S>}>
          <Route path="/auth/login" element={<S><Login /></S>} />
          <Route path="/auth/register" element={<S><Register /></S>} />
          <Route path="/auth/forgot-password" element={<S><ForgotPassword /></S>} />
          <Route path="/auth/confirm-email" element={<S><RecoveryEmailSent /></S>} />
          <Route path="/auth/logout" element={<S><Logout /></S>} />
          <Route path="/auth/recovery" element={<S><ResetPassword /></S>} />
          <Route path="/auth/account-confirm" element={<S><AccountConfirm /></S>} />
        </Route>

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<S><AppShell /></S>}>
            <Route path="/admin" element={<Navigate to="/admin/books" replace />} />
            <Route path="/admin/books" element={<S><BooksPage /></S>} />
            <Route path='/admin/books/add' element={<S><BooksAdd /></S>} />
            <Route path="/admin/books/:bookId" element={<S><BookDetailsPage /></S>} />

            <Route path='/admin/articles' element={<S><ArticlesPage /></S>} />
            <Route path='/admin/articles/:articleId' element={<S><ArticleDtls /></S>} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<S><PageNotFound /></S>} />
      </Route>
    </Routes>
  );
}

export default App;
