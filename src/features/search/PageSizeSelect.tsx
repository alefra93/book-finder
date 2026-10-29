import { PAGE_SIZES, isPageSize, type PageSize } from './searchParams';

interface PageSizeSelectProps {
  value: PageSize;
  onChange: (pageSize: PageSize) => void;
}

export function PageSizeSelect({ value, onChange }: PageSizeSelectProps) {
  return (
    <div className="d-flex align-items-center gap-2">
      <label htmlFor="page-size" className="text-nowrap small text-body-secondary">
        Per page
      </label>
      <select
        id="page-size"
        className="form-select form-select-sm w-auto"
        value={value}
        onChange={(event) => {
          const size = Number(event.target.value);
          if (isPageSize(size)) onChange(size);
        }}
      >
        {PAGE_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}
