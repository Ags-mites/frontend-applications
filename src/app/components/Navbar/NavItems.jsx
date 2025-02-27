import {
  Calculate,
  Home,
  NoteAddSharp,
  AccountTree,
  ManageAccounts,
  Person,
<<<<<<< HEAD
  NotesTwoTone,
  NoteRounded,
=======
  Receipt,
  Payment,
  LocationCity,
  People,
>>>>>>> 9cca994 (Para mi sistema)
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
<<<<<<< HEAD
        icon: <NoteRounded color="secondary" />,
        path: "/dashboard/balanceSheet",
        description: "Balance general",
      },
      {
        icon: <NotesTwoTone color="secondary" />,
        path: "/dashboard/incomeStatement",
        description: "Estado de resultados",
=======
        icon: <NoteAddSharp color="secondary" />,
        path: "/dashboard/result_balance",
        description: "Reporte balance de resultados",
>>>>>>> 9cca994 (Para mi sistema)
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
<<<<<<< HEAD
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
=======
    ],
  },
  {
    icon: <Payment color="primary" />,
>>>>>>> 9cca994 (Para mi sistema)
    path: "/dashboard/invoice",
    description: "Facturación",
    subitems: [
      {
<<<<<<< HEAD
        icon: <ManageAccounts color="secondary" />,
        path: "/dashboard/cities",
        description: "Ciudades",
      },
=======
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
>>>>>>> 9cca994 (Para mi sistema)
    ],
  },
];
