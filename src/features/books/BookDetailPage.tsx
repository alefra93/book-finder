import DOMPurify from 'dompurify';
import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ErrorAlert } from '../../components/ErrorAlert';
import { LoadingState } from '../../components/LoadingState';
import { useGetVolumeQuery } from '../../services/booksApi';
import { BookCover } from './BookCover';
import type { BookLocationState } from './bookLocationState';

export function BookDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const locationState = useLocation().state as BookLocationState | null;

  const { data, error, isFetching, refetch } = useGetVolumeQuery(id);
  // Render the list data straight away, then upgrade to the full volume.
  const volume = data ?? locationState?.preview;
  const info = volume?.volumeInfo;

  // The detail endpoint returns the description as HTML.
  const descriptionHtml = useMemo(
    () => (info?.description ? DOMPurify.sanitize(info.description) : ''),
    [info?.description],
  );

  const goBack = () => (locationState?.fromSearch ? navigate(-1) : navigate('/'));

  const backButton = (
    <button type="button" className="btn btn-link px-0 mb-3" onClick={goBack}>
      &larr; Back to results
    </button>
  );

  if (!info) {
    return (
      <>
        {backButton}
        {error ? <ErrorAlert error={error} onRetry={refetch} /> : <LoadingState />}
      </>
    );
  }

  const isbn = info.industryIdentifiers?.find((item) => item.type === 'ISBN_13')?.identifier;
  const details: [string, string | number | undefined][] = [
    ['Publisher', info.publisher],
    ['Published', info.publishedDate],
    ['Pages', info.pageCount],
    ['Language', info.language?.toUpperCase()],
    ['ISBN', isbn],
  ];

  return (
    <article>
      {backButton}
      <div className="row g-4">
        <div className="col-8 col-sm-5 col-md-4 col-lg-3 mx-auto mx-sm-0">
          <BookCover
            imageLinks={info.imageLinks}
            title={info.title}
            size="detail"
            className="rounded shadow-sm"
          />
        </div>

        <div className="col-sm-7 col-md-8 col-lg-9">
          <h1 className="h2 mb-1">{info.title}</h1>
          {info.subtitle && <p className="lead text-body-secondary mb-2">{info.subtitle}</p>}
          <p className="mb-3">{info.authors?.join(', ') ?? 'Unknown author'}</p>

          {info.categories && (
            <ul className="list-inline mb-3">
              {info.categories.map((category) => (
                <li key={category} className="list-inline-item badge text-bg-light border">
                  {category}
                </li>
              ))}
            </ul>
          )}

          <dl className="row small mb-4">
            {details
              .filter(([, value]) => value !== undefined && value !== '')
              .map(([label, value]) => (
                <div key={label} className="col-6 col-md-4 mb-2">
                  <dt className="text-body-secondary fw-normal">{label}</dt>
                  <dd className="mb-0">{value}</dd>
                </div>
              ))}
          </dl>

          {info.infoLink && (
            <a
              href={info.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mb-4"
            >
              View on Google Books
            </a>
          )}

          {error && <ErrorAlert error={error} onRetry={refetch} />}
          {isFetching && !data && <LoadingState label="Loading full details…" />}

          {descriptionHtml ? (
            <section aria-labelledby="description-heading">
              <h2 id="description-heading" className="h5">
                Description
              </h2>
              <div
                className="book-description"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            </section>
          ) : (
            !isFetching && <p className="text-body-secondary">No description available.</p>
          )}
        </div>
      </div>
    </article>
  );
}
