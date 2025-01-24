
import { configureStore } from '@reduxjs/toolkit';
import { authSlice, accountSlice } from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    app: accountSlice.reducer,
  },
});