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
    addNewAccount: (state, action) => {
      state.account.push(action.payload);
      state.isSaving = false;
    },
    setEditAccount: (state, action) => {
      state.account = state.account.map((account) => {
        if (account.id === action.payload.id) {
          return action.payload;
        }
        return account;
      });
    },
    setDeleteAccount: (state, action) => {
      state.account = state.account.filter((account) => account.id !== action.payload);
    },
    addNewAccountType: (state, action) => {
      state.accountType.push(action.payload);
      state.isSaving = false;
    },
    setEditAccountType: (state, action) => {
      state.accountType = state.accountType.map((accountType) => {
        if (accountType.id === action.payload.id) {
          return action.payload;
        }
        return accountType;
      });
    },
    setDeleteAccountType: (state, action) => {
      state.accountType = state.accountType.filter((accountType) => accountType.id !== action.payload);
    },
    clearActiveItem: (state) => {
      state.activeTable = true;
    },
  },
});

export const {
  addNewAccount,
  addNewAccountType,
  clearActiveItem,
  savingNewItem,
  setCreateItem,
  setData,
  setDeleteAccount,
  setDeleteAccountType,
  setEditAccount,
  setEditAccountType,
} = accountSlice.actions;
