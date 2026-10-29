import { DEFAULT_PAGE_SIZE, parseSearchParams, toSearchParams } from './searchParams';

describe('parseSearchParams', () => {
  it('reads valid values', () => {
    expect(parseSearchParams(new URLSearchParams('q=tolkien&page=3&size=15'))).toEqual({
      query: 'tolkien',
      page: 3,
      pageSize: 15,
    });
  });

  it('falls back to defaults for missing or invalid values', () => {
    for (const search of ['', 'page=0&size=7', 'page=-2&size=abc', 'page=1.5&size=100']) {
      expect(parseSearchParams(new URLSearchParams(search))).toEqual({
        query: '',
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
      });
    }
  });
});

describe('toSearchParams', () => {
  it('omits default values', () => {
    expect(toSearchParams({ query: 'dune', page: 1, pageSize: DEFAULT_PAGE_SIZE }).toString()).toBe(
      'q=dune',
    );
  });

  it('round-trips with parseSearchParams', () => {
    const state = { query: 'harry potter', page: 4, pageSize: 20 } as const;
    expect(parseSearchParams(toSearchParams(state))).toEqual(state);
  });
});
