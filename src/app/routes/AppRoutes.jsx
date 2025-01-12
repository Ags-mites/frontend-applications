import { Navigate, Route, Routes } from "react-router-dom";
import { AppPage } from "../pages/AppPage";
import { AccountPage } from "../pages/AccountPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppPage />} />
      <Route path="account" element={<AccountPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
