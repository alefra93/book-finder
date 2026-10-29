export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="d-flex flex-column align-items-center gap-2 py-5 text-body-secondary">
      <div className="spinner-border text-primary" role="status" aria-hidden="true" />
      <span role="status">{label}</span>
    </div>
  );
}
