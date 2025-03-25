import { useState } from "react";

const RiskAssessment = () => {
  const [inputs, setInputs] = useState({
    investmentAmount: "",
    duration: "5",
    riskAppetite: 50,
    marketCondition: "bull",
    stocks: 40,
    bonds: 30,
    realEstate: 20,
    commodities: 10,
  });

  const [assessmentResults] = useState({
    riskMetrics: {
      sharpeRatio: 1.8,
      maxDrawdown: -15.2,
      volatility: 12.5
    },
    profitability: {
      annualizedReturns: 15.8,
      roi: 45.2,
      beta: 0.85
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  return (
    <div className="min-h-screen bg-[#1E1E2E] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Risk & Profit Assessment</h2>
        <p className="text-gray-400 mb-8">Analyze your portfolio's risk exposure and potential returns</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <div className="bg-[#2A2A3A] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-6">Portfolio Parameters</h3>

            {/* Investment Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Investment Amount</label>
              <input
                type="number"
                name="investmentAmount"
                value={inputs.investmentAmount}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                placeholder="Enter amount"
              />
            </div>

            {/* Duration */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Duration</label>
              <div className="flex gap-2">
                {["5", "10", "20"].map((year) => (
                  <button
                    key={year}
                    onClick={() => setInputs(prev => ({...prev, duration: year}))}
                    className={`px-4 py-2 rounded transition-colors ${
                      inputs.duration === year
                        ? "bg-[#3B82F6] text-white"
                        : "bg-[#3B3B4F] hover:bg-[#4B4B5F]"
                    }`}
                  >
                    {year} Years
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Appetite */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Risk Appetite: {inputs.riskAppetite}%
              </label>
              <input
                type="range"
                name="riskAppetite"
                min="0"
                max="100"
                value={inputs.riskAppetite}
                onChange={handleSliderChange}
                className="w-full"
              />
            </div>

            {/* Market Condition */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Market Condition</label>
              <select
                name="marketCondition"
                value={inputs.marketCondition}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              >
                <option value="bull">Bull Market</option>
                <option value="bear">Bear Market</option>
                <option value="neutral">Neutral Market</option>
              </select>
            </div>

            {/* Asset Allocation */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Asset Allocation</label>
              {["stocks", "bonds", "realEstate", "commodities"].map((asset) => (
                <div key={asset} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="capitalize">{asset}</span>
                    <span>{inputs[asset]}%</span>
                  </div>
                  <input
                    type="range"
                    name={asset}
                    min="0"
                    max="100"
                    value={inputs[asset]}
                    onChange={handleSliderChange}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <button
              className="w-full bg-[#3B82F6] text-white p-3 rounded hover:bg-[#2563EB] transition-colors"
            >
              Assess Risk
            </button>
          </div>

          {/* Right Column - Results */}
          <div className="bg-[#2A2A3A] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-6">Assessment Results</h3>

            <div className="space-y-8">
              {/* Enhanced Metrics Display */}
              <div className="space-y-6">
                <div className="p-6 bg-[#3B3B4F] rounded-lg">
                  <h4 className="text-lg font-semibold mb-4 text-blue-400">Risk Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-600 pb-3">
                      <span className="text-gray-300">Sharpe Ratio</span>
                      <span className="font-semibold">{assessmentResults.riskMetrics.sharpeRatio}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-600 pb-3">
                      <span className="text-gray-300">Maximum Drawdown</span>
                      <span className="font-semibold">{assessmentResults.riskMetrics.maxDrawdown}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Volatility</span>
                      <span className="font-semibold">{assessmentResults.riskMetrics.volatility}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[#3B3B4F] rounded-lg">
                  <h4 className="text-lg font-semibold mb-4 text-green-400">Profitability Insights</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-600 pb-3">
                      <span className="text-gray-300">Annualized Returns (CAGR)</span>
                      <span className="font-semibold">{assessmentResults.profitability.annualizedReturns}%</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-600 pb-3">
                      <span className="text-gray-300">ROI</span>
                      <span className="font-semibold">{assessmentResults.profitability.roi}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Beta (vs S&P 500)</span>
                      <span className="font-semibold">{assessmentResults.profitability.beta}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;