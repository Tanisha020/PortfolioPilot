import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPopUp = ({ onClose }) => {
    const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold text-gray-800">Please Log In to Continue</h2>
        <div className="mt-4 flex justify-between">
          <button 
            onClick={() => navigate("/login")} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
            Login
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md shadow-md hover:bg-gray-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopUp;
