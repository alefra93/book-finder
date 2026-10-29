import { getErrorMessage } from './apiError';

describe('getErrorMessage', () => {
  it('explains rate limiting', () => {
    expect(getErrorMessage({ status: 429, data: {} })).toMatch(/quota was exceeded/);
  });

  it('explains network failures', () => {
    expect(getErrorMessage({ status: 'FETCH_ERROR', error: 'TypeError' })).toMatch(/Network error/);
  });

  it('uses the message returned by Google when available', () => {
    const error = { status: 400, data: { error: { message: 'Missing query.' } } };
    expect(getErrorMessage(error)).toBe('Missing query. (HTTP 400)');
  });

  it('falls back to the HTTP status', () => {
    expect(getErrorMessage({ status: 503, data: undefined })).toBe('Request failed (HTTP 503).');
  });
});
