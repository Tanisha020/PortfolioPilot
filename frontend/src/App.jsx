import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import Layout from "./Layout/Homelayout.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import Home from "./pages/Home/Home.jsx";
import SimulationPage from "./pages/Simulation/SimulationPage.jsx";
import SuggestionPage from "./pages/Suggestion/SuggestionPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/suggestion" element={<SuggestionPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
