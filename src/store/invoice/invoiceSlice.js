import { createSlice } from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    isSaving: false,
    messageSaved: "",
    activeTable: true,
    Clients: [],
    Cities: [],
    Invoice: [],
  },
  reducers: {
    savingNewItem: (state) => {
      state.isSaving = true;
    },
    setData: (state, action) => {
      const { resource, data } = action.payload;
      state[resource] = data;
    },
    addNewCity: (state, action) => {
      state.cities.push(action.payload);
      state.isSaving = false;
    },
    //todo continuar con los cambios:
    setEditcities: (state, action) => {
      state.citiess = state.citiess.map((cities) => {
        if (cities.id === action.payload.id) {
          return action.payload;
        }
        return cities;
      });
    },
    setDeletecities: (state, action) => {
      state.citiess = state.citiess.filter(
        (cities) => cities.id !== action.payload
      );
    },
  },
});

export const { setData, addNewCity } = invoiceSlice.actions;
