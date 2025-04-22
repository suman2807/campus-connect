/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Footer from "./components/footer.jsx";
import React from "react";
import Navbar from "./components/navbar.jsx";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

/**
 * The main root component of the application. This component renders the Navbar,
 * App, and optionally the Footer based on the current route.
 *
 * @returns {JSX.Element} - The rendered JSX for the component.
 */
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
