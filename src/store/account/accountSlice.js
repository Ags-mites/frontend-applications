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
    setEditAccount: (state, action) => {
      state.account = state.account.map( account => {
        if (account.id ===action.payload.id){
          return action.payload;
        }
        return account;
      })
    },
    addNewAccount: (state, action)=>{
      state.account.push( action.payload );
      state.isSaving = false;
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
  setEditAccount,
  clearActiveItem,
  addNewAccount,
} = accountSlice.actions;
