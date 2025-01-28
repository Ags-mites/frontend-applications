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
        description: "Cuenta",
      },
      {
        icon: <AccountTree color="secondary" />,
        path: "/account_type",
        description: "Tipos de cuenta",
      },
      {
        icon: <NoteAddSharp color="secondary" />,
        path: "/voucher",
        description: "Comprobantes contables",
      },
    ],
  },
  {
    icon: <Calculate color="primary"/>,
    path: "/nomina",
    description: "Nómina",
    subitems: [
      {
        icon: <ManageAccounts color="secondary"/>,
        path: "/reason",
        description: "Motivo nómina",
      },
      {
        icon: <AccountTree color="secondary" />,
        path: "/workers",
        description: "Empleados",
      },
      {
        icon: <NoteAddSharp color="secondary" />,
        path: "/payroll",
        description: "Crear comprobantes nomina",
      },
    ],
  },
];
