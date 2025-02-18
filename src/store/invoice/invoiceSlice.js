import { createSlice } from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    isSaving: false,
    messageSaved: "",
    activeTable: true,
    clients: [],
    cities: [],
    invoices: [],
  },reducers: {

  }
});

export const {} = invoiceSlice.actions;
