import type { Volume } from '../../types/books';
import { BookListItem } from './BookListItem';

export function BookList({ volumes }: { volumes: Volume[] }) {
  return (
    <ul className="row row-cols-1 row-cols-lg-2 g-3 list-unstyled mb-0">
      {volumes.map((volume) => (
        <li key={volume.id} className="col">
          <BookListItem volume={volume} />
        </li>
      ))}
    </ul>
  );
}
