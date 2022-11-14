import { Outlet } from "react-router-dom";
import Login from "../../routes/login";
import { authStore } from "../../stores/auth.store";

const ProtectedRoutes = () => {
  return authStore.isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
