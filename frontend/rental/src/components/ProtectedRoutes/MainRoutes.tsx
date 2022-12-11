import { Route, Routes } from "react-router-dom";
import Home from "../../routes/home";
import Login from "../../routes/login";
import Costumes from "../../routes/Costumes";
import Product from "../../routes/product";
import Register from "../../routes/register";
import PageNotFound from "../PageNotFound/PageNotFound";
import AdminPanelProducts from "../../routes/adminPanels/adminPanelProducts";
import AdminPanelCategories from "../../routes/adminPanels/adminPanelCategories";
import AdminPanelConditions from "../../routes/adminPanels/adminPanelConditions";
import AdminPanelOpinions from "../../routes/adminPanels/adminPanelOpinions";
import AdminPanelOrderStatuses from "../../routes/adminPanels/adminPanelOrderStatuses";
import AdminPanelProductTypes from "../../routes/adminPanels/adminPanelProductTypes";
import AdminPanelQualities from "../../routes/adminPanels/adminPanelQualities";
import AdminPanelSubCategories from "../../routes/adminPanels/adminPanelSubCategories";
import AdminPanel from "../../routes/adminPanels/adminPanel";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminPanelOrders from "../../routes/adminPanels/AdminPanelOrders";
import { UserRole } from "../../models/Enums";
import UserOrders from "../../routes/UserOrders";

const MainRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/movie">
      <Route path=":productId" element={<Product />} />
    </Route>
    <Route path="/costumes" element={<Costumes />}>
      <Route path=":productId" element={<Product />} />
    </Route>
    <Route path="*" element={<PageNotFound />} />

    {/* Protected routes - only auth, no roles required */}
    <Route element={<ProtectedRoutes allowedRoles={[UserRole.Admin, UserRole.User]} />}>
      <Route path="/userOrders" element={<UserOrders />} />
    </Route>

    {/* Protected routes with admin role */}
    <Route element={<ProtectedRoutes allowedRoles={["Admin"]} />}>
      <Route path="/adminPanel" element={<AdminPanel />} />
      <Route path="/adminPanelProducts" element={<AdminPanelProducts />} />
      <Route path="/adminPanelCategories" element={<AdminPanelCategories />} />
      <Route path="/adminPanelConditions" element={<AdminPanelConditions />} />
      <Route path="/adminPanelOpinions" element={<AdminPanelOpinions />} />
      <Route
        path="/adminPanelOrderStatuses"
        element={<AdminPanelOrderStatuses />}
      />
      <Route
        path="/adminPanelProductTypes"
        element={<AdminPanelProductTypes />}
      />
      <Route path="/adminPanelQualities" element={<AdminPanelQualities />} />
      <Route
        path="/adminPanelSubCategories"
        element={<AdminPanelSubCategories />}
      />
      <Route path="/adminPanelOrders" element={<AdminPanelOrders />} />
    </Route>
  </Routes>
);

export default MainRoutes;
