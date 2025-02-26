import Swal from "sweetalert2";
import {
  getAllResourse,
  createResourse,
  updateResourse,
  deleteResourse,
} from "../../use-cases";
import {
  addNewCity,
  setEditCity,
  setDeleteCity,
  addNewClient,
  setEditClient,
  setDeleteClient,
  addNewInvoice,
  setEditInvoice,
  setDeleteInvoice,
  setError,
  startLoading,
  setData,
} from "./invoiceSlice";

// Función para cargar datos de un recurso específico
export const startLoadingDataInvoice = (resource) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      if (!uid) throw new Error("El UID del usuario no existe");

      // Mostrar mensaje de carga
      showLoading(`Obteniendo datos de ${resource}...`);

      // Obtener datos del recurso
      const data = await getAllResourse(resource);

      // Guardar los datos en el estado de Redux
      dispatch(setData({ resource, data }));

      // Mostrar alerta de éxito
      showAlert({
        icon: "success",
        title: "Datos cargados",
        text: `Los datos de ${resource} se cargaron correctamente.`,
      });
    } catch (error) {
      // Mostrar alerta de error
      showAlert({
        icon: "error",
        title: "Error al cargar datos",
        text: error.message || "Hubo un problema al obtener los datos.",
        showConfirmButton: true,
      });
    }
  };
};

// Crear una nueva ciudad
export const newCity = ({ code, name }) => {
  return async (dispatch) => {
    try {
      const newCity = {
        code,
        name,
        createdAt: new Date().toISOString() // Agregar fecha actual
      };

      // Crear la ciudad en el backend
      const res = await createResourse(newCity, "cities");

      // Actualizar el estado de Redux
      dispatch(addNewCity(res));

      // Mostrar alerta de éxito
      showAlert({
        icon: "success",
        title: "Ciudad creada",
        text: `La ciudad ${name} ha sido creada correctamente.`,
      });
    } catch (error) {
      // Mostrar alerta de error
      showAlert({
        icon: "error",
        title: "Error al crear la ciudad",
        text: error.message || "No se pudo guardar la información.",
        showConfirmButton: true,
      });
    }
  };
};

// Editar una ciudad existente
export const editCity = ({ id, code, name }) => {
  return async (dispatch) => {
    try {
      const editCity = { id, code, name };

      // Actualizar la ciudad en el backend
      const res = await updateResourse(editCity, "cities", id);

      // Actualizar el estado de Redux
      dispatch(setEditCity(res));

      // Mostrar alerta de éxito
      showAlert({
        icon: "success",
        title: "Ciudad actualizada",
        text: `La ciudad ${name} ha sido modificada correctamente.`,
      });
    } catch (error) {
      // Mostrar alerta de error
      showAlert({
        icon: "error",
        title: "Error al actualizar la ciudad",
        text: error.message || "No se pudo actualizar la información.",
        showConfirmButton: true,
      });
    }
  };
};

// Eliminar una ciudad
export const deleteCity = (id) => {
  return async (dispatch) => {
    try {
      // Eliminar la ciudad en el backend
      await deleteResourse("cities", id);

      // Actualizar el estado de Redux
      dispatch(setDeleteCity(id));

      // Mostrar alerta de éxito
      showAlert({
        icon: "success",
        title: "Ciudad eliminada",
        text: "La ciudad ha sido eliminada correctamente.",
      });
    } catch (error) {
      // Mostrar alerta de error
      showAlert({
        icon: "error",
        title: "Error al eliminar la ciudad",
        text: error.message || "No se pudo eliminar la ciudad.",
        showConfirmButton: true,
      });
    }
  };
};

// Operaciones CRUD para Clientes
// Función para crear un nuevo cliente
export const newClient = (clientData) => {
  return async (dispatch) => {
    try {
      const res = await createResourse(clientData, "clients");
      dispatch(addNewClient(res));
      showAlert({
        icon: "success",
        title: "Cliente creado",
        text: "El cliente ha sido registrado correctamente.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al crear cliente",
        text: error.message || "No se pudo registrar el cliente.",
      });
    }
  };
};

// Función para editar un cliente existente
export const editClient = ({ id, ruc, name, address }) => {
  return async (dispatch) => {
    try {
      const updatedClient = { id, ruc, name, address };
      const res = await updateResourse(updatedClient, "clients", id);
      dispatch(setEditClient(res));
      showAlert({
        icon: "success",
        title: "Cliente actualizado",
        text: "La información del cliente ha sido modificada.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al actualizar cliente",
        text: error.message || "No se pudo actualizar la información.",
      });
    }
  };
};

// Función para eliminar un cliente
export const deleteClient = (id) => {
  return async (dispatch) => {
    try {
      await deleteResourse("clients", id);
      dispatch(setDeleteClient(id));
      showAlert({
        icon: "success",
        title: "Cliente eliminado",
        text: "El cliente ha sido eliminado correctamente.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al eliminar cliente",
        text: error.message || "No se pudo eliminar el cliente.",
      });
    }
  };
};

// Operaciones CRUD para Facturas
// Crear nueva factura

export const newInvoice = ({
  cityId,
  clientId,
  date,
  entries,
  invoiceNumber
}) => async (dispatch) => {
  try {

    if (!entries || entries.length === 0) {
      throw new Error("Debe agregar al menos un artículo");
    }
    const invoiceData = {
      invoiceNumber,
      date,
      cityId,
      clientId,
      invoiceDetails: entries.map(({
        article,
        quantity,
        price
      }) => ({ article, quantity: +quantity, price: +price })),
    };
    
    console.log("Datos a enviar:", invoiceData);
    const res = await createResourse(invoiceData, "invoices");
    dispatch(addNewInvoice(res));

    showAlert({
      icon: "success",
      title: "¡Factura creada!",
      text: `Factura ${res.invoiceNumber} registrada correctamente`
    });
  } catch (error) {
    dispatch(setError(error.message)); // Actualiza el estado con el error
    showAlert({
      icon: "error",
      title: "Error al crear factura",
      text: error.message
    });
  }
};

// Editar factura existente
export const editInvoice = ({
  id,
  cityId,
  clientId,
  date,
  entries,
  invoiceNumber }) => async (dispatch) => {
  try {
    dispatch(startLoading());
    showLoading("Actualizando factura...");

    const invoiceData = {
      id,
      invoiceNumber,
      date,
      cityId,
      clientId,
      invoiceDetails: entries.map(({
        article,
        quantity,
        price
      }) => ({ article, quantity: +quantity, price: +price })),
    };

    const res = await updateResourse(invoiceData, "invoices", id);
    dispatch(setEditInvoice(res));

    showAlert({
      icon: "success",
      title: "¡Factura actualizada!",
      text: `Factura ${res.invoiceNumber} modificada correctamente`
    });
  } catch (error) {
    dispatch(setError(error.message));
    showAlert({
      icon: "error",
      title: "Error al actualizar",
      text: error.message
    });
  }
};

// Eliminar factura
export const deleteInvoice = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());
    showLoading("Eliminando factura...");

    await deleteResourse("invoices", id);
    dispatch(setDeleteInvoice(id));

    showAlert({
      icon: "success",
      title: "¡Factura eliminada!",
      text: "La factura fue borrada del sistema"
    });
  } catch (error) {
    dispatch(setError(error.message));
    showAlert({
      icon: "error",
      title: "Error al eliminar",
      text: error.message
    });
  }
};

// Función auxiliar para mostrar alertas
const showAlert = ({
  icon,
  title,
  text,
  timer = 2000,
  showConfirmButton = false,
}) => {
  Swal.fire({
    icon,
    title,
    text,
    timer,
    showConfirmButton,
  });
};

// Función auxiliar para mostrar mensajes de carga
const showLoading = (message) => {
  Swal.fire({
    title: "Cargando...",
    text: message,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};