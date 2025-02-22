import { Navigate, Route, Routes } from "react-router-dom";
import {
  AccountPage,
  AppPage,
  AccountTypePage,
  VoucherPage,
  ReasonNomination,
  WorkerNomination,
  PayroallNomination,
} from "../pages";
import { CitiesPage } from "../pages/CitiesPage";
import { ResultBalancesPage } from "../pages/ResultBalancesPage";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppPage />} />

        <Route path="account" element={<AccountPage />} />
        <Route path="account_type" element={<AccountTypePage />} />
        <Route path="voucher" element={<VoucherPage />} />
        <Route path="result_balance" element={<ResultBalancesPage />} />
        <Route path="reason" element={<ReasonNomination />} />
        <Route path="workers" element={<WorkerNomination />} />
        <Route path="payroll" element={<PayroallNomination />} />
        <Route path="cities" element={<CitiesPage />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      
    </>
  );
};
