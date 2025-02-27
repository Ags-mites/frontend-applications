import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { AppLayout } from "../layout/AppLayout";
import { TableInfoView, FormViewTable } from "../views";
import { newInvoice, editInvoice, deleteInvoice } from "../../store/invoice/thunks";
import { format, parse } from "date-fns";

const detailsTableConfig = {
    title: "Detalles de Factura",
    columns: [
        { name: "article", label: "Artículo", type: "text" },
        { name: "quantity", label: "Cantidad", type: "number" },
        { name: "price", label: "Precio Unitario", type: "number" },
    ],
};

const headers = {
    id: "ID",
    invoiceNumber: "Número Factura",
    date: "Fecha",
    price: "Total",
    
};

const formValidations = {
    invoiceNumber: [(value) => value.trim() !== "", "El número es obligatorio"],
    date: [(value) => value !== "", "La fecha es requerida"],
    cityId: [(value) => value !== "", "Seleccione una ciudad"],
    clientId: [(value) => value !== "", "Seleccione un cliente"],
};

const InvoiceFormConfig = {
    initialValues: {
        invoiceNumber: "",
        date: "",
        cityId: "",
        clientId: "",
        details: [],
    },
    fields: [
        { name: "invoiceNumber", label: "Número", type: "text" },
        { name: "date", label: "Fecha", type: "date" },
        { name: "cityId", label: "Ciudad", type: "select", options: [] },
        { name: "clientId", label: "Cliente", type: "select", options: [] },
    ],
};

export const InvoicePage = () => {
    const dispatch = useDispatch();
    const { invoices = [], cities = [], clients = [] } = useSelector((state) => state.invoce);
    const [isFormView, setIsFormView] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState(null);
    const [formConfig, setFormConfig] = useState(InvoiceFormConfig);

    const cityOptions = useMemo(() => cities.map(city => ({ id: city.id, label: city.name })), [cities]);
    const clientOptions = useMemo(() => clients.map(client => ({ id: client.id, label: `${client.name} - (${client.ruc})` })), [clients]);

    const updatedFormConfig = useMemo(() => ({
        ...InvoiceFormConfig,
        fields: InvoiceFormConfig.fields.map(field => {
            if (field.name === "cityId") return { ...field, options: cityOptions };
            if (field.name === "clientId") return { ...field, options: clientOptions };
            return field;
        }),
    }), [cityOptions, clientOptions]);

    const handleSubmit = (formValues) => {
        if (editingInvoice) {
            dispatch(editInvoice({ ...formValues, id: editingInvoice.id }));
        } else {
            dispatch(newInvoice(formValues));
        }
        setIsFormView(false);
        setEditingInvoice(null);
    };

    const onClickCreateNewInvoice = () => {
        setFormConfig(updatedFormConfig);
        setIsFormView(true);
        setEditingInvoice(null);
    };

    const onEditInvoice = (invoiceToEdit) => {
        const parsedDate = parse(invoiceToEdit.date, "dd/MM/yyyy", new Date());
        const formattedDate = format(parsedDate, "yyyy-MM-dd");
        console.log(invoiceToEdit)
        setFormConfig({
            ...updatedFormConfig,
            initialValues: {
                id: invoiceToEdit.id || "",
                invoiceNumber: invoiceToEdit.invoiceNumber || "",
                date: formattedDate || "",
                cityId: invoiceToEdit.cityId || "",
                clientId: invoiceToEdit.clientId || "",
                details: invoiceToEdit.invoiceDetails || [],
            },
            fields: updatedFormConfig.fields.some(field => field.name === "id")
                ? updatedFormConfig.fields
                : [...updatedFormConfig.fields, { name: "id", label: "ID", type: "text", readOnly: true }],
        });

        setIsFormView(true);
        setEditingInvoice(invoiceToEdit);
    };

    const onDeleteInvoice = (invoiceToDelete) => {
        dispatch(deleteInvoice(invoiceToDelete.id));
    };

    const formattedInvoices = invoices.map((item) => ({
        ...item,
        date: format(new Date(item.date), "dd/MM/yyyy"),
    }));

    return (
        <AppLayout>
            {!isFormView ? (
                <TableInfoView
                    data={formattedInvoices}
                    headers={headers}
                    onCreateItem={onClickCreateNewInvoice}
                    onEditItem={onEditInvoice}
                    onDeleteItem={onDeleteInvoice}
                    titleButton="Crear Factura"
                    title="Facturación"
                />
            ) : (
                <FormViewTable
                    config={formConfig}
                    tableConfig={detailsTableConfig}
                    formValidations={formValidations}
                    onSubmitCallback={handleSubmit}
                    onCancel={() => setIsFormView(false)}
                />
            )}
        </AppLayout>
    );
};
