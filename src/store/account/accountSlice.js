import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "app",
  initialState: {
    isSaving: false,
    messageSaved: "",
    activeTable: true,
    accounts: [],
    accountTypes: [],
    vouchers: [],
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
      state.accounts.push(action.payload);
      state.isSaving = false;
    },
    setEditAccount: (state, action) => {
      state.accounts = state.accounts.map((account) => {
        if (account.id === action.payload.id) {
          return action.payload;
        }
        return account;
      });
    },
    setDeleteAccount: (state, action) => {
      state.accounts = state.accounts.filter((account) => account.id !== action.payload);
    },
    addNewAccountType: (state, action) => {
      state.accountTypes.push(action.payload);
      state.isSaving = false;
    },
    setEditAccountType: (state, action) => {
      state.accountTypes = state.accountTypes.map((accountType) => {
        if (accountType.id === action.payload.id) {
          return action.payload;
        }
        return accountType;
      });
    },
    setDeleteAccountType: (state, action) => {
      state.accountTypes = state.accountTypes.filter((accountType) => accountType.id !== action.payload);
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
