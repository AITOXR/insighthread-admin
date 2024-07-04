
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const suggestionsApi = createApi({
  reducerPath: 'suggestionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getSuggestions: builder.query({
      query: (searchTerm) => `suggestions?searchTerm=${searchTerm}`,
    }),
    
  }),
});

export const { useGetSuggestionsQuery } = suggestionsApi;
