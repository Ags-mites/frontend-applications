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
import { Fragment } from "react";

export const ReportsAccountView = ({ data, title }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ padding: 2, maxWidth: 800, margin: "auto" }}
    >
      <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Débito</TableCell>
            <TableCell align="right">Crédito</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((type, typeIndex) => (
            <Fragment key={typeIndex}>
              <TableRow>
                <TableCell colSpan={3} sx={{ fontWeight: "bold" }}>
                  {type.accountTypeName}
                </TableCell>
              </TableRow>
              {type.accounts.map((account, accountIndex) => (
                <TableRow key={accountIndex}>
                  <TableCell>{account.accountName}</TableCell>
                  <TableCell align="right">
                    {account.totalDebit.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {account.totalCredit.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}

              {type.totalRevenue !== undefined && (
                <TableRow>
                  <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                    Total Ingresos
                  </TableCell>
                  <TableCell align="right">
                    {type.totalRevenue.toLocaleString()}
                  </TableCell>
                </TableRow>
              )}
              {type.totalExpenses !== undefined && (
                <TableRow>
                  <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                    Total Gastos
                  </TableCell>
                  <TableCell align="right">
                    {type.totalExpenses.toLocaleString()}
                  </TableCell>
                </TableRow>
              )}
              {type.netIncome !== undefined && (
                <TableRow>
                  <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                    Resultado Neto
                  </TableCell>
                  <TableCell align="right">
                    {type.netIncome.toLocaleString()}
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
