// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './productsApi';

export const store = configureStore({
  reducer: {
      // Agrega el reducer de RTK Query
      [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
