import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../layout/AppLayout";
import { FormView, FormViewTable, TableInfoView } from "../views";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { deleteEntry, editEntry, newEntry } from "../../store";

const VoucherFormConfig = {
  initialValues: {
    numeration: "",
    entryDate: "",
    notes: "",
    voucherType: "",
  },
  fields: [
    { name: "numeration", label: "Numeración", type: "text" },
    { name: "voucherType", label: "Tipo de comprobante", type: "text" },
    { name: "entryDate", label: "Fecha del Voucher", type: "date" },
    { name: "notes", label: "Notas", type: "text" },
  ],
};

const headers = {
  id: "ID",
  numeration: "Numeración",
  entryDate: "Fecha del Voucher",
  notes: "Notas",
  createdAt: "Fecha de Creación",
  updatedAt: "Última Actualización",
};

const tableConfig = {
  title: "Detalles del Comprobante",
  columns: [
    {
      name: "account",
      label: "Cuenta",
      type: "select",
      defaultValue: "",
      options: [],
    },
    {
      name: "description",
      label: "Descripción",
      type: "text",
      defaultValue: "",
    },
    { name: "debit", label: "Débito", type: "number", defaultValue: 0 },
    { name: "credit", label: "Crédito", type: "number", defaultValue: 0 },
  ],
};

export const VoucherPage = () => {
  const dispatch = useDispatch();
  const { vouchers, accounts } = useSelector((state) => state.app);

  const [isFormView, setIsFormView] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [formConfig, setFormConfig] = useState({ ...VoucherFormConfig });

  const accountOptions = accounts.map((type) => ({
    label: type.name,
    id: type.id,
  }));
  
  const tableConfigWithAccount = useMemo(() => ({
    ...tableConfig,
    columns: tableConfig.columns.map((column) =>
      column.name === "account"
        ? { ...column, options: accountOptions }
        : column
    ),
  }), [accounts]);

  const handleSubmit = (formValues) => {
    if (editingVoucher) {
      dispatch(editEntry(formValues));
    } else {
      dispatch(newEntry(formValues));
    }
    setIsFormView(false);
    setEditingVoucher(null);
  };

  const onClickCreateNewVoucher = () => {
    const filteredFields = formConfig.fields.filter(
      (field) => field.name !== "id"
    );
    setFormConfig({
      fields: filteredFields,
      initialValues: {
        numeration: "",
        entryDate: "",
        notes: "",
        voucherType: "",
      },
    });
    setIsFormView(true);
    setEditingVoucher(null);
  };

  const onEditVoucher = (voucherToEdit) => {
    setFormConfig({
      ...formConfig,
      initialValues: {
        id: voucherToEdit.id || "",
        numeration: voucherToEdit.numeration || "",
        entryDate: voucherToEdit.entryDate || "",
        notes: voucherToEdit.notes || "",
        voucherType: voucherToEdit.entryType || "",
      },
      fields: formConfig.fields.some((field) => field.name === "id")
        ? formConfig.fields
        : [
            ...formConfig.fields,
            { name: "id", label: "ID", type: "text", readOnly: true },
          ],
    });

    setIsFormView(true);
    setEditingVoucher(voucherToEdit);
  };

  const onDeleteVoucher = (voucherToDelete) => {
    dispatch(deleteEntry(voucherToDelete.id));
  };

  const formattedVouchers = vouchers.map((item) => ({
    ...item,
    entryDate: format(new Date(item.entryDate), "dd/MM/yyyy"),
    createdAt: format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss"),
    updatedAt: format(new Date(item.updatedAt), "dd/MM/yyyy HH:mm:ss"),
  }));

  return (
    <AppLayout>
      {!isFormView ? (
        <TableInfoView
          data={formattedVouchers}
          headers={headers}
          onCreateItem={onClickCreateNewVoucher}
          onEditItem={onEditVoucher}
          onDeleteItem={onDeleteVoucher}
          titleButton="Crear Voucher"
          title="Vouchers"
        />
      ) : (
        <FormViewTable
          config={formConfig}
          tableConfig={tableConfigWithAccount}
          onSubmitCallback={handleSubmit}
          onCancel={() => setIsFormView(false)}
        />
      )}
    </AppLayout>
  );
};
