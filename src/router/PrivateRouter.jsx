import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const { status } = useSelector(state => state.auth);
  return status === "authenticated" ? children : <Navigate to="/auth/login" />;
};
