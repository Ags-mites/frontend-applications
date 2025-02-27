<<<<<<< HEAD
=======
// src/store/invoice/invoiceSlice.js
>>>>>>> 9cca994 (Para mi sistema)
import { createSlice } from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    isSaving: false,
    messageSaved: "",
    activeTable: true,
<<<<<<< HEAD
    Clients: [],
    Cities: [],
    Invoice: [],
  },
  reducers: {
=======
    clients: [], 
    cities: [],  
    invoices: [], 
    error: null,
  },
  reducers: {
    // Acciones comunes
>>>>>>> 9cca994 (Para mi sistema)
    savingNewItem: (state) => {
      state.isSaving = true;
    },
    setData: (state, action) => {
      const { resource, data } = action.payload;
<<<<<<< HEAD
      state[resource] = data;
    },
=======
      state[resource] = data; // Ej: resource = "cities"
    },
    startLoading: (state) => {
      state.isSaving = true; // Marcar como 'cargando'
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isSaving = false;
    },

    // Acciones para Ciudades (ya implementadas)
>>>>>>> 9cca994 (Para mi sistema)
    addNewCity: (state, action) => {
      state.cities.push(action.payload);
      state.isSaving = false;
    },
<<<<<<< HEAD
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
=======
    setEditCity: (state, action) => {
      state.cities = state.cities.map(city =>
        city.id === action.payload.id ? action.payload : city
      );
    },
    setDeleteCity: (state, action) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
    },

    // Acciones para Clientes (nuevas)
    addNewClient: (state, action) => {
      state.clients.push(action.payload);
      state.isSaving = false;
    },
    setEditClient: (state, action) => {
      state.clients = state.clients.map(client =>
        client.id === action.payload.id ? action.payload : client
      );
    },
    setDeleteClient: (state, action) => {
      state.clients = state.clients.filter(client => client.id !== action.payload);
    },

    // Acciones para Facturas (nuevas)
    addNewInvoice: (state, action) => {
      state.invoices.push(action.payload);
      state.isSaving = false;
    },
    setEditInvoice: (state, action) => {
      state.invoices = state.invoices.map(invoice =>
        invoice.id === action.payload.id ? action.payload : invoice
      );
    },
    setDeleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(invoice => invoice.id !== action.payload);
    },
  },
});

export const {
  setData,
  addNewCity, setEditCity, setDeleteCity,
  addNewClient, setEditClient, setDeleteClient,
  addNewInvoice, setEditInvoice, setDeleteInvoice,
  setError, startLoading,
} = invoiceSlice.actions;
>>>>>>> 9cca994 (Para mi sistema)
