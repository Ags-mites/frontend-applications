import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../layout/AppLayout";
import { FormViewTable, TableInfoView } from "../views";
import { useMemo, useState } from "react";
import { format, parse } from "date-fns";
import { deletePayroll, editPayroll, newPayroll, sentPayrollToAccount } from "../../store";

const PayrollFormConfig = {
  initialValues: {
    number: "",
    worker: "",
    description: "",
    datePayroll: "",
  },
  fields: [
    { name: "number", label: "Numeración", type: "text" },
    {
      name: "worker",
      label: "Empleado",
      type: "select",
      defaultValue: "",
      options: [],
    },
    { name: "datePayroll", label: "Fecha del Voucher", type: "date" },
    { name: "description", label: "Notas", type: "text" },
  ],
};

const headers = {
  id: "ID",
  number: "Numeración",
  workerIdCard: "Identificación del empleado",
  workerName: "Nombre Empleado",
  datePayroll: "Fecha de rol",
  createdAt: "Fecha de Creación",
  updatedAt: "Última Actualización",
};

const tableConfig = {
  title: "Detalles del Rol",
  columns: [
    {
      name: "reason",
      label: "Motivo",
      type: "select",
      options: [],
    },
    { name: "price", label: "Precio", type: "number", defaultValue: 0 },
  ],
};

export const PayroallNomination = () => {
  const dispatch = useDispatch();
  const { payrolls, workers, reasons } = useSelector((state) => state.reasons);

  const [isFormView, setIsFormView] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState(null);

  const workerOptions = workers.map((worker) => ({
    label: worker.name,
    id: worker.id,
  }));

  const [formConfig, setFormConfig] = useState({
    ...PayrollFormConfig,
    fields: PayrollFormConfig.fields.map((field) =>
      field.name === "worker" ? { ...field, options: workerOptions } : field
    ),
  });

  const reasonOptions = reasons.map((type) => ({
    label: type.name,
    id: type.id,
  }));

  const tableConfigWithReason = useMemo(
    () => ({
      ...tableConfig,
      columns: tableConfig.columns.map((column) =>
        column.name === "reason"
          ? { ...column, options: reasonOptions }
          : column
      ),
    }),
    [reasons]
  );

  const handleSubmit = (formValues) => {
    if (editingPayroll) {
      dispatch(editPayroll(formValues));
    } else {
      dispatch(newPayroll(formValues));
    }
    setIsFormView(false);
    setEditingPayroll(null);
  };

  const onClickCreateNewPayroll = () => {
    setIsFormView(true);
    setEditingPayroll(null);
  };

  const onSendAccount = (sendToAccount) => {
    dispatch(sentPayrollToAccount(sendToAccount));
  };

  const onEditPayroll = (payrollToEdit) => {
    const parsedDate = parse(
      payrollToEdit.datePayroll,
      "dd/MM/yyyy",
      new Date()
    );
    const formattedDate = format(parsedDate, "yyyy-MM-dd");

    console.log(parsedDate);
    setFormConfig({
      ...formConfig,
      initialValues: {
        id: payrollToEdit.id || "",
        number: payrollToEdit.number || "",
        workerid: payrollToEdit.workerid || "",
        workerName: payrollToEdit.workerName || "",
        datePayroll: formattedDate || "",
        description: payrollToEdit.description || "",
      },
      fields: formConfig.fields.some((field) => field.name === "id")
        ? formConfig.fields
        : [
            ...formConfig.fields,
            { name: "id", label: "ID", type: "text", readOnly: true },
          ],
    });

    setIsFormView(true);
    setEditingPayroll(payrollToEdit);
  };

  const onDeletePayroll = (payrollToDelete) => {
    dispatch(deletePayroll(payrollToDelete.id));
  };
  const formattedPayrolls = payrolls.map((item) => ({
    ...item,
    datePayroll: format(new Date(item.datePayroll), "dd/MM/yyyy"),
    createdAt: format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss"),
    updatedAt: format(new Date(item.updatedAt), "dd/MM/yyyy HH:mm:ss"),
  }));

  return (
    <AppLayout>
      {!isFormView ? (
        <TableInfoView
          data={formattedPayrolls}
          headers={headers}
          onCreateItem={onClickCreateNewPayroll}
          onEditItem={onEditPayroll}
          onDeleteItem={onDeletePayroll}
          onSendItem={onSendAccount}
          titleButton="Crear Nómina"
          title="Nóminas"
        />
      ) : (
        <FormViewTable
          config={formConfig}
          tableConfig={tableConfigWithReason}
          onSubmitCallback={handleSubmit}
          onCancel={() => setIsFormView(false)}
        />
      )}
    </AppLayout>
  );
};
