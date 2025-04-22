/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Footer from "./components/footer.jsx";
import React from "react";
import Navbar from "./components/navbar.jsx";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

function RootComponent() {
  const location = useLocation(); // Get the current route

  
  const showFooter = location.pathname !== "/admin" && location.pathname !== "/login" && location.pathname !== "/admin/logs" && location.pathname !== "/chat";

  return (
    <>
      <Navbar />
      <App />
      {showFooter && <Footer />}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <RootComponent />
    </Router>
  </StrictMode>
);
