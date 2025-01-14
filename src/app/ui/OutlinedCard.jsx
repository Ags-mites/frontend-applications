import {
  Box,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from "@mui/material";
import { FormCard } from "./FormCard";

export const OutlinedCard =({
  title,
  subtitle,
  children
}) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardHeader
          title={
            <Typography
              variant="h6"
            >
              {title}
            </Typography>
          }
          subheader={
            <Typography
              variant="body2"
            >
              {subtitle}
            </Typography>
          }
        />
        <CardContent>
         { children }
        </CardContent>
      </Card>
    </Box>
  );
}


/* <Grid item xs={6} sx={{ mt: 2 }}>
    <Card variant="outlined">
    <CardContent>
    <Typography variant="body2">Eliminar</Typography>
    <Grid container spacing={2}>
    <Grid item xs={12} sx={{ mt: 2 }}>
    <Autocomplete
    disablePortal
    options={[
      { label: "The Godfather", id: 1 },
      { label: "Pulp Fiction", id: 2 },
      ]}
      size="small"
      renderInput={(params) => <TextField {...params} label="Película" />}
      />
      </Grid>
      </Grid>
      </CardContent>
      </Card>
      </Grid> */
