import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import logo from "../../assets/logo.jpeg";

const Header = () => {
  const [state, setState] = useState({
    loggedInUser: null,
    profilePhoto: null,
    showLogout: false,
    menuOpen: false,
  });

  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      loggedInUser: localStorage.getItem("loggedInUser"),
      profilePhoto: localStorage.getItem("profilePhoto"),
    }));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("profilePhoto");
    localStorage.removeItem("token");
    handleSuccess(`${state.loggedInUser} Logged Out`);
    localStorage.removeItem("loggedInUser");

    setState((prevState) => ({
      ...prevState,
      loggedInUser: null,
      profilePhoto: null,
      showLogout: false,
    }));

    setTimeout(() => navigate("/"), 1000);
  };

  const toggleLogout = () =>
    setState((prevState) => ({ ...prevState, showLogout: !prevState.showLogout }));

  const toggleMenu = () =>
    setState((prevState) => ({ ...prevState, menuOpen: !prevState.menuOpen }));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setState((prevState) => ({ ...prevState, showLogout: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-[#2A2A3A] text-white shadow-md border-b border-[#3B3B4F]">
      <div className="container mx-auto flex justify-between items-center p-4 lg:p-6">
        
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="PortfolioPilot Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-2xl font-bold ml-3">PortfolioPilot</h1>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-gray-300 text-2xl" onClick={toggleMenu}>
          {state.menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Menu */}
        <nav className={`lg:flex items-center space-x-6 ${state.menuOpen ? "flex flex-col absolute top-16 left-0 w-full bg-[#2A2A3A] p-5 border-t border-[#3B3B4F]" : "hidden lg:flex"}`}>
          <Link to="/" className="hover:text-[#3B82F6] transition-colors">Home</Link>
          <Link to="/simulation" className="hover:text-[#3B82F6] transition-colors">Simulation</Link>
          <Link to="/risk-assessment" className="hover:text-[#3B82F6] transition-colors">Assessment</Link>
          <Link to="/suggestion" className="hover:text-[#3B82F6] transition-colors">Suggestions</Link>

          {state.loggedInUser ? (
            <div className="relative" ref={profileRef}>
              {state.profilePhoto ? (
                <img
                  src={state.profilePhoto}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleLogout}
                />
              ) : (
                <FaUserCircle
                  className="w-10 h-10 text-gray-400 cursor-pointer"
                  onClick={toggleLogout}
                />
              )}
              {state.showLogout && (
                <button
                  onClick={handleLogout}
                  className="absolute right-0 mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
