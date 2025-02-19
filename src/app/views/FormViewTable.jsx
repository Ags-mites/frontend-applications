import { useState, useEffect } from "react";
import { FormCard, OutlinedCard } from "../ui";
import {
  Table,
  Button,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

export const FormViewTable = ({
  config,
  tableConfig,
  onSubmitCallback,
  onCancel,
  isEditing,
  formValidations,
}) => {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    if (Array.isArray(config.initialValues.details)) {
      setEntries(
        config.initialValues.details.map((detail) => {
          const formDetails = {};
          
          Object.keys(detail).forEach(key => {
            formDetails[key] = detail[key] || (key === "debitAmount" || key === "creditAmount" ? 0 : "");
          });
  
          return formDetails;
        })
      );
    }
  }, [config.initialValues.details]);
  

  const handleSubmit = (formValues, isEditing) => {
    if (onSubmitCallback) {
      onSubmitCallback({ ...formValues, entries }, isEditing);
    }
  };

  const handleAddRow = () => {
    const newRow = tableConfig.columns.reduce((acc, col) => {
      acc[col.name] = col.defaultValue || "";
      return acc;
    }, {});
    setEntries([...entries, newRow]);
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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <FormCard
            config={config}
            InputLabelProps={{ shrink: true }}
            onSubmitCallback={handleSubmit}
            onCancel={onCancel}
            isEditing={isEditing}
            formValidations={formValidations}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <OutlinedCard>
            <h3>{tableConfig.title || "Movimientos"}</h3>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
                <TableHead>
                  <TableRow>
                    {tableConfig.columns.map((col) => (
                      <TableCell key={col.name}>{col.label}</TableCell>
                    ))}
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {entries.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {tableConfig.columns.map((col) => (
                        <TableCell key={col.name}>
                          {col.type === "text" || col.type === "number" ? (
                            <TextField
                              size="small"
                              type={col.type}
                              value={row[col.name] || ""}
                              onChange={(e) =>
                                handleChange(rowIndex, col.name, e.target.value)
                              }
                            />
                          ) : col.type === "select" ? (
                            <Select
                              size="small"
                              value={row[col.name] || ""}
                              onChange={(e) =>
                                handleChange(rowIndex, col.name, e.target.value)
                              }
                              sx={{ minWidth: 150 }}
                              displayEmpty
                            >
                              <MenuItem value="" disabled>
                                Selecciona una opción
                              </MenuItem>
                              {col.options.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            row[col.name]
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        <Button
                          color="error"
                          onClick={() => handleRemoveRow(rowIndex)}
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={tableConfig.columns.length + 1}>
                      <Button onClick={handleAddRow}>+ Agregar fila</Button>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </OutlinedCard>
        </Grid>
      </Grid>
    </>
  );
};
