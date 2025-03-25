import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import logo from "../../assets/logo.jpeg"; 

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const profilePhoto = localStorage.getItem("profilePhoto");
    setProfilePhoto(profilePhoto);
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("profilePhoto");
    localStorage.removeItem("token");
    handleSuccess(`${loggedInUser} Logged Out`);
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setProfilePhoto(null);
    setTimeout(() => navigate("/"), 1000);
  };

  const toggleLogout = () => setShowLogout(!showLogout);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-[#2A2A3A] text-white shadow-md border-b border-[#3B3B4F]">
      <div className="container mx-auto flex justify-between items-center p-6">
        <div className="flex items-center">
          <img src={logo} alt="InvestSim Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-2xl font-bold ml-3">PortfolioPilot</h1>
        </div>

        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-[#3B82F6] transition-colors">Home</Link>
          <Link to="/simulation" className="hover:text-[#3B82F6] transition-colors">Simulation</Link>
          <Link to="/risk-assessment" className="hover:text-[#3B82F6] transition-colors">Assessment</Link>
          <Link to="/suggestion" className="hover:text-[#3B82F6] transition-colors">AI Suggestions</Link>

          {loggedInUser ? (
            <div className="relative" ref={profileRef}>
              {profilePhoto ? (
                <img
                  src={profilePhoto}
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
              {showLogout && (
                <button
                  onClick={handleLogout}
                  className="absolute top-12 right-0 mt-2 bg-[#3B82F6] text-white px-4 py-2 rounded-md hover:bg-[#2563EB] transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-[#3B82F6] rounded-md hover:bg-[#2563EB] transition-colors"
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
