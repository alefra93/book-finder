# Book Finder

A responsive single-page app that searches the [Google Books API](https://developers.google.com/books/docs/v1/reference/volumes/list), with live search, server-side pagination and a detail page for each book.

- **Repository:** https://github.com/alefra93/book-finder
- **CodeSandbox (code + preview):** https://codesandbox.io/p/devbox/rglg2x
- **Live demo:** https://rglg2x-5173.csb.app (the Devbox may take a few seconds to wake up)

## Stack

- **React 18 + TypeScript**, bundled with **Vite**
- **Redux Toolkit + RTK Query** for server state (caching, loading/error states, refetching)
- **React Router** for the list and detail routes
- **Bootstrap 5.3** themed with **Sass** (`src/styles/_variables.scss`)
- **Vitest + Testing Library** for tests, **ESLint + Prettier** for code style

## Getting started

Requires Node.js 18 or later.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit and component tests
npm run lint
npm run build
```

### API key (recommended)

Anonymous requests to Google Books share a daily quota that is often exhausted, in which case the API answers `429` and the app shows a "quota exceeded" message. To use your own quota, create an API key in the Google Cloud Console (enable the _Books API_, then restrict the key to that API and to your HTTP referrers) and set it in `.env.local`:

```bash
cp .env.example .env.local
# VITE_GOOGLE_BOOKS_API_KEY=your-key
```

The key ends up in the client bundle, as with any browser-only app, so restrict it by referrer.

## Features

| Requirement                       | Implementation                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| Search bar, live results          | Results update as you type (300 ms debounce); Enter searches immediately                         |
| Pagination through API parameters | `startIndex = (page - 1) * size`, `maxResults = size`                                            |
| Dynamic number of pages           | `ceil(totalItems / size)`, recomputed on every response                                          |
| Page size 5 / 10 / 15 / 20        | Select in the results header; invalid values in the URL fall back to 10                          |
| Paginator                         | Windowed pages (`‹ 1 … 4 5 6 … 14 ›`) with constant width, accessible labels                     |
| Detail page with `infoLink`       | `/book/:id`, loads the full volume and links to Google Books                                     |
| Missing cover                     | `https://placehold.co/400x600/FF5039/FFF?text=Book+Cover`, also used when an image fails to load |
| Description truncated to 2 lines  | CSS `line-clamp: 2`                                                                              |
| Responsive layout                 | Bootstrap grid: one column on mobile, two from `lg`                                              |

## Architecture

```
src/
  app/store.ts               Redux store
  services/booksApi.ts       RTK Query API (searchVolumes, getVolume)
  types/books.ts             API types (only the fields in use)
  features/search/           search page, search bar, page size, URL state
  features/books/            list, list item, cover, detail page
  components/                paginator, loading / error / empty states
  utils/                     pure helpers (pagination, covers, error messages), unit tested
  hooks/useDebouncedValue.ts
  styles/                    Bootstrap theme and custom utilities
```

### State

- **The URL is the source of truth for the search** (`/?q=tolkien&page=2&size=15`): the state survives reloads, links can be shared, and Back/Forward restore previous searches. Typing replaces the current history entry so Back does not undo one character at a time; page and size changes push a new entry.
- **Redux holds server state only**, through RTK Query. No other global state is needed, so there are no hand-written slices.

### Network handling

- **Debounce**: the query is sent after 300 ms without typing. Results still update on every character, but fast typing does not fire a request per keystroke, which matters with the API's tight quota.
- **No empty requests**: `q` is mandatory for the API, so the query is skipped while the input is empty.
- **Caching**: every `(query, page, size)` combination is cached for 5 minutes. Going back to a visited page, or returning from the detail page, does not hit the network.
- **No race conditions**: each response is stored under its own arguments and the UI only reads the entry for the current ones, so a slow, outdated response can never overwrite newer results.
- **Partial responses**: the search asks only for the fields the list renders (`fields=` parameter).
- **Stale-while-loading**: when changing page, the previous results stay on screen, dimmed, until the new ones arrive.
- **Errors**: readable messages for network errors, timeouts, quota exhaustion (`429`) and API errors, with a Retry button. Data is also refetched when the connection comes back.
- **Detail page**: renders the data already known from the list immediately, then completes it with `GET /volumes/{id}`. That endpoint returns the description as HTML, which is sanitized with DOMPurify before rendering.

### API quirks

`totalItems` is an estimate: it can change between pages of the same query, and pages near the end can come back empty. The page count is recomputed on every response, the current page always stays reachable, and an empty page past the first shows "No more results" with a link back to page 1.

## Theme

Colors are customized through Bootstrap's Sass variables. The brand orange `#FF5039` (the same as the cover placeholder) only reaches a 3.2:1 contrast ratio with white text, below WCAG AA, so `$primary` is the brand color darkened by 20% (`#CC402E`, 4.8:1).
