import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../layout/AppLayout";
import { FormView, TableInfoView } from "../views";
import { useState } from "react";
import { NewAccount } from "../../store/account/thunks";

const AccountFormConfig = {
  initialValues: {
    code: "",
    name: "",
    description: "",
    accoutType: "",
    status: "",
  },
  fields: [
    { name: "code", label: "Código", type: "text" },
    { name: "name", label: "Nombre", type: "text" },
    { name: "description", label: "Descripción", type: "text" },
    {
      name: "status",
      label: "Estado",
      type: "select",
      options: [
        { label: "Activo", id: 1 },
        { label: "Inactivo", id: 2 },
      ],
    },
    {
      name: "accoutType",
      label: "Tipo de cuenta",
      type: "select",
      options: [],
    },
  ],
};

/* const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener una @"],
  password: [
    (value) => value.length >= 6,
    "El password debe de tener más de 6 letras.",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio."],
}; */

const headers = {
  id: "ID",
  code: "Código",
  name: "Nombre",
  description: "Descripción",
  status: "Estado",
  accountTypeName: "Tipo de cuenta",
  createdAt: "Fecha de Creación",
};

export const AccountPage = () => {
  const dispatch = useDispatch();
  const { account, accountType } = useSelector((state) => state.app);

  const accountTypeOptions = accountType.map((type) => ({
    label: type.name,
    id: type.id,
  }));

  const updatedFormConfig = {
    ...AccountFormConfig,
    fields: AccountFormConfig.fields.map((field) =>
      field.name === "accoutType"
        ? { ...field, options: accountTypeOptions }
        : field
    ),
  };

  const [isFormView, setIsFormView] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const handleSubmit = (formValues) => {
    if (editingAccount) {
      console.log("Editar cuenta:", formValues);
    } else {
      dispatch(NewAccount(formValues));
    }
    setIsFormView(false);
    setEditingAccount(null);
  };

  const onClickCreateNewAccount = () => {
    setIsFormView(true);
    setEditingAccount(null);
  };

  const onEditAccount = (accountToEdit) => {
    setIsFormView(true);
    setEditingAccount(accountToEdit);
  };

  const formConfig = editingAccount
    ? {
        ...updatedFormConfig,
        initialValues: {
          ...updatedFormConfig.initialValues,
          ...editingAccount,
        },
      }
    : updatedFormConfig;

  return (
    <AppLayout>
      {!isFormView ? (
        <TableInfoView
          data={account}
          headers={headers}
          onCreateItem={onClickCreateNewAccount}
          onEditItem={onEditAccount}
        />
      ) : (
        <FormView
          config={formConfig}
          onSubmitCallback={handleSubmit}
          onCancel={() => setIsFormView(false)}
        />
      )}
    </AppLayout>
  );
};
