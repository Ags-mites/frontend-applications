import { TableCell, TableRow, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Send } from "@mui/icons-material";

export const EnhancedTableRow = ({
  row,
  headers,
  onEdit,
  onDelete,
  onSendIntegration,
}) => {
  
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
        {onSendIntegration && (
          <Tooltip title="Integración">
            <IconButton onClick={() => onSendIntegration(row)}>
              <Send />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};
