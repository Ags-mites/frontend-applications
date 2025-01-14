import React from "react";
import { Grid, TextField, MenuItem, Button, Select, InputLabel, FormControl } from "@mui/material";
import { useForm } from "../../hooks";

export const FormCard = ({ config, onSubmitCallback }) => {
  const { initialValues, fields } = config;
  const { formState, onInputChange, onResetForm } = useForm(initialValues);

  const onSubmit = (event) => {
    event.preventDefault();
    if (onSubmitCallback) onSubmitCallback(formState);
  };

  return (
    <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            {field.type === "text" && (
              <TextField
                label={field.label}
                name={field.name}
                value={formState[field.name] || ""}
                onChange={onInputChange}
                fullWidth
                size="small"
              />
            )}
            {field.type === "select" && (
              <FormControl fullWidth size="small">
                <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
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
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Guardar
          </Button>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={onResetForm}
            sx={{ mt: 2 }}
          >
            Limpiar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
