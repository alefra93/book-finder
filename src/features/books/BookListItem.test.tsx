import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { Volume } from '../../types/books';
import { PLACEHOLDER_COVER } from '../../utils/cover';
import { BookListItem } from './BookListItem';

const renderItem = (volume: Volume) =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <BookListItem volume={volume} />
    </MemoryRouter>,
  );

describe('BookListItem', () => {
  it('links to the detail page', () => {
    renderItem({ id: 'abc 1', volumeInfo: { title: 'Dune', authors: ['Frank Herbert'] } });

    expect(screen.getByRole('link', { name: 'Dune' })).toHaveAttribute('href', '/book/abc%201');
    expect(screen.getByText('Frank Herbert')).toBeInTheDocument();
  });

  it('shows the placeholder when the book has no cover', () => {
    renderItem({ id: '1', volumeInfo: { title: 'No cover' } });
    expect(screen.getByRole('img')).toHaveAttribute('src', PLACEHOLDER_COVER);
  });

  it('falls back to the placeholder when the cover fails to load', () => {
    renderItem({
      id: '1',
      volumeInfo: { title: 'Broken', imageLinks: { thumbnail: 'https://example.com/x.jpg' } },
    });
    const image = screen.getByRole('img');
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', PLACEHOLDER_COVER);
  });

  it('clamps the description to two lines', () => {
    renderItem({ id: '1', volumeInfo: { title: 'Long', description: 'A very long text' } });
    expect(screen.getByText('A very long text')).toHaveClass('line-clamp-2');
  });
});
