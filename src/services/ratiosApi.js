import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const extractNumericId = (id) => id.split('-').pop();

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
    updateRatio: builder.mutation({
      query: (updatedRatio) => {
        const numericId = extractNumericId(updatedRatio.id);
        return {
          url: `ratios/update/id/${numericId}`,
          method: 'PUT',
          body: updatedRatio,
        };
      },
    }),
    deleteRatio: builder.mutation({
      query: (deleteRatio) => {
        const numericId = extractNumericId(deleteRatio.id);
        return {
          url: `ratios/delete/id/${numericId}`,
          method: 'DELETE',
          body: deleteRatio,
        };
      },
    }),
  }),
});

export const { 
  useSaveRatioMutation, 
  useUpdateRatioMutation, 
  useDeleteRatioMutation } = ratiosApi;
