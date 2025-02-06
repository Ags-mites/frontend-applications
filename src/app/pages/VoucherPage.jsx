import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../layout/AppLayout";
import { FormView, FormViewTable, TableInfoView } from "../views";
import { useState } from "react";
import { format } from "date-fns";

const VoucherFormConfig = {
  initialValues: {
    numeration: "",
    voucherDate: "",
    notes: "",
    voucherType: ""
  },
  fields: [
    { name: "numeration", label: "Numeración", type: "text" },
    { name: "voucherType", label: "Tipo de comprobante", type: "text" },
    { name: "voucherDate", label: "Fecha del Voucher", type: "text" },
    { name: "notes", label: "Notas", type: "text" },
  ],
};

const headers = {
  id: "ID",
  numeration: "Numeración",
  voucherDate: "Fecha del Voucher",
  notes: "Notas",
  createdAt: "Fecha de Creación",
  updatedAt: "Última Actualización",
};

export const VoucherPage = () => {
  const dispatch = useDispatch();
  const { vouchers } = useSelector((state) => state.app);

  const [isFormView, setIsFormView] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [formConfig, setFormConfig] = useState({ ...VoucherFormConfig });

  const handleSubmit = (formValues) => {
    if (editingVoucher) {
      dispatch(editVoucher(formValues));
    } else {
      dispatch(newVoucher(formValues));
    }
    setIsFormView(false);
    setEditingVoucher(null);
  };

  const onClickCreateNewVoucher = () => {
    setFormConfig({ ...VoucherFormConfig });
    setIsFormView(true);
    setEditingVoucher(null);
  };

  const onEditVoucher = (voucherToEdit) => {
    setFormConfig({
      ...formConfig,
      initialValues: {
        id: voucherToEdit.id || "",
        numeration: voucherToEdit.numeration || "",
        voucherDate: voucherToEdit.voucherDate || "",
        notes: voucherToEdit.notes || "",
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
    dispatch(deleteVoucher(voucherToDelete.id));
  };

  const formattedVouchers = vouchers.map((item) => ({
    ...item,
    voucherDate: format(new Date(item.voucherDate), "dd/MM/yyyy HH:mm:ss"),
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
          onSubmit={handleSubmit}
          onCancel={() => setIsFormView(false)}
        />
      )}
    </AppLayout>
  );
};
