import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AppLayout } from "../layout/AppLayout";
import { TableInfoView, FormView } from "../views";
import { startLoadingDataInvoice, newClient, deleteClient, editClient } from "../../store/invoice/thunks";
import { format } from "date-fns";

const ClientFormConfig = {
    initialValues: {
        ruc: "",
        name: "",
        address: "",
    },
    fields: [
        { name: "ruc", label: "RUC", type: "text" },
        { name: "name", label: "Nombre", type: "text" },
        { name: "address", label: "Dirección", type: "text" },
    ],
};

const headers = {
    id: "ID",
    ruc: "RUC",
    name: "Nombre",
    address: "Dirección",
    createdAt: "Fecha de Creación",
};

const formValidations = {
    ruc: [(value) => value.trim() !== "", "El RUC es obligatorio"],
    name: [(value) => value.trim() !== "", "El nombre es obligatorio"],
    address: [(value) => value.trim() !== "", "La dirección es obligatoria"],
};

export const ClientPage = () => {
    const dispatch = useDispatch();
    const { clients = [] } = useSelector((state) => state.invoce); // Corregido: 'clients'
    const [isFormView, setIsFormView] = useState(false);
    const [editingClient, setEditingClient] = useState(null);

    useEffect(() => {
        dispatch(startLoadingDataInvoice("clients")); // Carga los datos iniciales
    }, [dispatch]);

    const handleSubmit = (formValues) => {
        if (editingClient) {
            dispatch(editClient({ ...formValues, id: editingClient.id }));
        } else {
            dispatch(newClient(formValues));
        }
        setIsFormView(false);
        setEditingClient(null);
    };

    const onClickCreateNewClient = () => {
        setIsFormView(true);
        setEditingClient(null);
    };

    const onEditClient = (clientToEdit) => {
        setEditingClient(clientToEdit);
        setIsFormView(true);
    };

    const onDeleteClient = (clientToDelete) => {
        dispatch(deleteClient(clientToDelete.id));
    };

    const formattedClients = clients.map((item) => ({
        ...item,
        createdAt: item.createdAt
            ? format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss")
            : format(new Date(), "dd/MM/yyyy"), // Fecha actual si no hay createdAt
    }));

    return (
        <AppLayout>
            {!isFormView ? (
                <TableInfoView
                    data={formattedClients}
                    headers={headers}
                    onCreateItem={onClickCreateNewClient}
                    onEditItem={onEditClient}
                    onDeleteItem={onDeleteClient}
                    titleButton="Crear Cliente"
                    title="Clientes"
                />
            ) : (
                <FormView
                    config={{
                        ...ClientFormConfig,
                        initialValues: editingClient || ClientFormConfig.initialValues,
                    }}
                    isEditing={!!editingClient}
                    formValidations={formValidations}
                    onSubmitCallback={handleSubmit}
                    onCancel={() => setIsFormView(false)}
                />
            )}
        </AppLayout>
    );
};