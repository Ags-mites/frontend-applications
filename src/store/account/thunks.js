import Swal from "sweetalert2";

import {
  getAllResourse,
  createResourse,
  updateResourse,
  deleteResourse,
} from "../../use-cases";

import {
  addNewAccount,
  addNewAccountType,
  addNewEntry,
  setData,
  setDeleteAccount,
  setDeleteAccountType,
  setDeleteEntry,
  setEditAccount,
  setEditAccountType,
  setEditEntry,
} from "./accountSlice";

export const startLoadingData = (resource) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      if (!uid) throw new Error("El UID del usuario no existe");

      showLoading(`Obteniendo datos de ${resource}...`);

      const data = await getAllResourse(resource);
      dispatch(setData({ resource, data }));

      showAlert({
        icon: "success",
        title: "Datos cargados",
        text: `Los datos de ${resource} se cargaron correctamente.`,
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al cargar datos",
        text: error.message || "Hubo un problema al obtener los datos.",
        showConfirmButton: true,
      });
    }
  };
};

export const newAccount = ({
  code,
  description,
  name,
  status,
  accountType,
}) => {
  return async (dispatch) => {
    try {
      const newAccount = {
        code,
        name,
        status: status === 1 ? "Active" : "Inactive",
        description,
        accountTypeId: accountType,
      };

      const res = await createResourse(newAccount, "accounts");

      dispatch(addNewAccount(res));

      showAlert({
        icon: "success",
        title: "Datos guardados",
        text: `Cuenta ${name} creada con exito`,
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al guardar la cuenta, datos incompletos",
        text: error.message || "Hubo un problema al obtener los datos.",
        showConfirmButton: true,
      });
    }
  };
};

export const editAccount = ({
  id,
  name,
  status,
  description,
  code,
  accountType,
}) => {
  return async (dispatch) => {
    try {
      const editAccount = {
        id,
        code,
        name,
        status: status === 1 ? "Active" : "Inactive",
        description,
        accountTypeId: accountType,
      };
      const res = await updateResourse(editAccount, "accounts", id);

      dispatch(setEditAccount(res));

      showAlert({
        icon: "success",
        title: "Datos guardados",
        text: `Cuenta ${name} editada con exito`,
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al editar la cuenta, datos incompletos",
        text: error.message || "Hubo un problema al obtener los datos.",
        showConfirmButton: true,
      });
    }
  };
};

export const deleteAccount = (id) => {
  return async (dispatch) => {
    try {
      await deleteResourse("accounts", id);
      dispatch(setDeleteAccount(id));

      showAlert({
        icon: "success",
        title: "Datos eliminados",
        text: `La cuenta fue borrada`,
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al eliminar la cuenta",
        text: error.message || "Hubo un problema al obtener los datos.",
        showConfirmButton: true,
      });
    }
  };
};

export const newAccountType = ({ code, description, name, status }) => {
  return async (dispatch) => {
    try {
      const newAccountType = {
        code,
        name,
        status: status === 1 ? "Active" : "Inactive",
        description,
      };

      const res = await createResourse(newAccountType, "accountTypes");

      dispatch(addNewAccountType(res));

      showAlert({
        icon: "success",
        title: "Datos guardados",
        text: `Tipo de cuenta ${name} creada con exito`,
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al guardar el tipo de cuenta, datos incompletos",
        text: error.message || "Hubo un problema al obtener los datos.",
        showConfirmButton: true,
      });
    }
  };
};

export const editAccountType = ({ id, name, status, description, code }) => {
  return async (dispatch) => {
    try {
      const editAccountType = {
        id,
        code,
        name,
        status: status === 1 ? "Active" : "Inactive",
        description,
      };
      const res = await updateResourse(editAccountType, "accountTypes", id);

      dispatch(setEditAccountType(res));
      showAlert({
        icon: "success",
        title: "Datos guardados",
        text: `Cuenta ${name} editada con exito`,
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al editar la cuenta, datos incompletos",
        text: error.message || "Hubo un problema al obtener los datos.",
        showConfirmButton: true,
      });
    }
  };
};

export const deleteAccountType = (id) => {
  return async (dispatch) => {
    try {
      await deleteResourse("accountTypes", id);
      dispatch(setDeleteAccountType(id));
      showAlert({
        icon: "success",
        title: "Datos eliminados",
        text: `El tipo de cuenta fue borrada`,
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al eliminar el tipo de cuenta",
        text: error.message || "Hubo un problema al obtener los datos.",
        showConfirmButton: true,
      });
    }
  };
};

export const newEntry = ({
  entries,
  entryDate,
  notes,
  voucherType,
  numeration,
}) => {
  return async (dispatch) => {
    try {
      const totalDebit = entries.reduce(
        (sum, entry) => sum + Number(entry.debitAmount || 0),
        0
      );
      const totalCredit = entries.reduce(
        (sum, entry) => sum + Number(entry.creditAmount || 0),
        0
      );

      if (totalDebit !== totalCredit) {
        return showAlert({
          icon: "error",
          title: "Error en el asiento contable",
          text: "La suma de los débitos y créditos presenta descuadres.",
          showConfirmButton: true,
        });
      }

      const newEntry = {
        entryDate,
        numeration,
        notes,
        entryType: voucherType,
        entryDetails: entries.map(
          ({ accountId, creditAmount, debitAmount, description }) => ({
            accountId: accountId,
            description,
            debitAmount: debitAmount,
            creditAmount: creditAmount,
          })
        ),
      };
      console.log(newEntry)
      const res = await createResourse(newEntry, "vouchers");
      dispatch(addNewEntry(res));
      showAlert({
        icon: "success",
        title: "Datos guardados",
        text: `Tipo de cuenta ${name} creada con exito`,
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al guardar el tipo de cuenta, datos incompletos",
        text: error.message || "Hubo un problema al obtener los datos.",
        showConfirmButton: true,
      });
    }
  };
};

export const editEntry = ({ id, entries, entryDate, notes, voucherType, numeration }) => {
  return async (dispatch) => {
    try {
      const totalDebit = entries.reduce((sum, entry) => sum + Number(entry.debitAmount || 0), 0);
      const totalCredit = entries.reduce((sum, entry) => sum + Number(entry.creditAmount || 0), 0);

      if (totalDebit !== totalCredit) {
        return showAlert({
          icon: "error",
          title: "Error en el asiento contable",
          text: "La suma de los débitos y créditos debe ser igual.",
          showConfirmButton: true,
        });
      }

      const editEntry = {
        id,
        entryDate,
        numeration,
        notes,
        entryType: voucherType,
        entryDetails: entries.map(({ accountId, creditAmount, debitAmount, description }) => ({
          accountId,
          description,
          debitAmount,
          creditAmount,
        })),
      };
      console.log(editEntry)
      const res = await updateResourse(editEntry, "vouchers", id);
      dispatch(setEditEntry(res));

      showAlert({
        icon: "success",
        title: "Asiento actualizado",
        text: "El asiento contable fue modificado correctamente.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al editar el asiento",
        text: error.message || "Hubo un problema al actualizar los datos.",
        showConfirmButton: true,
      });
    }
  };
};

export const deleteEntry = (id) => {
  return async (dispatch) => {
    try {
      await deleteResourse("vouchers", id);
      dispatch(setDeleteEntry(id));

      showAlert({
        icon: "success",
        title: "Asiento eliminado",
        text: "El asiento contable ha sido eliminado correctamente.",
      });
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Error al eliminar el asiento",
        text: error.message || "Hubo un problema al eliminar los datos.",
        showConfirmButton: true,
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
