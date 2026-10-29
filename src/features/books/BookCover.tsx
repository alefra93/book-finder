import { useState } from 'react';
import type { ImageLinks } from '../../types/books';
import { getCoverUrl, PLACEHOLDER_COVER } from '../../utils/cover';

interface BookCoverProps {
  imageLinks?: ImageLinks;
  title: string;
  size?: 'list' | 'detail';
  className?: string;
}

export function BookCover({ imageLinks, title, size = 'list', className = '' }: BookCoverProps) {
  // Some thumbnails exist in the payload but fail to load: fall back to the placeholder.
  const [failed, setFailed] = useState(false);
  const src = failed ? PLACEHOLDER_COVER : getCoverUrl(imageLinks, size);

  return (
    <img
      src={src}
      alt={`Cover of ${title}`}
      className={`book-cover ${className}`}
      width={400}
      height={600}
      loading={size === 'list' ? 'lazy' : 'eager'}
      onError={() => setFailed(true)}
    />
  );
}
