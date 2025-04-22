/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./index.css";
import App from "./App.jsx";
import Footer from "./components/footer.jsx";
import Navbar from "./components/navbar.jsx";
import logo from "../public/logo.png";
import { BrowserRouter as Router } from "react-router-dom";

/**
 * Represents the loading screen component for the SRRMAP Campus Connect application.
 *
 * This component displays a text that gradually reveals each character from the string "SRRMAP Campus Connect...".
 * It includes an image of the university logo and applies styling to ensure the text is visually appealing.
 *
 * @returns {JSX.Element} - The JSX element representing the loading screen.
 */
const LoadingScreen = () => {
  const text = "SRRMAP Campus Connect...";
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setVisibleText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval as needed

    return () => clearInterval(interval); // Clean up interval
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={logo} alt="University Logo" className="w-24 mb-6" />
      <p
        className="text-3xl text-gray-700 whitespace-pre"
        style={{
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {visibleText}
      </p>
    </div>
  );
};

/**
 * The main application component that renders either a loading screen or the full app layout based on its state.
 *
 * @returns {JSX.Element} - The JSX element representing the current state of the application (loading or fully loaded).
 */
const MainApp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000); // Adjust the time as needed
    return () => clearTimeout(timeout);
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <Router>
      <Navbar />
      <App />
      <Footer />
    </Router>
  );
};

// Export the MainApp component for use in main.jsx
export default MainApp;
