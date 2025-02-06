import { Toolbar, Typography, TextField, IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export const EnhancedTableToolbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <Toolbar>
      <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
        Elementos creados
      </Typography>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginRight: 2 }}
      />
      <Tooltip title="Buscar">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};
