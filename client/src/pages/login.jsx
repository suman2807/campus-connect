/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { FaUser, FaUserShield } from "react-icons/fa"; 
import logo from "../../public/logo.png"; // Replace with your university logo URL

// Hardcoded list of admin emails
const adminEmails = ["daksh_vashishtha@srmap.edu.in", "admin2@srmap.edu.in"];

/**
 * A React component that handles user login for both students and admins.
 *
 * This component checks if the authenticated user is an admin. If not,
 * it redirects them to the home page. For admins, it navigates them to the admin dashboard.
 *
 * @returns {JSX.Element} The JSX representing the Login form with student and admin login options.
 */
function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!adminEmails.includes(user.email)) {
          navigate("/"); // Redirect regular users to home
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  /**
   * Handles the sign-in process using a popup provider.
   *
   * This function attempts to log in the user using a specified authentication provider.
   * If the user's email ends with "@srmap.edu.in", they are redirected to the home page.
   * Otherwise, an alert is shown prompting them to use their university email for login,
   * and the user is signed out.
   *
   * @async
   * @function handleSignIn
   * @throws {Error} If there's an error during the sign-in process.
   */
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      if (result.user.email.endsWith("@srmap.edu.in")) {
        navigate("/"); // Redirect regular users to home
      } else {
        alert("Please log in using your university email.");
        await signOut(auth);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  /**
   * Handles the login process for administrative users.
   *
   * This function attempts to log in an user using a popup authentication method provided by Firebase Authentication.
   * If the logged-in user's email is included in the list of admin emails, the user is redirected to the admin dashboard.
   * Otherwise, the function alerts that access is denied and signs out the user.
   *
   * @async
   * @returns {void}
   */
  const handleAdminLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      if (adminEmails.includes(result.user.email)) {
        navigate("/admin");
      } else {
        alert("Access denied. Admins only.");
        await signOut(auth);
      }
    } catch (error) {
      console.error("Error during admin login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
        {/* University Image Section */}
        <div className="flex justify-center">
          <img
            src={logo} // Replace with your university logo URL
            alt="University Logo"
            className="h-32 w-32 object-contain mb-4"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h1>

        {/* Student Login Button */}
        <button
          onClick={handleSignIn}
          className="w-full flex items-center justify-center gap-3 rounded-lg bg-[#5e7b34] px-4 py-3 text-white text-lg font-semibold hover:bg-[#49642a] transition duration-300"
        >
          <FaUser className="text-white" />
          Student Login
        </button>

        {/* Admin Login Button */}
        <button
          onClick={handleAdminLogin}
          className="w-full flex items-center justify-center gap-3 rounded-lg bg-[#5e7b34] px-4 py-3 text-white text-lg font-semibold hover:bg-[#49642a] transition duration-300"
        >
          <FaUserShield className="text-white" />
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default Login;
