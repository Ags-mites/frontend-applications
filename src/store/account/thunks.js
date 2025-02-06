import {
  getAllResourse,
  createResourse,
  updateResourse,
  deleteResourse,
} from "../../use-cases";

import {
  addNewAccount,
  addNewAccountType,
  setData,
  setDeleteAccount,
  setDeleteAccountType,
  setEditAccount,
  setEditAccountType,
} from "./accountSlice";

export const startLoadingData = (resource) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");
    const data = await getAllResourse(resource);
    dispatch(setData({ resource, data }));
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
    const newAccount = {
      code,
      name,
      status: status === 1 ? "Active" : "Inactive",
      description,
      accountTypeId: accountType,
    };

    const res = await createResourse(newAccount, "accounts");

    dispatch(addNewAccount(res));
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
  };
};

export const deleteAccount = (id) => {
  return async (dispatch) => {
    await deleteResourse("accounts", id);
    dispatch(setDeleteAccount(id));
  };
};

export const newAccountType = ({ code, description, name, status }) => {
  return async (dispatch) => {
    const newAccountType = {
      code,
      name,
      status: status === 1 ? "Active" : "Inactive",
      description,
    };

    const res = await createResourse(newAccountType, "accountTypes");

    dispatch(addNewAccountType(res));
  };
};

export const editAccountType = ({ id, name, status, description, code }) => {
  return async (dispatch) => {
    const editAccountType = {
      id,
      code,
      name,
      status: status === 1 ? "Active" : "Inactive",
      description,
    };
    const res = await updateResourse(editAccountType, "accountTypes", id);

    dispatch(setEditAccountType(res));
  };
};

export const deleteAccountType = (id) => {
  return async (dispatch) => {
    await deleteResourse("accountTypes", id);
    dispatch(setDeleteAccountType(id));
  };
};
