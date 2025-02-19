import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppLayout } from "../layout/AppLayout";
import { FormView, TableInfoView } from "../views";

import { format, parse } from "date-fns";
import { deleteWorker, editWorker, newWorker } from "../../store";

const WorkerFormConfig = {
  initialValues: {
    idCard: "",
    name: "",
    dateAdmission: "",
    salary: "",
  },
  fields: [
    { name: "idCard", label: "Número de identificación", type: "text" },
    { name: "name", label: "Nombre", type: "text" },
    { name: "dateAdmission", label: "Fecha de ingreso", type: "date" },
    { name: "salary", label: "Sueldo", type: "number" },
  ],
};

const headers = {
  id: "ID",
  idCard: "Número de identificación",
  name: "Nombre",
  dateAdmission: "Fecha de ingreso",
  salary: "Sueldo",
  createdAt: "Fecha de Creación",
};

const formValidations = {
  idCard: [(value) => value.trim() !== "", "El código es obligatorio"],
  name: [(value) => value.trim() !== "", "El nombre es obligatorio"],
  dateAdmission: [
    (value) => value !== "",
    "La fecha de ingreso es obligatorio",
    ],
    salary: [(value) => value !== "", "El sueldo es obligatorio"],
};

export const WorkerNomination = () => {
  const dispatch = useDispatch();
  const { workers } = useSelector((state) => state.reasons);

  const [isFormView, setIsFormView] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [formConfig, setFormConfig] = useState(WorkerFormConfig);

  const handleSubmit = (formValues) => {
    if (editingWorker) {
      dispatch(editWorker(formValues));
    } else {
      dispatch(newWorker(formValues));
    }
    setIsFormView(false);
    setEditingWorker(null);
  };

  const onClickCreateNewWorker = () => {
    const filteredFields = formConfig.fields.filter(
      (field) => field.name !== "id"
    );
    setFormConfig({
      fields: filteredFields,
      initialValues: {
        idCard: "",
        name: "",
        dateAdmission: "",
        salary: "",
      },
    });
    setIsFormView(true);
    setEditingWorker(null);
  };

  const onEditWorker = (workerToEdit) => {
    const parsedDate = parse(workerToEdit.dateAdmission, "dd/MM/yyyy", new Date());
    const formattedDate = format(parsedDate, "yyyy-MM-dd");
    setFormConfig({
      ...formConfig,
      initialValues: {
        id: workerToEdit.id || "",
        idCard: workerToEdit.idCard || "",
        name: workerToEdit.name || "",
        dateAdmission: formattedDate || "",
        salary: workerToEdit.salary || "",
      },
      fields: formConfig.fields.some((field) => field.name === "id")
        ? formConfig.fields
        : [
            ...formConfig.fields,
            { name: "id", label: "ID", type: "text", readOnly: true },
          ],
    });

    setIsFormView(true);
    setEditingWorker(workerToEdit);
  };

  const onDeleteWorker = (workerToDelete) => {
    dispatch(deleteWorker(workerToDelete.id));
  };

  const formattedWorkers = workers.map((item) => ({
    ...item,
    createdAt: format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss"),
    dateAdmission: format(new Date(item.dateAdmission), "dd/MM/yyyy"),
  }));

  return (
    <AppLayout>
      {!isFormView ? (
        <TableInfoView
          data={formattedWorkers}
          headers={headers}
          onCreateItem={onClickCreateNewWorker}
          onEditItem={onEditWorker}
          onDeleteItem={onDeleteWorker}
          titleButton="Crear Trabajador"
          title="Trabajadores"
        />
      ) : (
        <FormView
          config={formConfig}
          isEditing={!!editingWorker}
          formValidations={formValidations}
          onSubmitCallback={handleSubmit}
          onCancel={() => setIsFormView(false)}
        />
      )}
    </AppLayout>
  );
};
