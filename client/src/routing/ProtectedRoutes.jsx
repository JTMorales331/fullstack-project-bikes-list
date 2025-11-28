import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

export default function ProtectedRoutes() {

  return isAuthenticated() ? <Outlet /> : <Navigate to="/sign-in" />;

}
