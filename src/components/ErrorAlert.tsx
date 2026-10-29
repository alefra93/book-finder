import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getErrorMessage } from '../utils/apiError';

interface ErrorAlertProps {
  error: FetchBaseQueryError | SerializedError | undefined;
  onRetry?: () => void;
}

export function ErrorAlert({ error, onRetry }: ErrorAlertProps) {
  return (
    <div
      className="alert alert-danger d-flex flex-column flex-sm-row align-items-sm-center gap-2"
      role="alert"
    >
      <span className="flex-grow-1">{getErrorMessage(error)}</span>
      {onRetry && (
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
