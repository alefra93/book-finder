import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="text-center py-5">
      <h1 className="h3">Page not found</h1>
      <Link to="/" className="btn btn-primary mt-3">
        Go to search
      </Link>
    </div>
  );
}
