import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  children?: ReactNode;
}

export function EmptyState({ title, children }: EmptyStateProps) {
  return (
    <div className="text-center py-5 px-3 text-body-secondary">
      <p className="h5 text-body">{title}</p>
      {children}
    </div>
  );
}
