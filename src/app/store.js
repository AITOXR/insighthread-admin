import { configureStore } from '@reduxjs/toolkit';
import { suggestionsApi } from '../services/suggestionsApi';
import { authApi } from '../services/authApi';
import { ratiosApi } from '../services/ratiosApi';
import { viewDataApi } from '../services/viewApi';
import { usersApi } from '../services/userApi';
import { plansApi } from '../services/plansApi';

export const store = configureStore({
  reducer: {
    [suggestionsApi.reducerPath]: suggestionsApi.reducer,
    [ratiosApi.reducerPath]: ratiosApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [viewDataApi.reducerPath]: viewDataApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [plansApi.reducerPath]: plansApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      suggestionsApi.middleware,
      ratiosApi.middleware,
      authApi.middleware,
      viewDataApi.middleware,
      usersApi.middleware,
      plansApi.middleware,
    ),
});
