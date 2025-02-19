import { getAllResourse } from "../../use-cases";
import { setData } from "./invoiceSlice";

export const startLoadingDataInvoice = (resource) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");
    const data = await getAllResourse(resource);
    dispatch(setData({ resource, data }));
  };
};
