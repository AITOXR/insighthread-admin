import { configureStore } from '@reduxjs/toolkit';
import { suggestionsApi } from '../services/suggestionsApi';
import { authApi } from '../services/authApi';

export const store = configureStore({
  reducer: {
    [suggestionsApi.reducerPath]: suggestionsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(suggestionsApi.middleware, authApi.middleware),
});
