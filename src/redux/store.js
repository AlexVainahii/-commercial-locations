import { filterSlice } from './Filter/filterSlice';
import { mapSlice } from './MapType/mapSlice';
import { commercialSlice } from './Comercial/commercialSlice';
import { authSlice } from './Auth/authSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
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
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
const mapPersistConfig = {
  key: 'map',
  storage,
};
export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    commerces: commercialSlice.reducer,
    filter: filterSlice.reducer,
    map: persistReducer(mapPersistConfig, mapSlice.reducer),
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});
export const persistor = persistStore(store);
