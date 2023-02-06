import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Games from "./pages/Games.jsx";


export const AppRouter = ({ isMobile }) => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Games isMobile={isMobile} />} />
      </Routes>
    </Router>
  );
};