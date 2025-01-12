import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { SideBarItem } from "./SideBarItem";
import { Calculate, Home } from "@mui/icons-material";

const menuItems = [
  {
    icon: <Home />,
    path: "/",
    description: "Home",
  },
  {
    icon: <Calculate />,
    path: "/account",
    description: "Contabilidad",
  },
  {
    icon: <Calculate />,
    path: "/account",
    description: "Contabilidad",
  },
];

export const SideBar = ({ drawerWidth = 240 }) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Mi Aplicación
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {menuItems.map((item) => (
            <SideBarItem
              key={item.path}
              name={item.path}
              icon={item.icon}
              description={item.description}
            />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
