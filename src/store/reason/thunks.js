import {
  createResourse,
  deleteResourse,
  getAllResourse,
  updateResourse,
} from "../../use-cases";
import { addNewReason, setData, setDeleteReason, setEditReason } from "./";

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
