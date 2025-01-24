import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

export const EnhancedTableHead = ({ headers, order, orderBy, onRequestSort }) => {
  const keys = Object.keys(headers);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {keys.map((key) => (
          <TableCell
            key={key}
            sortDirection={orderBy === key ? order : false}
          >
            <TableSortLabel
              active={orderBy === key}
              direction={orderBy === key ? order : "asc"}
              onClick={createSortHandler(key)}
            >
              {headers[key] || key}
              {orderBy === key ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Acciones</TableCell>
      </TableRow>
    </TableHead>
  );
};
