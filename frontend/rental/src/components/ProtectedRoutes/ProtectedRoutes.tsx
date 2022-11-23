import { Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "../../routes/login";
import { authStore } from "../../stores/auth.store";

type Props = {
  allowedRoles: string[];
};

const ProtectedRoutes = (props: Props) => {
  const location = useLocation();

  return authStore.rol?.find((role) => props.allowedRoles.includes(role)) ? (
    <Outlet />
  ) : authStore.isAuth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
