import { Navigate, Route, Routes } from "react-router-dom";
import {
  AccountPage,
  AppPage,
  AccountTypePage,
  VoucherPage,
  ReasonNomination,
  WorkerNomination,
  PayroallNomination,
<<<<<<< HEAD
  BalanceSheetPage,
  IncomeStatementPage
} from "../pages";
import { CitiesPage } from "../pages/CitiesPage";
=======
} from "../pages";
import { CitiesPage } from "../pages/CitiesPage";
import { ClientPage } from "../pages/ClientPage";
import { InvoicePage } from "../pages/InvoicePage";
import { ReportPage } from "../pages/ReportPage";
import { ResultBalancesPage } from "../pages/ResultBalancesPage";
>>>>>>> 9cca994 (Para mi sistema)

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppPage />} />

        <Route path="account" element={<AccountPage />} />
        <Route path="account_type" element={<AccountTypePage />} />
        <Route path="voucher" element={<VoucherPage />} />
<<<<<<< HEAD
        <Route path="balanceSheet" element={<BalanceSheetPage />} />
        <Route path="incomeStatement" element={<IncomeStatementPage />} />
=======
        <Route path="result_balance" element={<ResultBalancesPage />} />
>>>>>>> 9cca994 (Para mi sistema)
        <Route path="reason" element={<ReasonNomination />} />
        <Route path="workers" element={<WorkerNomination />} />
        <Route path="payroll" element={<PayroallNomination />} />
        <Route path="cities" element={<CitiesPage />} />
<<<<<<< HEAD
=======
        <Route path="clients" element={<ClientPage />} />
        <Route path="invoices" element={<InvoicePage />} />
        <Route path="reports" element={<ReportPage />} />
>>>>>>> 9cca994 (Para mi sistema)

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      
    </>
  );
};
