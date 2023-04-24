import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login.jsx";


import Games from "./pages/Games.jsx";
import GameForm from "./pages/GameForm.jsx";


export const AppRouter = ({ isMobile }) => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login isMobile={isMobile} />} />
        
        {/* Games Manager */}
        <Route path="/games" element={<Games isMobile={isMobile} />} />
        <Route path="/game/new" element={<GameForm isMobile={isMobile} />} />
        <Route path="/game/:id/update" element={<GameForm isMobile={isMobile} />} />
      </Routes>
    </Router>
  );
};