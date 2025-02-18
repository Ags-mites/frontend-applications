import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppLayout } from "../layout/AppLayout";
import { FormView, TableInfoView } from "../views";

import { format } from "date-fns";
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
    { name: "salary", label: "Sueldo", type: "text" },
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
    setFormConfig(WorkerFormConfig);
    setIsFormView(true);
    setEditingWorker(null);
  };

  const onEditWorker = (workerToEdit) => {
    setFormConfig({
      ...formConfig,
      initialValues: {
        id: workerToEdit.id || "",
        idCard: workerToEdit.idCard || "",
        name: workerToEdit.name || "",
        dateAdmission: workerToEdit.dateAdmission || "",
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
          onSubmitCallback={handleSubmit}
          onCancel={() => setIsFormView(false)}
        />
      )}
    </AppLayout>
  );
};
