import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Games from "./pages/Games.jsx";
import GameDetails from "./pages/GameDetails.jsx";
import Home from "./pages/Home.jsx";


export const AppRouter = ({ isMobile }) => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isMobile={isMobile} />} />
        <Route path="/registry" element={<Games isMobile={isMobile} />} />
        <Route path="/registry/:id" element={<GameDetails isMobile={isMobile} />} />
      </Routes>
    </Router>
  );
};