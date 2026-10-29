import { getPageCount, getPageWindow } from './pagination';

describe('getPageCount', () => {
  it('rounds up partial pages', () => {
    expect(getPageCount(21, 10)).toBe(3);
    expect(getPageCount(20, 5)).toBe(4);
  });

  it('returns 0 when there is nothing to show', () => {
    expect(getPageCount(0, 10)).toBe(0);
  });
});

describe('getPageWindow', () => {
  it('lists every page when they fit', () => {
    expect(getPageWindow(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPageWindow(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('collapses the right side near the start', () => {
    expect(getPageWindow(1, 20)).toEqual([1, 2, 3, 4, 5, 'ellipsis', 20]);
    expect(getPageWindow(4, 20)).toEqual([1, 2, 3, 4, 5, 'ellipsis', 20]);
  });

  it('collapses both sides in the middle', () => {
    expect(getPageWindow(10, 20)).toEqual([1, 'ellipsis', 9, 10, 11, 'ellipsis', 20]);
  });

  it('collapses the left side near the end', () => {
    expect(getPageWindow(20, 20)).toEqual([1, 'ellipsis', 16, 17, 18, 19, 20]);
  });

  it('keeps a constant length while navigating', () => {
    for (let page = 1; page <= 50; page++) {
      expect(getPageWindow(page, 50)).toHaveLength(7);
    }
  });
});
