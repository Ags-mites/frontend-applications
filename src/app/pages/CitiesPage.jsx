import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { AppLayout } from "../layout/AppLayout";
import { FormView, TableInfoView } from "../views";
import { deleteAccount, editAccount, newAccount } from "../../store";

import { format } from "date-fns";

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
};

const formValidations = {
  code: [(value) => value.trim() !== "", "El código es obligatorio"],
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
    }
    setIsFormView(false);
    setEditingCity(null);
  };
  
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

  return (
    <AppLayout>
      {!isFormView ? (
        <TableInfoView
          data={Cities}
          headers={headers}
          onCreateItem={onClickCreateNewCity}
          onEditItem={onEditCity}
          onDeleteItem={onDeleteCity}
          titleButton="Crear Ciudad"
          title="Ciudades"
        />
      ) : (
        <FormView
          config={CityFormConfig}
          isEditing={!!editingCity}
          formValidations={formValidations}
          onSubmitCallback={handleSubmit}
          onCancel={() => setIsFormView(false)}
        />
      )}
    </AppLayout>
  );
};
