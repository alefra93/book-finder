import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseSearchParams, toSearchParams, type PageSize, type SearchState } from './searchParams';

/**
 * The URL is the single source of truth for the search: it survives reloads,
 * can be shared, and the browser Back button restores the previous results.
 */
export function useSearchParamsState() {
  const [searchParams, setSearchParams] = useSearchParams();
  const state = useMemo(() => parseSearchParams(searchParams), [searchParams]);

  const update = useCallback(
    (patch: Partial<SearchState>, replace = false) =>
      setSearchParams((prev) => toSearchParams({ ...parseSearchParams(prev), ...patch }), {
        replace,
      }),
    [setSearchParams],
  );

  // Typing replaces the history entry, otherwise Back would undo one character at a time.
  const setQuery = useCallback((query: string) => update({ query, page: 1 }, true), [update]);
  const setPage = useCallback((page: number) => update({ page }), [update]);
  const setPageSize = useCallback((pageSize: PageSize) => update({ pageSize, page: 1 }), [update]);

  return { ...state, setQuery, setPage, setPageSize };
}
