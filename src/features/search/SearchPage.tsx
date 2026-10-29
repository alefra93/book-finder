import { useEffect } from 'react';
import { EmptyState } from '../../components/EmptyState';
import { ErrorAlert } from '../../components/ErrorAlert';
import { LoadingState } from '../../components/LoadingState';
import { Paginator } from '../../components/Paginator';
import { useSearchVolumesQuery } from '../../services/booksApi';
import { getPageCount } from '../../utils/pagination';
import { BookList } from '../books/BookList';
import { PageSizeSelect } from './PageSizeSelect';
import { SearchBar } from './SearchBar';
import { useSearchParamsState } from './useSearchParamsState';

const numberFormat = new Intl.NumberFormat('en-US');

export function SearchPage() {
  const { query, page, pageSize, setQuery, setPage, setPageSize } = useSearchParamsState();

  // `q` is mandatory for the API: with an empty query no request is sent at all.
  const { data, currentData, error, isError, isFetching, refetch } = useSearchVolumesQuery(
    { query, page, pageSize },
    { skip: !query },
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  // `data` keeps the previous result while the next page loads: show it dimmed
  // instead of flashing an empty page.
  const isStale = isFetching && !currentData;

  const renderResults = () => {
    if (!query) {
      return (
        <EmptyState title="Find your next book">
          <p className="mb-0">Start typing a title, an author or an ISBN.</p>
        </EmptyState>
      );
    }
    if (isError) return <ErrorAlert error={error} onRetry={refetch} />;
    if (!data) return <LoadingState label="Searching…" />;

    if (data.items.length === 0) {
      // totalItems is only an estimate: pages near the end can come back empty.
      return page > 1 ? (
        <EmptyState title="No more results">
          <button type="button" className="btn btn-outline-primary" onClick={() => setPage(1)}>
            Back to the first page
          </button>
        </EmptyState>
      ) : (
        <EmptyState title={`No books found for “${query}”`}>
          <p className="mb-0">Try different or fewer keywords.</p>
        </EmptyState>
      );
    }

    // Keep the current page reachable even if the estimate shrank below it.
    const pageCount = Math.max(getPageCount(data.totalItems, pageSize), page);

    return (
      <>
        <div className={`results ${isStale ? 'results--stale' : ''}`} aria-busy={isFetching}>
          <BookList volumes={data.items} />
        </div>
        <div className="mt-4">
          <Paginator currentPage={page} pageCount={pageCount} onPageChange={setPage} />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="mb-3">
        <SearchBar value={query} onSearch={setQuery} />
      </div>

      {query && (
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <p className="small text-body-secondary mb-0" aria-live="polite">
            {data && !isError && data.totalItems > 0
              ? `About ${numberFormat.format(data.totalItems)} results · page ${page}`
              : null}
            {isFetching && (
              <span
                className="spinner-border spinner-border-sm text-primary ms-2"
                aria-hidden="true"
              />
            )}
          </p>
          <PageSizeSelect value={pageSize} onChange={setPageSize} />
        </div>
      )}

      {renderResults()}
    </>
  );
}
