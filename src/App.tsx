import { Link, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage';
import { BookDetailPage } from './features/books/BookDetailPage';
import { SearchPage } from './features/search/SearchPage';

export function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="navbar bg-body border-bottom">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-semibold">
            <span className="brand-mark" aria-hidden="true" />
            Book Finder
          </Link>
        </div>
      </header>

      <main className="container flex-grow-1 py-4">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="border-top py-3 small text-body-secondary">
        <div className="container">Data from the Google Books API.</div>
      </footer>
    </div>
  );
}
