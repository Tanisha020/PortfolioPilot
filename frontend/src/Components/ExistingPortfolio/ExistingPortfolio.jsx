import React, { useState } from "react";
import PortfolioPieChart from "../PortfolioPieChart/PortfolioPieChart";
import PerformanceMetrics from "../PerformanceMetrics/PerformanceMetrics";
import SuggestionsList from "../SuggestionsList/SuggestionsList";

export default function ExistingPortfolio() {
  const [portfolioData, setPortfolioData] = useState({
    stocks: "",
    bonds: "",
    realEstate: "",
    crypto: "",
  });
  const [riskAppetite, setRiskAppetite] = useState("medium");
  const [duration, setDuration] = useState(5);
  const [showOptimizedPortfolio, setShowOptimizedPortfolio] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const initialPieData = {
    labels: ["Stocks", "Bonds", "Real Estate", "Crypto"],
    datasets: [
      {
        data: [70, 20, 5, 5],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
        borderColor: ["#1E1E2E"],
        borderWidth: 1,
      },
    ],
  };

  const optimizedPieData = {
    labels: ["Stocks", "Bonds", "Real Estate", "Crypto"],
    datasets: [
      {
        data: [50, 30, 15, 5],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
        borderColor: ["#1E1E2E"],
        borderWidth: 1,
      },
    ],
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleManualInputChange = (asset, value) => {
    setPortfolioData({
      ...portfolioData,
      [asset]: value,
    });
  };

  const handleOptimizePortfolio = (e) => {
    e.preventDefault();
    setShowOptimizedPortfolio(true);
    setShowSuggestions(false);
  };

  const handleGenerateSuggestions = () => {
    setShowSuggestions(true);
  };

  return (
    <div className="bg-[#2A2A3A] rounded-lg p-4 md:p-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
        Analyze Existing Portfolio
      </h2>
      <form className="space-y-4 md:space-y-6" onSubmit={handleOptimizePortfolio}>
        {/* Upload Portfolio Data */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Portfolio Data (CSV)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              accept=".csv"
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="whitespace-nowrap px-3 py-2 bg-[#3B3B4F] hover:bg-[#4B4B5F] rounded transition-colors"
            >
              Sample CSV
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Upload your portfolio holdings in CSV format
          </p>
        </div>

        <div className="text-center text-gray-400">OR</div>

        {/* Manual Entry */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter Portfolio Manually
          </label>
          <div className="space-y-3">
            {Object.entries(portfolioData).map(([asset, value]) => (
              <div key={asset} className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <label className="w-24 capitalize">
                  {asset.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="number"
                  placeholder="Amount ($)"
                  className="flex-1 p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  value={value}
                  onChange={(e) => handleManualInputChange(asset, e.target.value)}
                />
                <span className="hidden md:block w-16 text-center">or</span>
                <input
                  type="number"
                  placeholder="%"
                  className="w-full md:w-16 p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  onChange={(e) => {
                    const percent = parseFloat(e.target.value);
                    if (!isNaN(percent)) {
                      const amount = (percent / 100) * 100000;
                      handleManualInputChange(asset, amount.toString());
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Additional Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Risk Tolerance
            </label>
            <select
              className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              value={riskAppetite}
              onChange={(e) => setRiskAppetite(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Investment Horizon
            </label>
            <select
              className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              {[1, 3, 5, 7, 10, 15, 20].map((year) => (
                <option key={year} value={year}>
                  {year} Year{year > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3B82F6] text-white p-2 rounded hover:bg-[#2563EB] transition-colors font-medium"
        >
          Analyze & Optimize
        </button>
      </form>

      {showOptimizedPortfolio && (
        <div className="mt-6 md:mt-8">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Portfolio Analysis
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PortfolioPieChart 
              title="Current Allocation" 
              data={initialPieData} 
            />
            <PortfolioPieChart 
              title="Optimized Allocation" 
              data={optimizedPieData} 
            />
          </div>

          <PerformanceMetrics 
            metrics={[
              { label: "Current Risk Score", value: "72/100 (High)" },
              { label: "Projected Return", value: "8.5% → 11.8%", improvement: true },
              { label: "Diversification", value: "3/10 → 7/10", improvement: true }
            ]} 
          />

          {!showSuggestions && (
            <div className="text-center">
              <button
                onClick={handleGenerateSuggestions}
                className="bg-[#10B981] text-white px-6 py-2 rounded hover:bg-[#059669] transition-colors font-medium"
              >
                Get Optimization Suggestions
              </button>
            </div>
          )}

          {showSuggestions && (
            <SuggestionsList 
              title="Optimization Recommendations"
              suggestions={[
                {
                  title: "Reduce Concentration Risk",
                  content: "Your portfolio has 65% in tech stocks. Consider reducing to 30% and allocating 20% to international markets and 15% to value stocks."
                },
                {
                  title: "Tax-Loss Harvesting",
                  content: "We've identified $4,200 in unrealized losses that could be harvested to offset capital gains this year."
                },
                {
                  title: "Fixed Income Strategy",
                  content: "For your risk profile, we recommend shifting from corporate bonds (current 10%) to a mix of Treasury bonds (15%) and municipal bonds (5%)."
                },
                {
                  title: "Implementation Plan",
                  content: "1. Sell 35% of tech holdings over 2 weeks\n2. Purchase international ETF (VXUS) with 20%\n3. Allocate 15% to value index fund (VTV)"
                }
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
}