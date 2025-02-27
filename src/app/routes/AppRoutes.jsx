import { Navigate, Route, Routes } from "react-router-dom";
import {
  AccountPage,
  AppPage,
  AccountTypePage,
  VoucherPage,
  ReasonNomination,
  WorkerNomination,
  PayroallNomination,
  BalanceSheetPage,
  IncomeStatementPage
} from "../pages";
import { CitiesPage } from "../pages/CitiesPage";
import { ClientPage } from "../pages/ClientPage";
import { InvoicePage } from "../pages/InvoicePage";
import { ReportPage } from "../pages/ReportPage";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppPage />} />

        <Route path="account" element={<AccountPage />} />
        <Route path="account_type" element={<AccountTypePage />} />
        <Route path="voucher" element={<VoucherPage />} />
        <Route path="balanceSheet" element={<BalanceSheetPage />} />
        <Route path="incomeStatement" element={<IncomeStatementPage />} />
        <Route path="reason" element={<ReasonNomination />} />
        <Route path="workers" element={<WorkerNomination />} />
        <Route path="payroll" element={<PayroallNomination />} />
        <Route path="cities" element={<CitiesPage />} />
        <Route path="clients" element={<ClientPage />} />
        <Route path="invoices" element={<InvoicePage />} />
        <Route path="reports" element={<ReportPage />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      
    </>
  );
};
