import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Movies from "./routes/movies";
import Product from "./routes/product";

function App() {

  return (
    <div>
      {/* <h1>Bookkeeper!</h1>
      <Button variant="contained">Hello World</Button> */}
      
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/home">Home</Link> |{" "}
        <Link to="/movies">Movies</Link> |{" "}
        <Link to="/games">Games</Link> |{" "}
        <Link to="/anime">Anime</Link> |{" "}
        <Link to="/other">Other</Link> |{" "}

      </nav>

      <Routes>
        <Route path="/home" element={<Home /> }/>
        <Route path="/movie" >
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/movies" element={<Movies /> }>
          {/* <Route path=":productId" element={<Product />} /> */}
        </Route>
        {/* <Route path="/games" element={<Games /> }/>
        <Route path="/anime" element={<Anime /> }/>
        <Route path="/other" element={<Other /> }/> */}
        <Route path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Error 404! No page found!</p>
            </main>
          }/>
      </Routes>
    </div>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       {<img src={logo} className="App-logo" alt="logo" />}
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
