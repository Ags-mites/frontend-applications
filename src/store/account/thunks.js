import { getAllResourse, CreateResourse } from "../../use-cases";
import { setData } from "./accountSlice";

export const startLoadingData = (resource) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");
    const data = await getAllResourse(resource);
    dispatch(setData({ resource, data }));
  };
};

export const NewAccount = ({ code, description, name, status, accoutType }) => {
  return async (dispatch, getState) => {

    const newAccount = {
      code,
      name,
      status: status === 1 ? "Active" : "Inactive",
      description,
      accountTypeId:accoutType,
    };

    const res = await CreateResourse(newAccount,"account");

    //! dispatch
    /* dispatch( addNewEmptyNote( newNote ) );
      dispatch( setActiveNote( newNote ) ); */
  };
};
