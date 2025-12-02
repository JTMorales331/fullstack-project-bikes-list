import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

export function ProtectedRoutes() {

  return isAuthenticated() ? <Outlet /> : <Navigate to="/sign-in" />;

}
export function UnAuthRoutes() {

  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" />;

}
