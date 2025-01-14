import { Calculate, Home, NoteAddSharp, AccountTree, ManageAccounts } from "@mui/icons-material";

export const menuItems = [
  {
    icon: <Home color="primary"/>,
    path: "/",
    description: "Home",
  },
  {
    icon: <Calculate color="primary"/>,
    path: "/account",
    description: "Contabilidad",
    subitems: [
      {
        icon: <ManageAccounts color="secondary"/>,
        path: "/account",
        description: "Crear cuenta",
      },
      {
        icon: <AccountTree color="secondary" />,
        path: "/account_type",
        description: "Crear tipos de cuenta",
      },
      {
        icon: <NoteAddSharp color="secondary" />,
        path: "/voucher",
        description: "Crear comprobantes contables",
      },
    ],
  },
];
