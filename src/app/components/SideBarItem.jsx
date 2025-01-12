import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export const SideBarItem = ({ name, icon, description }) => {
  return (
    <NavLink
      to={name}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <Grid container>
            <ListItemText primary={description} />
          </Grid>
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
};
