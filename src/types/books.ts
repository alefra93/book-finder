// Subset of the Google Books "volume" resource actually used by the app.
// Reference: https://developers.google.com/books/docs/v1/reference/volumes

export interface ImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
}

export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: IndustryIdentifier[];
  pageCount?: number;
  categories?: string[];
  language?: string;
  imageLinks?: ImageLinks;
  infoLink?: string;
}

export interface Volume {
  id: string;
  volumeInfo: VolumeInfo;
}

/** Raw response of `GET /volumes`: `items` is omitted when nothing matches. */
export interface VolumesResponse {
  totalItems?: number;
  items?: Volume[];
}

export interface SearchResult {
  totalItems: number;
  items: Volume[];
}

export interface SearchArgs {
  query: string;
  page: number;
  pageSize: number;
}
