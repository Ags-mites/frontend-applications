import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
  FormControlLabel,
  Switch,
} from "@mui/material";

import { getComparator, descendingComparator } from "./EnhancedUtilTable";

import { EnhancedTableHead } from "./EnhancedTableHead";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableRow } from "./EnhancedTableRow";

export const EnhancedTable = ({ headers, data, onEditItem, onDeleteItem, onSendItem }) => {
  const [rows, setRows] = useState(data);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    setRows(data);
  }, [data]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm)
    )
  );

  const handleEdit = (row) => {
    onEditItem(row);
  };

  const handleDelete = (row) => {
    onDeleteItem(row);
  };

  const handleIntegration = (row) => {
    if (onSendItem) {
      onSendItem(row);
    }
  };
  const visibleRows = filteredRows
    .slice()
    .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar onSearch={handleSearch} />
        <TableContainer>
          <Table size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              headers={headers}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <EnhancedTableRow
                  key={row.id}
                  row={row}
                  headers={headers}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSendIntegration={onSendItem ? handleIntegration : undefined}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Eliminar relleno"
      />
    </Box>
  );
};
