import { Navigate, Route, Routes } from "react-router-dom";
import { AccountPage,AppPage, AccountTypePage, VoucherPage, ReasonNomination } from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppPage />} />
      <Route path="account" element={<AccountPage />} />
      <Route path="account_type" element={<AccountTypePage />} />
      <Route path="voucher" element={<VoucherPage />} />

      <Route path="reason" element={<ReasonNomination />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
