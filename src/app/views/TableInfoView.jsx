import { Box, Button, Grid, Typography } from "@mui/material";
import { OutlinedCard } from "../ui";
import { EnhancedTable } from "../components";

export const TableInfoView = ({ data, headers, onCreateItem, onEditItem }) => {
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6">Gestionar cuentas</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={() => onCreateItem()}>
            Crear Cuenta
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 5 }}>
          <OutlinedCard>
            <Box sx={{ width: "100%" }}>
              <EnhancedTable
                headers={headers}
                data={data}
                onCreateItem={onCreateItem}
                onEditItem={onEditItem}
              />
            </Box>
          </OutlinedCard>
        </Grid>
      </Grid>
    </>
  );
};
