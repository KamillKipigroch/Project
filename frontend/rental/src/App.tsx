import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Login from "./routes/login";
import Movies from "./routes/movies";
import Games from "./routes/games";
import Anime from "./routes/anime";
import Other from "./routes/other";
import Product from "./routes/product";
import NavBar from "./components/navBar"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Typography } from '@mui/material';
import Register from './routes/register';

function App() {

  return (
    <div>

        <NavBar />

      <Routes>
        <Route path="/home" element={<Home /> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie" >
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/movies" element={<Movies /> }>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/games" element={<Games /> }/>
        <Route path="/anime" element={<Anime /> }/>
        <Route path="/other" element={<Other /> }/>
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
