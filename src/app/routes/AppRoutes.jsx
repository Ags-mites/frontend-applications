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
import { AppLayout } from "../layout/AppLayout";
import { CitiesPage } from "../pages/CitiesPage";

export const AppRoutes = () => {
  return (
    <>
    <AppLayout > 

      <Routes>
        <Route path="/" element={<AppPage />} />

        <Route path="account" element={<AccountPage />} />
        <Route path="account_type" element={<AccountTypePage />} />
        <Route path="voucher" element={<VoucherPage />} />
        <Route path="reason" element={<ReasonNomination />} />
        <Route path="workers" element={<WorkerNomination />} />
        <Route path="payroll" element={<PayroallNomination />} />
        <Route path="cities" element={<CitiesPage />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      </ AppLayout>
    </>
  );
};
