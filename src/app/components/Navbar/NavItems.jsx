import {
  Calculate,
  Home,
  NoteAddSharp,
  AccountTree,
  ManageAccounts,
  Person,
  NotesTwoTone,
  NoteRounded,
  Receipt,
  Payment,
  LocationCity,
  People,
} from "@mui/icons-material";

export const menuItems = [
  {
    icon: <Home color="primary" />,
    path: "/",
    description: "Home",
  },
  {
    icon: <Calculate color="primary" />,
    path: "/dashboard/account",
    description: "Contabilidad",
    subitems: [
      {
        icon: <ManageAccounts color="secondary" />,
        path: "/dashboard/account",
        description: "Cuenta",
      },
      {
        icon: <AccountTree color="secondary" />,
        path: "/dashboard/account_type",
        description: "Tipos de cuenta",
      },
      {
        icon: <NoteAddSharp color="secondary" />,
        path: "/dashboard/voucher",
        description: "Comprobantes contables",
      },
      {
        icon: <NoteRounded color="secondary" />,
        path: "/dashboard/balanceSheet",
        description: "Balance general",
      },
      {
        icon: <NotesTwoTone color="secondary" />,
        path: "/dashboard/incomeStatement",
        description: "Estado de resultados",
      },
    ],
  },
  {
    icon: <Person color="primary" />,
    path: "/dashboard/nomina",
    description: "Nómina",
    subitems: [
      {
        icon: <ManageAccounts color="secondary" />,
        path: "/dashboard/reason",
        description: "Motivo nómina",
      },
      {
        icon: <AccountTree color="secondary" />,
        path: "/dashboard/workers",
        description: "Empleados",
      },
      {
        icon: <NoteAddSharp color="secondary" />,
        path: "/dashboard/payroll",
        description: "Crear comprobantes nomina",
      },
      {
        icon: <NoteRounded color="secondary" />,
        path: "/dashboard/balanceSheet",
        description: "Balance general",
      },
      {
        icon: <NotesTwoTone color="secondary" />,
        path: "/dashboard/incomeStatement",
        description: "Estado de resultados",
      },
    ],
  },
  {
    icon: <Person color="primary" />,
    path: "/dashboard/invoice",
    description: "Facturación",
    subitems: [
      {
        icon: <LocationCity color="secondary" />,
        path: "/dashboard/cities",
        description: "Ciudades",
      },
      {
        icon: <People color="secondary" />,
        path: "/dashboard/clients",
        description: "Clientes",
      },
      {
        icon: <Receipt color="secondary" />,
        path: "/dashboard/invoices",
        description: "Facturas",
      },
      {
        icon: <NoteAddSharp color="secondary" />,
        path: "/dashboard/reports",
        description: "Reportes",
      },
    ],
  },
];
