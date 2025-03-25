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
            Optimize Your Portfolio with AI
          </h1>
          <p className="text-gray-400 mb-4 md:mb-6 max-w-2xl mx-auto">
            Get data-driven investment insights tailored to your risk profile and financial goals.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <button
              className={`px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors ${
                activeTab === "new"
                  ? "bg-[#3B82F6] text-white"
                  : "bg-[#3B3B4F] hover:bg-[#4B4B5F]"
              }`}
              onClick={() => setActiveTab("new")}
            >
              Create New Portfolio
            </button>
            <button
              className={`px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors ${
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