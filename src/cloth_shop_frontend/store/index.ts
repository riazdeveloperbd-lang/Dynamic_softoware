import { configureStore } from '@reduxjs/toolkit';
import { dummyApi } from './api/dummyApi';
import appReducer from './slices/appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    [dummyApi.reducerPath]: dummyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
