import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { handleError, handleSuccess } from "../../utils";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return handleError("All Fields are required ");
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/auth/register`, {
        name,
        email,
        password,
      });

      handleSuccess("Registration Successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      handleError(
        "Registration failed: " +
        (error.response?.data?.error?.details[0]?.message ||
          error.response?.data?.message ||
          error.message)
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleGoogleLogin = async (response) => {
    try {
      const googleToken = response.credential; // Extract the token from Google response

      // Redirect to backend endpoint with the Google token
      const res = await axios.get(`${import.meta.env.VITE_URL}/auth/google/callback`, {
        params: { token: googleToken },
      });

      const { message, name, token,profilePhoto} = res.data;

      // Store token and user details in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("loggedInUser", name);
      localStorage.setItem("profilePhoto",profilePhoto);

      // Set default Authorization header for Axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Handle success (show message and navigate)
      handleSuccess(message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      handleError("Google login failed: " + error.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-100 text-center mb-8">Register</h1>
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                className="w-full px-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="w-full px-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email"
                required
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="w-full px-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            >
              Register
            </button>
          </form>
          <div className="my-6 text-center">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>
            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin} // Handle Google login response
                onError={(error) => console.log("Google login error", error)}
                useOneTap
                theme="filled_blue"
                shape="pill"
                size="large"
                text="signin_with"
                logo_alignment="left"
                width="300"
                className="w-full max-w-xs"
              />
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center mt-6">
            Already Have an Account?{" "}
            <Link
              to="/login"
              className="text-blue-400 font-medium hover:text-blue-500 hover:underline"
            >
              Sign in
            </Link>
          </p>
          <ToastContainer />
        </div>
      </div>

    </GoogleOAuthProvider>
  );
};

export default RegisterPage;