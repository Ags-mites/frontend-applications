import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AppLayout } from "../layout/AppLayout";
import { FormView, TableInfoView } from "../views";
import { format } from "date-fns";
import {
  startLoadingDataInvoice,
  newCity,
  editCity,
  deleteCity
} from "../../store/invoice/thunks"; // Importa las acciones

const CityFormConfig = {
  initialValues: {
    code: "",
    name: "",
  },
  fields: [
    { name: "code", label: "Código", type: "text" },
    { name: "name", label: "Ciudad", type: "text" },
  ],
};

const headers = {
  id: "ID",
  code: "Código",
  name: "Ciudad",
  createdAt: "Fecha de Creación" // Añadir esta columna
};

const formValidations = {
  code: [(value) => value.trim() !== "", "El código es obligatorio"],
  name: [(value) => value.trim() !== "", "El nombre de la ciudad es obligatorio"],
};

export const CitiesPage = () => {
  const dispatch = useDispatch();
  const { cities } = useSelector((state) => state.invoce); // Corregir nombre del estado

  useEffect(() => {
    dispatch(startLoadingDataInvoice("cities"));
  }, [dispatch]);

  const [isFormView, setIsFormView] = useState(false);
  const [editingCity, setEditingCity] = useState(null);

  const handleSubmit = (formValues) => {
    if (editingCity) {
      dispatch(editCity({ ...formValues, id: editingCity.id }));
    } else {
      dispatch(newCity(formValues));
    }
    setIsFormView(false);
    setEditingCity(null);
  };

  const onClickCreateNewCity = () => {
    setIsFormView(true);
    setEditingCity(null);
  };

  const onEditCity = (cityToEdit) => {
    setEditingCity(cityToEdit);
    setIsFormView(true);
  };

  const onDeleteCity = (cityToDelete) => {
    dispatch(deleteCity(cityToDelete.id));
  };

  const formattedCities = cities?.map((item) => ({
    ...item,
    createdAt: item.createdAt
      ? format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss")
      : format(new Date(), "dd/MM/yyyy"), // Manejo de valores nulos/undefined
  })) || [];
  

  return (
    <AppLayout>
      {!isFormView ? (
        <TableInfoView
          data={formattedCities}
          headers={headers}
          onCreateItem={onClickCreateNewCity}
          onEditItem={onEditCity}
          onDeleteItem={onDeleteCity}
          titleButton="Crear Ciudad"
          title="Ciudades"
        />
      ) : (
        <FormView
          config={{
            ...CityFormConfig,
            initialValues: editingCity || CityFormConfig.initialValues
          }}
          isEditing={!!editingCity}
          formValidations={formValidations}
          onSubmitCallback={handleSubmit}
          onCancel={() => setIsFormView(false)}
        />
      )}
    </AppLayout>
  );
};