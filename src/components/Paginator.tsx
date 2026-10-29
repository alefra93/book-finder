import { getPageWindow } from '../utils/pagination';

interface PaginatorProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function Paginator({ currentPage, pageCount, onPageChange, disabled }: PaginatorProps) {
  if (pageCount <= 1) return null;

  const items = getPageWindow(currentPage, pageCount);
  const goTo = (page: number) => {
    if (!disabled && page !== currentPage && page >= 1 && page <= pageCount) onPageChange(page);
  };

  return (
    <nav aria-label="Search results pages">
      <ul className="pagination justify-content-center flex-wrap mb-0">
        <li className={`page-item ${currentPage === 1 || disabled ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            aria-label="Previous page"
            onClick={() => goTo(currentPage - 1)}
          >
            <span aria-hidden="true">&lsaquo;</span>
          </button>
        </li>

        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${index}`} className="page-item disabled" aria-hidden="true">
              <span className="page-link">&hellip;</span>
            </li>
          ) : (
            <li
              key={item}
              className={`page-item ${item === currentPage ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
            >
              <button
                type="button"
                className="page-link"
                aria-label={`Page ${item}`}
                aria-current={item === currentPage ? 'page' : undefined}
                onClick={() => goTo(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}

        <li className={`page-item ${currentPage === pageCount || disabled ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            aria-label="Next page"
            onClick={() => goTo(currentPage + 1)}
          >
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
