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

export const startLoadingDataReason = (resource) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");
    const data = await getAllResourse(resource);
    dispatch(setData({ resource, data }));
  };
};

export const newReason = ({ code, name, type }) => {
  return async (dispatch) => {
    const newReason = {
      code,
      name,
      type,
    };

    const res = await createResourse(newReason, "reasons");

    dispatch(addNewReason(res));
  };
};

export const editReason = ({ id, code, name, type }) => {
  return async (dispatch) => {
    const editReason = {
      id,
      code,
      name,
      type,
    };
    const res = await updateResourse(editReason, "reasons", id);

    dispatch(setEditReason(res));
  };
};

export const deleteReason = (id) => {
  return async (dispatch) => {
    await deleteResourse("reasons", id);
    dispatch(setDeleteReason(id));
  };
};

export const newWorker = ({ idCard, name, dateAdmission, salary }) => {
  return async (dispatch) => {
    const newWorker = {
      idCard,
      name,
      dateAdmission,
      salary,
    };

    const res = await createResourse(newWorker, "workers");

    dispatch(addNewWorker(res));
  };
};

export const editWorker = ({ id, idCard, name, dateAdmission, salary }) => {
  return async (dispatch) => {
    const editWorker = {
      id,
      idCard,
      name,
      dateAdmission,
      salary,
    };
    const res = await updateResourse(editWorker, "workers", id);

    dispatch(setEditWorker(res));
  };
};

export const deleteWorker = (id) => {
  return async (dispatch) => {
    await deleteResourse("workers", id);
    dispatch(setDeleteWorker(id));
  };
};

export const newPayroll = ({
  datePayroll,
  description,
  number,
  worker,
  entries,
}) => {
  return async (dispatch) => {
    const newPayroll = {
      number,
      workerid: worker,
      description,
      datePayroll,
      payrollDetails: entries.map(({ reason, price }) => ({
        reasonId: reason,
        price,
      })),
    };

    const res = await createResourse(newPayroll, "payrolls");

    dispatch(addNewPayroll(res));
  };
};

export const editPayroll = ({
  id,
  datePayroll,
  description,
  number,
  worker,
  entries,
}) => {
  return async (dispatch) => {
    const editPayroll = {
      id,
      number,
      workerid: worker,
      description,
      datePayroll,
      payrollDetails: entries.map(({ reason, price }) => ({
        reasonId: reason,
        price,
      })),
    };
    const res = await updateResourse(editPayroll, "payrolls", id);

    dispatch(setEditPayroll(res));
  };
};

export const deletePayroll = (id) => {
  return async (dispatch) => {
    await deleteResourse("payrolls", id);
    dispatch(setDeletePayroll(id));
  };
};
