import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const ratiosApi = createApi({
  reducerPath: 'ratiosApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    saveRatio: builder.mutation({
      query: (newRatio) => ({
        url: 'ratios',
        method: 'POST',
        body: newRatio,
      }),
    }),
  }),
});

export const { useSaveRatioMutation } = ratiosApi;
