import { getAllResourse, CreateResourse, UpdateResourse } from "../../use-cases";
import { setData, addNewAccount, setEditAccount } from "./accountSlice";

export const startLoadingData = (resource) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");
    const data = await getAllResourse(resource);
    dispatch(setData({ resource, data }));
  };
};

export const NewAccount = ({ code, description, name, status, accountType }) => {
  return async (dispatch) => {
    const newAccount = {
      code,
      name,
      status: status === 1 ? "Active" : "Inactive",
      description,
      accountTypeId: accountType,
    };

    const res = await CreateResourse(newAccount, "account");

    dispatch(addNewAccount(res));
  };
};

export const EditAccount = ({ id, name, status, description, code, accountType }) => {
  return async (dispatch ) => {
    const editAccount = {
      id, 
      code,
      name,
      status: status === 1 ? "Active" : "Inactive",
      description,
      accountTypeId: accountType,
    } 
    const res = await UpdateResourse(editAccount, "account", id);
    
    dispatch(setEditAccount(res));
  }
};