import { createSlice } from "@reduxjs/toolkit";

export const reasonSlice = createSlice({
  name: "reason",
  initialState: {
    isSaving: false,
    messageSaved: "",
    activeTable: true,
    reasons: [],
    workers: [],
    payroall: [],
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
    addNewReason: (state, action) => {
      state.reasons.push(action.payload);
      state.isSaving = false;
      console.log(action.payload)
    },
    setEditReason: (state, action) => {
      state.reasons = state.reasons.map((reason) => {
        if (reason.id === action.payload.id) {
          return action.payload;
        }
        return reason;
      });
    },
    setDeleteReason: (state, action) => {
      state.reasons = state.reasons.filter(
        (reason) => reason.id !== action.payload
      );
    },
  },
});

export const {
  setData,
  setCreateItem,
  addNewReason,
  setEditReason,
  setDeleteReason
} = reasonSlice.actions;
