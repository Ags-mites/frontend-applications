import { format } from "date-fns";
import Swal from "sweetalert2";
import {
  createResourse,
  deleteResourse,
  getAllResourse,
  updateResourse,
} from "../../use-cases";
import {
  addNewPayroll,
  addNewReason,
  addNewWorker,
  setData,
  setDeletePayroll,
  setDeleteReason,
  setDeleteWorker,
  setEditPayroll,
  setEditReason,
  setEditWorker,
} from "./";
import { addNewEntry } from "../account";

export const startLoadingDataReason = (resource) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      if (!uid) throw new Error("El UID del usuario no existe");

      const data = await getAllResourse(resource);
      dispatch(setData({ resource, data }));
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al cargar los datos",
        text: error.message || "Hubo un problema al obtener la información.",
      });
    }
  };
};

export const newReason = ({ code, name, type }) => {
  return async (dispatch) => {
    try {
      const newReason = { code, name, type };
      const res = await createResourse(newReason, "reasons");
      dispatch(addNewReason(res));

      showAlert({
        icon: "success",
        title: "Razón creada",
        text: "La nueva razón se ha guardado correctamente.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al crear la razón",
        text: error.message || "No se pudo guardar la información.",
      });
    }
  };
};

export const editReason = ({ id, code, name, type }) => {
  return async (dispatch) => {
    try {
      const editReason = { id, code, name, type };
      const res = await updateResourse(editReason, "reasons", id);
      dispatch(setEditReason(res));

      showAlert({
        icon: "success",
        title: "Razón actualizada",
        text: "La información de la razón ha sido modificada.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al actualizar la razón",
        text: error.message || "No se pudo actualizar la información.",
      });
    }
  };
};

export const deleteReason = (id) => {
  return async (dispatch) => {
    try {
      await deleteResourse("reasons", id);
      dispatch(setDeleteReason(id));

      showAlert({
        icon: "success",
        title: "Razón eliminada",
        text: "La razón ha sido eliminada correctamente.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al eliminar la razón",
        text: error.message || "No se pudo eliminar la razón.",
      });
    }
  };
};

export const newWorker = ({ idCard, name, dateAdmission, salary }) => {
  return async (dispatch) => {
    try {
      const newWorker = { idCard, name, dateAdmission, salary };
      const res = await createResourse(newWorker, "workers");
      dispatch(addNewWorker(res));

      showAlert({
        icon: "success",
        title: "Trabajador agregado",
        text: "El nuevo trabajador ha sido registrado correctamente.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al agregar trabajador",
        text: error.message || "No se pudo registrar el trabajador.",
      });
    }
  };
};

export const editWorker = ({ id, idCard, name, dateAdmission, salary }) => {
  return async (dispatch) => {
    try {
      const editWorker = { id, idCard, name, dateAdmission, salary };
      const res = await updateResourse(editWorker, "workers", id);
      dispatch(setEditWorker(res));

      showAlert({
        icon: "success",
        title: "Trabajador actualizado",
        text: "La información del trabajador ha sido modificada.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al actualizar trabajador",
        text: error.message || "No se pudo actualizar la información.",
      });
    }
  };
};

export const deleteWorker = (id) => {
  return async (dispatch) => {
    try {
      await deleteResourse("workers", id);
      dispatch(setDeleteWorker(id));

      showAlert({
        icon: "success",
        title: "Trabajador eliminado",
        text: "El trabajador ha sido eliminado correctamente.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al eliminar trabajador",
        text: error.message || "No se pudo eliminar al trabajador.",
      });
    }
  };
};

export const newPayroll = ({ datePayroll, description, number, worker, entries }) => {
  return async (dispatch) => {
    try {
      const newPayroll = {
        number,
        workerid: worker,
        description,
        datePayroll,
        payrollDetails: entries.map(({ reason, price }) => ({ reasonId: reason, price })),
      };

      const res = await createResourse(newPayroll, "payrolls");
      dispatch(addNewPayroll(res));

      showAlert({
        icon: "success",
        title: "Nómina creada",
        text: "La nueva nómina ha sido registrada correctamente.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al crear nómina",
        text: error.message || "No se pudo registrar la nómina.",
      });
    }
  };
};

export const editPayroll = ({ id, datePayroll, description, number, worker, entries }) => {
  return async (dispatch) => {
    try {
      const editPayroll = {
        id,
        number,
        workerid: worker,
        description,
        datePayroll,
        payrollDetails: entries.map(({ reason, price }) => ({ reasonId: reason, price })),
      };

      const res = await updateResourse(editPayroll, "payrolls", id);
      dispatch(setEditPayroll(res));

      showAlert({
        icon: "success",
        title: "Nómina actualizada",
        text: "La información de la nómina ha sido modificada.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al actualizar nómina",
        text: error.message || "No se pudo actualizar la información.",
      });
    }
  };
};

export const deletePayroll = (id) => {
  return async (dispatch) => {
    try {
      await deleteResourse("payrolls", id);
      dispatch(setDeletePayroll(id));

      showAlert({
        icon: "success",
        title: "Nómina eliminada",
        text: "La nómina ha sido eliminada correctamente.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al eliminar nómina",
        text: error.message || "No se pudo eliminar la nómina.",
      });
    }
  };
};


export const sentPayrollToAccount = ({
  datePayroll,
  description,
  number,
  payrollDetails,
}) => {
  
  const convertDateFormat = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`; 
  };
  const parsedDate = convertDateFormat(datePayroll);
  const formattedDate = format(parsedDate, "yyyy-MM-dd");
  
  
  return async (dispatch) => {
    try{
      
      const newEntry = {
        entryDate: formattedDate,
        numeration: number,
        notes: description,
        entryType: "",
        entryDetails: payrollDetails.map(
          ({ reasonName, price }) => ({
            accountId: 1,
            description: reasonName,
            debitAmount: price,
          })
        ),
      };
      const res = await createResourse(newEntry, "vouchers");
      dispatch(addNewEntry(res));
      showAlert({
        icon: "success",
        title: "Rol de pagos enviado",
        text: "Se a creado un nuevo comprobante contable.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al eliminar nómina",
        text: error.message || "No se pudo eliminar la nómina.",
      });
    }
  };
};


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

