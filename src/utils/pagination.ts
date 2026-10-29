export type PageItem = number | 'ellipsis';

export function getPageCount(totalItems: number, pageSize: number): number {
  if (totalItems <= 0 || pageSize <= 0) return 0;
  return Math.ceil(totalItems / pageSize);
}

const range = (from: number, to: number): number[] =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

/**
 * Builds the list of page buttons to render, always keeping first, last and
 * `siblings` pages around the current one, e.g. `1 … 4 5 6 … 20`.
 * The output length is constant (2 * siblings + 5) once there are enough pages,
 * so the paginator does not jump around while navigating.
 */
export function getPageWindow(current: number, total: number, siblings = 1): PageItem[] {
  const slots = siblings * 2 + 5;
  if (total <= slots) return range(1, total);

  const left = Math.max(current - siblings, 1);
  const right = Math.min(current + siblings, total);
  const showLeftEllipsis = left > 3;
  const showRightEllipsis = right < total - 2;
  const edgeCount = 3 + siblings * 2;

  if (!showLeftEllipsis) return [...range(1, edgeCount), 'ellipsis', total];
  if (!showRightEllipsis) return [1, 'ellipsis', ...range(total - edgeCount + 1, total)];
  return [1, 'ellipsis', ...range(left, right), 'ellipsis', total];
}
