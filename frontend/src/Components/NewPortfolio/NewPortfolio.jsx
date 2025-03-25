import React, { useState } from "react";
import PortfolioPieChart from "../PortfolioPieChart/PortfolioPieChart";
import PerformanceMetrics from "../PerformanceMetrics/PerformanceMetrics";
import SuggestionsList from "../SuggestionsList/SuggestionsList";

export default function NewPortfolio() {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [riskAppetite, setRiskAppetite] = useState("medium");
  const [assetPreferences, setAssetPreferences] = useState({
    stocks: true,
    bonds: true,
    realEstate: false,
    crypto: false,
  });
  const [duration, setDuration] = useState(5);
  const [marketCondition, setMarketCondition] = useState("bull");
  const [showOptimizedPortfolio, setShowOptimizedPortfolio] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const initialPieData = {
    labels: ["Stocks", "Bonds", "Real Estate", "Crypto"],
    datasets: [
      {
        data: [60, 30, 5, 5],
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
        data: [40, 30, 20, 10],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
        borderColor: ["#1E1E2E"],
        borderWidth: 1,
      },
    ],
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
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Create a New Portfolio</h2>
      <form className="space-y-4 md:space-y-6" onSubmit={handleOptimizePortfolio}>
        {/* Investment Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Investment Amount ($)
          </label>
          <input
            type="number"
            className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
            min="1000"
            step="1000"
          />
        </div>

        {/* Risk Appetite */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Risk Appetite
          </label>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {["low", "medium", "high"].map((risk) => (
              <button
                key={risk}
                type="button"
                className={`px-3 py-1 md:px-4 md:py-2 rounded capitalize ${
                  riskAppetite === risk
                    ? "bg-[#3B82F6] text-white"
                    : "bg-[#3B3B4F] hover:bg-[#4B4B5F]"
                }`}
                onClick={() => setRiskAppetite(risk)}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>

        {/* Asset Preferences */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Asset Preferences
          </label>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {Object.entries(assetPreferences).map(([asset, isChecked]) => (
              <div key={asset} className="flex items-center">
                <input
                  type="checkbox"
                  id={asset}
                  checked={isChecked}
                  onChange={(e) =>
                    setAssetPreferences({
                      ...assetPreferences,
                      [asset]: e.target.checked,
                    })
                  }
                  className="mr-2 h-4 w-4 text-[#3B82F6] rounded focus:ring-[#3B82F6] bg-[#3B3B4F] border-gray-600"
                />
                <label htmlFor={asset} className="capitalize text-sm md:text-base">
                  {asset.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Duration */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Investment Duration
          </label>
          <select
            className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            {[1, 3, 5, 7, 10].map((year) => (
              <option key={year} value={year}>
                {year} Year{year > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Market Condition */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Market Condition Preference
          </label>
          <select
            className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            value={marketCondition}
            onChange={(e) => setMarketCondition(e.target.value)}
          >
            <option value="bull">Bull Market</option>
            <option value="bear">Bear Market</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3B82F6] text-white p-2 rounded hover:bg-[#2563EB] transition-colors font-medium"
        >
          Optimize Portfolio
        </button>
      </form>

      {showOptimizedPortfolio && (
        <div className="mt-6 md:mt-8">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Portfolio Optimization</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PortfolioPieChart 
              title="Initial Allocation" 
              data={initialPieData} 
            />
            <PortfolioPieChart 
              title="Optimized Allocation" 
              data={optimizedPieData} 
            />
          </div>

          <PerformanceMetrics 
            metrics={[
              { label: "Expected Return", value: "8.2% → 12.5%", improvement: true },
              { label: "Risk Level", value: "High → Medium", improvement: true },
              { label: "Diversification Score", value: "45 → 82", improvement: true }
            ]} 
          />

          {!showSuggestions && (
            <div className="text-center">
              <button
                onClick={handleGenerateSuggestions}
                className="bg-[#10B981] text-white px-6 py-2 rounded hover:bg-[#059669] transition-colors font-medium"
              >
                Generate Detailed Suggestions
              </button>
            </div>
          )}

          {showSuggestions && (
            <SuggestionsList 
              title="AI Recommendations"
              suggestions={[
                {
                  title: "Increase Diversification",
                  content: "Consider adding real estate (REITs) to your portfolio. Our analysis shows this could reduce volatility by ~15% while maintaining returns."
                },
                {
                  title: "Rebalancing Strategy",
                  content: "We recommend quarterly rebalancing to maintain your target allocation. Automated rebalancing could save you ~2.3% annually in slippage costs."
                },
                {
                  title: "Tax Optimization",
                  content: "For taxable accounts, consider placing bonds in tax-advantaged accounts and stocks in taxable accounts to improve after-tax returns by ~1.2%."
                }
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
}