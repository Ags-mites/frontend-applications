import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../layout/AppLayout";
import { FormView, TableInfoView } from "../views";
import { useState } from "react";
import { format } from "date-fns";
import { deleteAccount, editAccount, newAccount } from "../../store/account/thunks";

const AccountFormConfig = {
  initialValues: {
    code: "",
    name: "",
    description: "",
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
      name: "accountType",
      label: "Tipo de cuenta",
      type: "select",
      options: [],
    },
  ],
};

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
  const { accounts, accountTypes } = useSelector((state) => state.app);

  const [isFormView, setIsFormView] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const accountTypeOptions = accountTypes.map((type) => ({
    label: type.name,
    id: type.id,
  }));

  const [formConfig, setFormConfig] = useState({
    ...AccountFormConfig,
    fields: AccountFormConfig.fields.map((field) =>
      field.name === "accountType"
        ? { ...field, options: accountTypeOptions }
        : field
    ),
  });

  const handleSubmit = (formValues) => {
    if (editingAccount) {
      dispatch(editAccount(formValues));
    } else {
      dispatch(newAccount(formValues));
    }
    setIsFormView(false);
    setEditingAccount(null);
  };

  const onClickCreateNewAccount = () => {
    const filteredFields = formConfig.fields.filter(
      (field) => field.name !== "id"
    );
    setFormConfig({
      fields: filteredFields,
      initialValues: {
        code: "",
        name: "",
        description: "",
        status: "",
        accountType: "",
      },
    });
    setIsFormView(true);
    setEditingAccount(null);
  };

  const onEditAccount = (accountToEdit) => {
    const mappedStatus = accountToEdit.status === "Activo" ? 1 : 2;

    setFormConfig({
      ...formConfig,
      initialValues: {
        id: accountToEdit.id || "",
        code: accountToEdit.code || "",
        name: accountToEdit.name || "",
        description: accountToEdit.description || "",
        accountType: accountToEdit.accountTypeId || "",
        status: mappedStatus,
      },
      fields: formConfig.fields.some((field) => field.name === "id")
        ? formConfig.fields
        : [
            ...formConfig.fields,
            { name: "id", label: "ID", type: "text", readOnly: true },
          ],
    });

    setIsFormView(true);
    setEditingAccount(accountToEdit);
  };

  const onDeleteAccount = (accountToDelete) => {
    dispatch(deleteAccount(accountToDelete.id));
  };

  const formattedAccounts = accounts.map((item) => ({
    ...item,
    createdAt: format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss"),
  }));

  return (
    <AppLayout>
      {!isFormView ? (
        <TableInfoView
          data={formattedAccounts}
          headers={headers}
          onCreateItem={onClickCreateNewAccount}
          onEditItem={onEditAccount}
          onDeleteItem={onDeleteAccount}
          titleButton="Crear Cuenta"
          title="Cuentas"
        />
      ) : (
        <FormView
          config={formConfig}
          isEditing={!!editingAccount}
          onSubmitCallback={handleSubmit}
          onCancel={() => setIsFormView(false)}
        />
      )}
    </AppLayout>
  );
};
