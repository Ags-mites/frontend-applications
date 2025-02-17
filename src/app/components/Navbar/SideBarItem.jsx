import { useState } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import Collapse from "@mui/material/Collapse";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

export const SideBarItem = ({ icon, description, subitems }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      {subitems && subitems.length > 0 ? (
        <>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={description} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {subitems.map((subitem) => (
            <Collapse in={open} timeout="auto" unmountOnExit key={subitem.path}>
              <List component="div" disablePadding>
                <NavLink
                  to={subitem.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>{subitem.icon}</ListItemIcon>
                    <ListItemText primary={subitem.description} />
                  </ListItemButton>
                </NavLink>
              </List>
            </Collapse>
          ))}
        </>
      ) : (
        <NavLink to={description} style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={description} />
          </ListItemButton>
        </NavLink>
      )}
    </>
  );
};
