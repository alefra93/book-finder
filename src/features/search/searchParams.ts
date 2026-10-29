export const PAGE_SIZES = [5, 10, 15, 20] as const;
export type PageSize = (typeof PAGE_SIZES)[number];
export const DEFAULT_PAGE_SIZE: PageSize = 10;

export interface SearchState {
  query: string;
  page: number;
  pageSize: PageSize;
}

export const isPageSize = (value: number): value is PageSize =>
  (PAGE_SIZES as readonly number[]).includes(value);

/** Reads the search state from the URL, falling back to defaults for invalid values. */
export function parseSearchParams(params: URLSearchParams): SearchState {
  const page = Number(params.get('page'));
  const pageSize = Number(params.get('size'));

  return {
    query: params.get('q') ?? '',
    page: Number.isInteger(page) && page > 0 ? page : 1,
    pageSize: isPageSize(pageSize) ? pageSize : DEFAULT_PAGE_SIZE,
  };
}

/** Inverse of `parseSearchParams`; default values are omitted to keep URLs short. */
export function toSearchParams({ query, page, pageSize }: SearchState): URLSearchParams {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (page > 1) params.set('page', String(page));
  if (pageSize !== DEFAULT_PAGE_SIZE) params.set('size', String(pageSize));
  return params;
}
