import { getCoverUrl, PLACEHOLDER_COVER } from './cover';

describe('getCoverUrl', () => {
  it('uses the required placeholder when there is no image', () => {
    expect(getCoverUrl(undefined)).toBe(PLACEHOLDER_COVER);
    expect(getCoverUrl({})).toBe(PLACEHOLDER_COVER);
    expect(PLACEHOLDER_COVER).toBe('https://placehold.co/400x600/FF5039/FFF?text=Book+Cover');
  });

  it('forces https and removes the page curl', () => {
    expect(getCoverUrl({ thumbnail: 'http://books.google.com/x?id=1&zoom=1&edge=curl' })).toBe(
      'https://books.google.com/x?id=1&zoom=1',
    );
  });

  it('prefers larger images on the detail page', () => {
    const links = { thumbnail: 'https://a/thumb', large: 'https://a/large' };
    expect(getCoverUrl(links, 'list')).toBe('https://a/thumb');
    expect(getCoverUrl(links, 'detail')).toBe('https://a/large');
  });
});
