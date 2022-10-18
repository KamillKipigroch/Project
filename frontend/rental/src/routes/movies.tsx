import { getProducts } from "../services/data";
import { Link, Outlet } from "react-router-dom";

export default function Movies() {
  let movies = getProducts();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {movies.map((movie) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/movie/${movie.id}`}
            key={movie.id}
          >
            {movie.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}