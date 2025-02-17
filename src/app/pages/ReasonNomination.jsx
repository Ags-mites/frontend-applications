import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppLayout } from "../layout/AppLayout";
import { FormView, TableInfoView } from "../views";

import { format } from "date-fns";
import { deleteReason, editReason, newReason } from "../../store";

const ReasonFormConfig = {
  initialValues: {
    code: "",
    name: "",
    type: "",
  },
  fields: [
    { name: "code", label: "Código", type: "text" },
    { name: "name", label: "Nombre", type: "text" },
    { name: "type", label: "Tipo", type: "text" },
  ],
};

const headers = {
  id: "ID",
  code: "Código",
  name: "Nombre",
  type: "Tipo de razón",
  createdAt: "Fecha de Creación",
};

export const ReasonNomination = () => {
  const dispatch = useDispatch();
  const { reasons } = useSelector((state) => state.reasons);

  const [isFormView, setIsFormView] = useState(false);
  const [editingReason, setEditingReason] = useState(null);
  const [formConfig, setFormConfig] = useState(ReasonFormConfig);

  const handleSubmit = (formValues) => {
    if (editingReason) {
      dispatch(editReason(formValues));
    } else {
      dispatch(newReason(formValues));
    }
    setIsFormView(false);
    setEditingReason(null);
  };

  const onClickCreateNewReason = () => {
    const filteredFields = ReasonFormConfig.fields.filter(
      (field) => field.name !== "id"
    );
    setFormConfig({
      fields: filteredFields,
      initialValues: {
        code: "",
        name: "",
        type: "",
      },
    });
    setIsFormView(true);
    setEditingReason(null);
  };

  const onEditReason = (reasonToEdit) => {
    setFormConfig({
      ...formConfig,
      initialValues: {
        id: reasonToEdit.id || "",
        code: reasonToEdit.code || "",
        name: reasonToEdit.name || "",
        type: reasonToEdit.type || "",
      },
      fields: formConfig.fields.some((field) => field.name === "id")
        ? formConfig.fields
        : [
            ...formConfig.fields,
            { name: "id", label: "ID", type: "text", readOnly: true },
          ],
    });

    setIsFormView(true);
    setEditingReason(reasonToEdit);
  };

  const onDeleteReason = (reasonToDelete) => {
    dispatch(deleteReason(reasonToDelete.id));
  };

  const formattedReasons = reasons.map((item) => ({
    ...item,
    createdAt: format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss"),
  }));

  return (
    <AppLayout>
      {!isFormView ? (
        <TableInfoView
          data={formattedReasons}
          headers={headers}
          onCreateItem={onClickCreateNewReason}
          onEditItem={onEditReason}
          onDeleteItem={onDeleteReason}
          titleButton="Crear Razón"
          title="Razones"
        />
      ) : (
        <FormView
          config={formConfig}
          isEditing={!!editingReason}
          onSubmitCallback={handleSubmit}
          onCancel={() => setIsFormView(false)}
        />
      )}
    </AppLayout>
  );
};
