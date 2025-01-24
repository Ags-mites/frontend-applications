import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "app",
  initialState: {
    isSaving: false,
    messageSaved: "",
    activeTable: true,
    account: [],
    accountType: [],
    voucher: [],
    voucherType: [],
  },
  reducers: {
    savingNewItem: (state) => {
      state.isSaving = true;
    },
    setData: (state, action) => {
      const { resource, data } = action.payload;
      state[resource] = data;
    },
    setCreateItem: (state) => {
      state.activeTable = false;
    },
    setEditItem: (state, action) => {
      state.activeTable = false;
    },
    clearActiveItem: (state) => {
      state.activeTable = true;
    },
  },
});

export const {
  savingNewItem,
  setData,
  setCreateItem,
  setEditItem,
  clearActiveItem,
} = accountSlice.actions;
