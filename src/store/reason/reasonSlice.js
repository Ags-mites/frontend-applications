import { createSlice } from "@reduxjs/toolkit";

export const reasonSlice = createSlice({
  name: "reason",
  initialState: {
    isSaving: false,
    messageSaved: "",
    activeTable: true,
    reasons: [],
    workers: [],
    payrolls: [],
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
    addNewWorker: (state, action) => {
      state.workers.push(action.payload);
      state.isSaving = false;
    },
    setEditWorker: (state, action) => {
      state.workers = state.workers.map((worker) => {
        if (worker.id === action.payload.id) {
          return action.payload;
        }
        return worker;
      });
    },
    setDeleteWorker: (state, action) => {
      state.workers = state.workers.filter(
        (worker) => worker.id !== action.payload
      );
    },
    addNewPayroll: (state, action) => {
      state.payrolls.push(action.payload);
      state.isSaving = false;
    },
    setEditPayroll: (state, action) => {
      state.payrolls = state.payrolls.map((worker) => {
        if (worker.id === action.payload.id) {
          return action.payload;
        }
        return worker;
      });
    },
    setDeletePayroll: (state, action) => {
      state.payrolls = state.payrolls.filter(
        (worker) => worker.id !== action.payload
      );
    },
  },
});

export const {
  setData,
  setCreateItem,
  addNewReason,
  setEditReason,
  setDeleteReason,
  addNewWorker,
  setEditWorker,
  setDeleteWorker,
  addNewPayroll,
  setEditPayroll,
  setDeletePayroll,
} = reasonSlice.actions;
