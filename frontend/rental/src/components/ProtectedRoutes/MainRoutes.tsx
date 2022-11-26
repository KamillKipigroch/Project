import { Route, Routes } from "react-router-dom";
import Anime from "../../routes/anime";
import Games from "../../routes/games";
import Home from "../../routes/home";
import Login from "../../routes/login";
import Movies from "../../routes/movies";
import Other from "../../routes/other";
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

const MainRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/adminPanelProducts" element={<AdminPanelProducts />} />
    <Route path="/adminPanelCategories" element={<AdminPanelCategories />} />
    <Route path="/adminPanelConditions" element={<AdminPanelConditions />} />
    <Route path="/adminPanelOpinions" element={<AdminPanelOpinions />} />
    <Route path="/adminPanelOrderStatuses" element={<AdminPanelOrderStatuses />} />
    <Route path="/adminPanelProductTypes" element={<AdminPanelProductTypes />} />
    <Route path="/adminPanelQualities" element={<AdminPanelQualities />} />
    <Route path="/adminPanelSubCategories" element={<AdminPanelSubCategories />} />
    <Route path="/register" element={<Register />} />
    <Route path="/movie">
      <Route path=":productId" element={<Product />} />
    </Route>
    <Route path="/movies" element={<Movies />}>
      <Route path=":productId" element={<Product />} />
    </Route>
    <Route path="/games" element={<Games />} />
    <Route path="/anime" element={<Anime />} />
    <Route path="/other" element={<Other />} />
    <Route path="*" element={<PageNotFound />} />

    {/* Protected routes with admin role */}
  </Routes>
);

export default MainRoutes;
