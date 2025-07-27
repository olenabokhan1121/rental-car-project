import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { autoReducer } from './auto/slice.js';
import { filtersReducer } from './filters/slice.js';


const persistedAutoReducer = persistReducer(
  {
    key: "auto",
    storage,
  },
  autoReducer
);
export const store = configureStore({
  reducer: {
    auto: persistedAutoReducer,
    filters: filtersReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
