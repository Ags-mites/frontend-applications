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
    report: [],
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
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload
      );
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
      state.accountTypes = state.accountTypes.filter(
        (accountType) => accountType.id !== action.payload
      );
    },
    addNewEntry: (state, action) => {
      state.vouchers.push(action.payload);
      state.isSaving = false;
    },
    setEditEntry: (state, action) => {
      state.vouchers = state.vouchers.map((voucher) => {
        if (voucher.id === action.payload.id) {
          return action.payload;
        }
        return voucher;
      });
    },
    setDeleteEntry: (state, action) => {
      state.vouchers = state.vouchers.filter(
        (voucher) => voucher.id !== action.payload
      );
    },
    setDataReport:  (state, action) => {
      const {  data } = action.payload;
      state.report = data
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
  addNewEntry,
  setEditEntry,
  setDeleteEntry,
  setDataReport,
} = accountSlice.actions;
