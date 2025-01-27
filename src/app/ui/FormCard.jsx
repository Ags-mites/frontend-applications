import React from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { useForm } from "../../hooks";
import { OutlinedCard } from "./OutlinedCard";

export const FormCard = ({ config, onSubmitCallback, onCancel, isEditing }) => {
  const { initialValues, fields } = config;
  const { formState, onInputChange, onResetForm } = useForm(initialValues);

  const onSubmit = (event) => {
    event.preventDefault();
    if (onSubmitCallback) {
      onSubmitCallback(formState, isEditing);
    }
  };

  return (
    <OutlinedCard>
      <Box sx={{ width: "100%" }}>
        <Grid container sx={{ mb: 4 }}>
          <Typography variant="h6">
            {isEditing ? "Editar cuenta" : "Crear nueva cuenta"}
          </Typography>
        </Grid>
        <form
          onSubmit={onSubmit}
          className="animate__animated animate__fadeIn animate__faster"
        >
          <Grid container spacing={2}>
            {fields.map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                {field.type === "text" && (
                  <TextField
                    label={field.label}
                    name={field.name}
                    value={formState[field.name] || ""}
                    onChange={onInputChange}
                    InputProps={{
                      readOnly: field.readOnly ? true : false,
                    }}
                    fullWidth
                    size="small"
                  />
                )}
                {field.type === "select" && (
                  <FormControl fullWidth size="small">
                    <InputLabel id={`${field.name}-label`}>
                      {field.label}
                    </InputLabel>
                    <Select
                      labelId={`${field.name}-label`}
                      name={field.name}
                      value={formState[field.name] || ""}
                      onChange={onInputChange}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
          >
            <Grid item xs={2}>
              <Button type="submit" variant="contained" fullWidth>
                {isEditing ? "Actualizar" : "Guardar"}
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={onResetForm}
              >
                Limpiar
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button type="button" color="error" fullWidth onClick={onCancel}>
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </OutlinedCard>
  );
};
