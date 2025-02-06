import { useState } from "react";
import { FormCard } from "../ui";
import { Table, Button, Input, Select } from "@mui/material";
/* import { Table, Button, Input, Select } from "../components/ui"; */

export const FormViewTable = ({
  config,
  onSubmitCallback,
  onCancel,
  isEditing,
}) => {
  const [entries, setEntries] = useState([]);

  const handleSubmit = (formValues) => {
    if (onSubmitCallback) {
      onSubmitCallback({ ...formValues, entries }, isEditing);
    }
  };

  const handleAddRow = () => {
    setEntries([
      ...entries,
      { account: "", contact: "", description: "", debit: 0, credit: 0 },
    ]);
  };

  const handleRemoveRow = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEntries(updatedEntries);
  };

  return (
    <>
      <FormCard
        config={config}
        onSubmitCallback={handleSubmit}
        onCancel={onCancel}
        isEditing={isEditing}
      ></FormCard>
      <h3>Movimientos</h3>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Cuenta Contable</th>
            <th>Contacto</th>
            <th>Descripción</th>
            <th>Débito</th>
            <th>Crédito</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Select
                  value={entry.account}
                  onChange={(e) =>
                    handleChange(index, "account", e.target.value)
                  }
                >
                  <option value="">Seleccione</option>
                  <option value="1">Cuenta 1</option>
                  <option value="2">Cuenta 2</option>
                </Select>
              </td>
              <td>
                <Input
                  value={entry.contact}
                  onChange={(e) =>
                    handleChange(index, "contact", e.target.value)
                  }
                />
              </td>
              <td>
                <Input
                  value={entry.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
              </td>
              <td>
                <Input
                  type="number"
                  value={entry.debit}
                  onChange={(e) => handleChange(index, "debit", e.target.value)}
                />
              </td>
              <td>
                <Input
                  type="number"
                  value={entry.credit}
                  onChange={(e) =>
                    handleChange(index, "credit", e.target.value)
                  }
                />
              </td>
              <td>
                <Button onClick={() => handleRemoveRow(index)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleAddRow}>+ Agregar fila</Button>
    </>
  );
};
