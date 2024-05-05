import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/Home';
import Login from './pages/auth/Login';
import AuthWrapper from './pages/auth/AuthWrapper';
import RequireAuth from './pages/admin/RequireAuth';
import PageNotFound from './pages/PageNotFound';
import SearchPage from './pages/search/Search';
import WordsPage from './pages/words/Words';
import AppShell from './pages/admin/AppShell';
import BooksPage from './pages/admin/books/Books';
import BookDetailsPage from './pages/admin/books/BookDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/words" element={<WordsPage />} />
        <Route path="/auth" element={<AuthWrapper />}>
          <Route path="/auth/login" element={<Login />} />
        </Route>

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AppShell />}>
            <Route
              path="/admin"
              element={<Navigate to="/admin/books" replace />}
            />
            <Route path="/admin/books" element={<BooksPage />} />
            <Route path="/admin/books/:bookId" element={<BookDetailsPage />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
