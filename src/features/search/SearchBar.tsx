import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

// Short enough to feel live on every keystroke, long enough to avoid
// firing one request per character while the user is typing fast.
const SEARCH_DEBOUNCE_MS = 300;

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
}

export function SearchBar({ value, onSearch }: SearchBarProps) {
  const [input, setInput] = useState(value);
  const debouncedInput = useDebouncedValue(input, SEARCH_DEBOUNCE_MS);
  const lastEmitted = useRef(value);

  const emit = (query: string) => {
    const trimmed = query.trim();
    if (trimmed === lastEmitted.current) return;
    lastEmitted.current = trimmed;
    onSearch(trimmed);
  };

  useEffect(() => {
    emit(debouncedInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to the debounced text
  }, [debouncedInput]);

  // Sync the input when the query changes from outside (Back/Forward, links).
  useEffect(() => {
    if (value !== lastEmitted.current) {
      lastEmitted.current = value;
      setInput(value);
    }
  }, [value]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    emit(input); // Enter searches immediately, skipping the debounce
  };

  return (
    <form role="search" onSubmit={handleSubmit}>
      <label htmlFor="search-input" className="visually-hidden">
        Search books
      </label>
      <input
        id="search-input"
        type="search"
        className="form-control form-control-lg"
        placeholder="Search by title, author, ISBN…"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        autoComplete="off"
        autoFocus
      />
    </form>
  );
}
