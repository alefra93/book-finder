import { Link } from 'react-router-dom';
import type { Volume } from '../../types/books';
import { BookCover } from './BookCover';
import type { BookLocationState } from './bookLocationState';

export function BookListItem({ volume }: { volume: Volume }) {
  const { title, subtitle, authors, publishedDate, description, imageLinks } = volume.volumeInfo;
  const year = publishedDate?.slice(0, 4);
  const state: BookLocationState = { preview: volume, fromSearch: true };

  return (
    <article className="card book-list-item h-100">
      <div className="card-body d-flex gap-3">
        <BookCover imageLinks={imageLinks} title={title} className="book-list-item__cover" />
        <div className="min-w-0">
          <h2 className="h6 mb-1">
            <Link
              to={`/book/${encodeURIComponent(volume.id)}`}
              state={state}
              className="stretched-link text-body text-decoration-none"
            >
              {title}
            </Link>
          </h2>
          {subtitle && <p className="small text-body-secondary mb-1 text-truncate">{subtitle}</p>}
          <p className="small mb-2">
            {authors?.join(', ') ?? 'Unknown author'}
            {year && <span className="text-body-secondary"> · {year}</span>}
          </p>
          <p className="line-clamp-2 small text-body-secondary mb-0">
            {description ?? 'No description available.'}
          </p>
        </div>
      </div>
    </article>
  );
}
