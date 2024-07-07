import { configureStore } from '@reduxjs/toolkit';
import { suggestionsApi } from '../services/suggestionsApi';
import { authApi } from '../services/authApi';
import { ratiosApi } from '../services/ratiosApi';

export const store = configureStore({
  reducer: {
    [suggestionsApi.reducerPath]: suggestionsApi.reducer,
    [ratiosApi.reducerPath]: ratiosApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(suggestionsApi.middleware, ratiosApi.middleware, authApi.middleware),
});
