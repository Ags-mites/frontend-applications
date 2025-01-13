import { Calculate, Home } from "@mui/icons-material";

export const menuItems = [
    {
      icon: <Home />,
      path: "/",
      description: "Home",
    },
    {
      icon: <Calculate />,
      path: "/account",
      description: "Contabilidad",
      subitems: [
        {
          icon: <Calculate />,
          path: "/account",
          description: "Crear cuenta",
        },
      ],
    }
  ];