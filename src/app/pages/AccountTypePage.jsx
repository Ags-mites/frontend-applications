import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../layout/AppLayout";
import { FormView, TableInfoView } from "../views";
import { useState } from "react";
import { format } from "date-fns";
import {
  deleteAccountType,
  editAccountType,
  newAccountType,
} from "../../store";

const AccountTypeFormConfig = {
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
  ],
};

const headers = {
  id: "ID",
  code: "Código",
  name: "Nombre",
  description: "Descripción",
  status: "Estado",
  createdAt: "Fecha de Creación",
};

export const AccountTypePage = () => {
  const dispatch = useDispatch();
  const { accountTypes } = useSelector((state) => state.app);

  const [isFormView, setIsFormView] = useState(false);
  const [editingAccountType, setEditingAccountType] = useState(null);

  const [formConfig, setFormConfig] = useState({
    ...AccountTypeFormConfig,
  });

  const handleSubmit = (formValues) => {
    if (editingAccountType) {
      dispatch(editAccountType(formValues));
    } else {
      dispatch(newAccountType(formValues));
    }
    setIsFormView(false);
    setEditingAccountType(null);
  };

  const onClickCreateNewAccountType = () => {
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
      },
    });
    setIsFormView(true);
    setEditingAccountType(null);
  };

  const onEditAccountType = (accountTypeToEdit) => {
    const mappedStatus = accountTypeToEdit.status === "Activo" ? 1 : 2;

    setFormConfig({
      ...formConfig,
      initialValues: {
        id: accountTypeToEdit.id || "",
        code: accountTypeToEdit.code || "",
        name: accountTypeToEdit.name || "",
        description: accountTypeToEdit.description || "",
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
    setEditingAccountType(accountTypeToEdit);
  };

  const onDeleteAccountType = (accountTypeToDelete) => {
    dispatch(deleteAccountType(accountTypeToDelete.id));
  };

  const formattedAccountTypes = accountTypes.map((item) => ({
    ...item,
    createdAt: format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss"),
  }));

  return (
    <AppLayout>
      {!isFormView ? (
        <TableInfoView
          data={formattedAccountTypes}
          headers={headers}
          onCreateItem={onClickCreateNewAccountType}
          onEditItem={onEditAccountType}
          onDeleteItem={onDeleteAccountType}
          titleButton="Crear tipo de cuenta"
          title="Tipo de cuentas"
        />
      ) : (
        <FormView
          config={formConfig}
          isEditing={!!editingAccountType}
          onSubmitCallback={handleSubmit}
          onCancel={() => setIsFormView(false)}
        />
      )}
    </AppLayout>
  );
};
