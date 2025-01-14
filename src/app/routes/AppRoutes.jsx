import { Navigate, Route, Routes } from "react-router-dom";
import { CreateAccountPage,AppPage, Voucher } from "../pages";
import { CreateAccountTypePage } from "../pages/CreateAccountTypePage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppPage />} />
      <Route path="account" element={<CreateAccountPage />} />
      <Route path="account_type" element={<CreateAccountTypePage />} />
      <Route path="voucher" element={<Voucher />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
