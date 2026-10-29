import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Paginator } from './Paginator';

describe('Paginator', () => {
  it('renders nothing for a single page', () => {
    const { container } = render(
      <Paginator currentPage={1} pageCount={1} onPageChange={() => {}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('marks the current page and disables "previous" on the first page', () => {
    render(<Paginator currentPage={1} pageCount={10} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Previous page' }).closest('li')).toHaveClass(
      'disabled',
    );
  });

  it('notifies page changes', async () => {
    const onPageChange = vi.fn();
    render(<Paginator currentPage={5} pageCount={10} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'Next page' }));
    await userEvent.click(screen.getByRole('button', { name: 'Page 10' }));
    await userEvent.click(screen.getByRole('button', { name: 'Page 5' }));

    expect(onPageChange.mock.calls).toEqual([[6], [10]]);
  });
});
