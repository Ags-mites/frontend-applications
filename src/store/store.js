
import { configureStore } from '@reduxjs/toolkit';
import { authSlice, accountSlice, reasonSlice } from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    app: accountSlice.reducer,
    reasons: reasonSlice.reducer
  },
});