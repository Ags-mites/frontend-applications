import { Navigate, Route, Routes } from "react-router-dom";
import { AccountPage,AppPage, Voucher, AccountTypePage } from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppPage />} />
      <Route path="account" element={<AccountPage />} />
      <Route path="account_type" element={<AccountTypePage />} />
      <Route path="voucher" element={<Voucher />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
