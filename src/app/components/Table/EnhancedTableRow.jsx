import {
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const EnhancedTableRow = ({ row, headers, onEdit, onDelete }) => {
  return (
    <TableRow hover>
      {Object.keys(headers).map((key) => (
        <TableCell key={key}>{row[key]}</TableCell>
      ))}
      <TableCell>
        <Tooltip title="Editar">
          <IconButton onClick={() => onEdit(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton onClick={() => onDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};