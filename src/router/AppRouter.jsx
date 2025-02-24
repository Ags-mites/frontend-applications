import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { AppRoutes } from "../app/routes/AppRoutes";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRouter";

export const AppRouter = () => {
  const status = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      <Route
        path="auth/*"
        element={
          <PublicRoute>
            <AuthRoutes />
          </PublicRoute>
        }
      />

      <Route
        path="dashboard/*"
        element={
          <PrivateRoute>
            <AppRoutes />
          </PrivateRoute>
        }
      />

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
