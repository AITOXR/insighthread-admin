import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => 'admin/user/all',
    }),
    updateUserStatus: builder.mutation({
      query: ({ userId, isActive }) => ({
        url: 'admin/user/update',
        method: 'PUT',
        body: { userId, isActive },
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserStatusMutation } = usersApi;
