import React, { useState } from "react";
import NewPortfolio from "../../Components/NewPortfolio/NewPortfolio";
import ExistingPortfolio from "../../Components/ExistingPortfolio/ExistingPortfolio";

export default function SuggestionPage() {
  const [activeTab, setActiveTab] = useState("new");

  return (
    <div className="min-h-screen bg-[#1E1E2E] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Optimize Your Portfolio
          </h1>
          <p className="text-gray-400 mb-4 md:mb-6 max-w-2xl mx-auto">
            Get data-driven investment insights tailored to your risk profile and financial goals.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <button
              className={`mt-6 w-full max-w-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ${
                activeTab === "new"
                  ? "bg-[#3B82F6] text-white"
                  : "bg-[#3B3B4F] hover:bg-[#4B4B5F]"
              }`}
              onClick={() => setActiveTab("new")}
            >
              Create New Portfolio
            </button>
            <button
              className={`mt-6 w-full max-w-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ${
                activeTab === "existing"
                  ? "bg-[#3B82F6] text-white"
                  : "bg-[#3B3B4F] hover:bg-[#4B4B5F]"
              }`}
              onClick={() => setActiveTab("existing")}
            >
              Analyze Existing Portfolio
            </button>
          </div>
        </div>

        {activeTab === "new" && <NewPortfolio />}
        {activeTab === "existing" && <ExistingPortfolio />}
      </div>
    </div>
  );
}