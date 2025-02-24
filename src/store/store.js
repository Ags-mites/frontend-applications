import { configureStore } from "@reduxjs/toolkit";
import { authSlice, accountSlice, reasonSlice } from "./";
import { invoiceSlice } from "./invoice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    app: accountSlice.reducer,
    reasons: reasonSlice.reducer,
    invoce: invoiceSlice.reducer,
  },
});
