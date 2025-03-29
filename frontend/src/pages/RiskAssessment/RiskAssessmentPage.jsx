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
                    onClick={() => setInputs(prev => ({ ...prev, duration: year }))}
                    className={`px-4 py-2 rounded transition-colors ${inputs.duration === year
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

            <div className="flex justify-center w-full">
              <button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                Assess Risk
              </button>
            </div>


          </div>

          {/* Right Column - Results */}
          {/* Right Column - Results */}
          <div className="bg-[#2A2A3A] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-6">Assessment Results</h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Total Profit */}
              <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Profit</span>
                  <span className="text-xl font-semibold text-blue-400">$24,500</span>
                </div>
              </div>

              {/* Risk Score */}
              <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-red-500">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Risk Score</span>
                  <span className="text-xl font-semibold text-red-400">6.8/10</span>
                </div>
              </div>

              {/* ROI */}
              <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-green-500">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">ROI</span>
                  <span className="text-xl font-semibold text-green-400">45.2%</span>
                </div>
              </div>

              {/* Maximum Drawdown */}
              <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-yellow-500">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Maximum Drawdown</span>
                  <span className="text-xl font-semibold text-yellow-400">-15.2%</span>
                </div>
              </div>

              {/* Volatility Score */}
              <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-purple-500">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Volatility Score</span>
                  <span className="text-xl font-semibold text-purple-400">12.5</span>
                </div>
              </div>

              {/* Reward to Risk Ratio */}
              <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-cyan-500">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Reward to Risk Ratio</span>
                  <span className="text-xl font-semibold text-cyan-400">1.8</span>
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