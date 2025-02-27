import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { AppLayout } from "../layout/AppLayout";

const data = {
  year: "2025",
  activos: [
    { name: "Activos fijos (Neto)", value: 66083 },
    { name: "Caja", value: 245654 },
  ],
  pasivos: [
    { name: "Capital", value: 0 },
    { name: "Cuentas Corrientes Asociadas", value: 0 },
    { name: "Reservas y Resultados", value: 160937 },
    { name: "Préstamo - deuda financiera", value: 90875 },
    { name: "Deuda social", value: 0 },
    { name: "Deuda IVA", value: 3810 },
    { name: "Deuda fiscal", value: 56116 },
  ],
};

export const ResultBalancesPage = () => {
  return (
    <AppLayout>
      <TableContainer
        component={Paper}
        sx={{ padding: 2, maxWidth: 600, margin: "auto" }}
      >
        <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
          Balance General - {data.year}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">{data.year}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                ACTIVO
              </TableCell>
            </TableRow>
            {data.activos.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">
                  {row.value.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                PASIVO
              </TableCell>
            </TableRow>
            {data.pasivos.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">
                  {row.value.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AppLayout>
  );
};
