import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const viewDataApi = createApi({
  reducerPath: 'viewDataApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getviewData: builder.query({
      query: () => 'view/Data',
    }),
  }),
});

export const { useGetviewDataQuery } = viewDataApi;
