import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface GoogleApiErrorBody {
  error?: { message?: string };
}

/** Turns an RTK Query error into a message that makes sense to the user. */
export function getErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string {
  if (!error) return 'Something went wrong.';

  if (!('status' in error)) return error.message ?? 'Something went wrong.';

  switch (error.status) {
    case 'FETCH_ERROR':
      return 'Network error: check your connection and try again.';
    case 'TIMEOUT_ERROR':
      return 'The request timed out. Please try again.';
    case 'PARSING_ERROR':
      return 'The server returned an unexpected response.';
    case 429:
      // Anonymous calls share a daily quota: it can run out regardless of our own traffic.
      return 'Too many requests: the Google Books API quota was exceeded. Please try again later.';
  }

  const apiMessage = (error.data as GoogleApiErrorBody | undefined)?.error?.message;
  return apiMessage
    ? `${apiMessage} (HTTP ${error.status})`
    : `Request failed (HTTP ${error.status}).`;
}
