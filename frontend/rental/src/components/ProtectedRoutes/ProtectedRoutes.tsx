import { Outlet } from "react-router-dom";
import Login from "../../routes/login";
import { useStores } from "../../stores/root.store";

const ProtectedRoutes = () => {
  const { authStore } = useStores();

  return authStore.isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
