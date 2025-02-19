import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { SideBarItem } from "./SideBarItem";
import { menuItems } from "./NavItems";

import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import { useSelector } from "react-redux";

export const SideBar = ({ drawerWidth = 240 }) => {
  const { displayName } = useSelector((state) => state.auth);

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              {displayName}
            </Typography>
          </Toolbar>
          <Divider />

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Menú
              </ListSubheader>
            }
          >
            {menuItems.map((item) => (
              <SideBarItem
                key={item.path}
                icon={item.icon}
                description={item.description}
                subitems={item.subitems}
              />
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
};
