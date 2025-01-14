import { AppLayout } from "../layout/AppLayout";
import { OutlinedCard, FormCard, EnhancedTable } from "../ui";
import {
  Autocomplete,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export const createAccountConfig = {
  initialValues: {
    cod: "",
    name: "",
    accoutType: "",
    status: "",
  },
  fields: [
    { name: "cod", label: "Código", type: "text" },
    { name: "name", label: "Nombre", type: "text" },
    {
      name: "accoutType",
      label: "Tipo de cuenta",
      type: "select",
      options: [
        { label: "The Godfather", id: 1 },
        { label: "Pulp Fiction", id: 2 },
      ],
    },
    {
      name: "status",
      label: "Estado",
      type: "select",
      options: [
        { label: "Activo", id: 1 },
        { label: "Inactivo", id: 2 },
      ],
    },
  ],
};

export const Voucher = () => {
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formValues);
    }
  };
  return (
    <AppLayout>
      <Typography variant="h6">Gestionar cuentas</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ mt: 2 }}>
          <OutlinedCard
            title="Crear cuenta"
            subtitle="Aquí se podrán crear las cuentas"
          >
            <FormCard
              config={createAccountConfig}
              onSubmitCallback={handleSubmit}
            />
          </OutlinedCard>
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }}>
          <OutlinedCard
            title="Editar cuenta"
            subtitle="Aquí se podrán editar las cuentas"
          >
            <FormCard
              config={createAccountConfig}
              onSubmitCallback={handleSubmit}
            />
          </OutlinedCard>
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }}>
          <OutlinedCard title="Eliminar" subtitle="Eliminar cuentas">
            <Autocomplete
              disablePortal
              options={[
                { label: "The Godfather", id: 1 },
                { label: "Pulp Fiction", id: 2 },
              ]}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Película" />
              )}
            />
          </OutlinedCard>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <OutlinedCard title="Eliminar" subtitle="Eliminar cuentas">
            <EnhancedTable />
          </OutlinedCard>
        </Grid>
      </Grid>
    </AppLayout>
  );
};
