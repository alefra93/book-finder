import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SearchArgs, SearchResult, Volume, VolumesResponse } from '../types/books';

const API_KEY: string | undefined = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || undefined;

// Partial response: only ask for what the list view renders.
const SEARCH_FIELDS =
  'totalItems,items(id,volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks(smallThumbnail,thumbnail),infoLink))';

const withApiKey = <T extends Record<string, unknown>>(params: T) =>
  API_KEY ? { ...params, key: API_KEY } : params;

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.googleapis.com/books/v1/' }),
  // Pages already visited stay cached for 5 minutes: going back is instant.
  keepUnusedDataFor: 300,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    searchVolumes: build.query<SearchResult, SearchArgs>({
      query: ({ query, page, pageSize }) => ({
        url: 'volumes',
        params: withApiKey({
          q: query,
          startIndex: (page - 1) * pageSize,
          maxResults: pageSize,
          fields: SEARCH_FIELDS,
        }),
      }),
      transformResponse: (response: VolumesResponse): SearchResult => ({
        totalItems: response.totalItems ?? 0,
        items: response.items ?? [],
      }),
    }),
    getVolume: build.query<Volume, string>({
      query: (id) => ({ url: `volumes/${encodeURIComponent(id)}`, params: withApiKey({}) }),
    }),
  }),
});

export const { useSearchVolumesQuery, useGetVolumeQuery } = booksApi;
