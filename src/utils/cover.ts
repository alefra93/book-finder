import type { ImageLinks } from '../types/books';

export const PLACEHOLDER_COVER = 'https://placehold.co/400x600/FF5039/FFF?text=Book+Cover';

const LIST_SIZES: (keyof ImageLinks)[] = ['thumbnail', 'smallThumbnail'];
const DETAIL_SIZES: (keyof ImageLinks)[] = [
  'large',
  'medium',
  'small',
  'thumbnail',
  'smallThumbnail',
];

/**
 * Picks the best available cover and normalizes it: Google returns `http://`
 * URLs (blocked as mixed content) and a page-curl effect we don't want.
 */
export function getCoverUrl(imageLinks: ImageLinks | undefined, size: 'list' | 'detail' = 'list') {
  const keys = size === 'detail' ? DETAIL_SIZES : LIST_SIZES;
  const url = keys.map((key) => imageLinks?.[key]).find(Boolean);
  if (!url) return PLACEHOLDER_COVER;
  return url.replace(/^http:\/\//, 'https://').replace('&edge=curl', '');
}
