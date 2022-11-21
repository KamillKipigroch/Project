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

const MainRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="" element={<Home />} />
    <Route path="/login" element={<Login />} />
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
