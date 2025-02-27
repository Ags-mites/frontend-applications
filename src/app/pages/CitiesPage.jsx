import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { useState } from "react";

import { AppLayout } from "../layout/AppLayout";
import { FormView, TableInfoView } from "../views";
import { deleteAccount, editAccount, newAccount } from "../../store";

import { format } from "date-fns";
=======
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
>>>>>>> 9cca994 (Para mi sistema)

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
<<<<<<< HEAD
=======
  createdAt: "Fecha de Creación" // Añadir esta columna
>>>>>>> 9cca994 (Para mi sistema)
};

const formValidations = {
  code: [(value) => value.trim() !== "", "El código es obligatorio"],
<<<<<<< HEAD
  name: [
    (value) => value.trim() !== "",
    "El nombre de la ciudad es obligatorio",
  ],
};



export const CitiesPage = () => {
  const dispatch = useDispatch();
  const { Cities } = useSelector((state) => state.invoce);
  const [isFormView, setIsFormView] = useState(false);

  const [editingCity, setEditingCity] = useState(null);

  const [formConfig, setFormConfig] = useState({
      ...CityFormConfig,
    });

  const handleSubmit = () => {
    if (editingAccount) {
      console.log("Editar elemento");
    } else {
      console.log("crear elemento");
=======
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
>>>>>>> 9cca994 (Para mi sistema)
    }
    setIsFormView(false);
    setEditingCity(null);
  };
<<<<<<< HEAD
  
  const onClickCreateNewCity = () => {
    setFormConfig({
      initialValues: {
        code: "",
        name: "",
      },
    });
    setIsFormView(true);
    setEditingAccount(null);
  };
  
  const onEditCity = () => {
    console.log("editar nueva ciudad");
  };
  
  const onDeleteCity = () => {
    console.log("eliminar nueva ciudad");
  };
=======

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
  
>>>>>>> 9cca994 (Para mi sistema)

  return (
    <AppLayout>
      {!isFormView ? (
        <TableInfoView
<<<<<<< HEAD
          data={Cities}
=======
          data={formattedCities}
>>>>>>> 9cca994 (Para mi sistema)
          headers={headers}
          onCreateItem={onClickCreateNewCity}
          onEditItem={onEditCity}
          onDeleteItem={onDeleteCity}
          titleButton="Crear Ciudad"
          title="Ciudades"
        />
      ) : (
        <FormView
<<<<<<< HEAD
          config={CityFormConfig}
=======
          config={{
            ...CityFormConfig,
            initialValues: editingCity || CityFormConfig.initialValues
          }}
>>>>>>> 9cca994 (Para mi sistema)
          isEditing={!!editingCity}
          formValidations={formValidations}
          onSubmitCallback={handleSubmit}
          onCancel={() => setIsFormView(false)}
        />
      )}
    </AppLayout>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> 9cca994 (Para mi sistema)
