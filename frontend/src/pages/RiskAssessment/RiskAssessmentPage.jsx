import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RiskAssessment = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    investment_amount: "", // Initially blank
    duration: "5",
    risk_appetite: 50,
    market_condition: "bull",
    stocks: 40,
    bonds: 30,
    real_estate: 20,
    commodities: 10,
  });

  const [assessmentResults, setAssessmentResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    const newValue = Number(value);
    
    if (name === "risk_appetite") {
      setInputs(prev => ({ ...prev, [name]: newValue }));
      return;
    }
    
    setInputs(prev => ({ ...prev, [name]: newValue }));
  };

  const fetchAssessmentResults = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: Please log in to access this feature.");
      navigate("/login");
      return;
    }

    if (!inputs.investment_amount || Number(inputs.investment_amount) <= 0) {
      setError("Investment amount must be greater than 0");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const riskScore = Math.min(10, Math.max(1, 
        Math.round(
          (inputs.risk_appetite / 20) + 
          (inputs.stocks / 20) - 
          (inputs.bonds / 25) + 
          (inputs.market_condition === "bull" ? 2 : inputs.market_condition === "bear" ? -2 : 0)
        )
      ));
      
      const baseReturn = inputs.market_condition === "bull" ? 8 : inputs.market_condition === "bear" ? 2 : 5;
      const roi = (baseReturn + 
                  (inputs.stocks * 0.15) + 
                  (inputs.bonds * 0.05) + 
                  (inputs.real_estate * 0.08) + 
                  (inputs.commodities * 0.1)) * 
                  (1 + (inputs.risk_appetite / 100)) * 
                  (Number(inputs.duration) / 5);
      
      const maxDrawdown = 30 - (inputs.bonds * 0.2) - (inputs.risk_appetite * 0.15);
      const volatilityScore = 5 + (inputs.stocks * 0.1) - (inputs.bonds * 0.08) + (inputs.risk_appetite * 0.05);
      
      const investmentAmount = Number(inputs.investment_amount);
      const totalProfit = investmentAmount * (roi / 100);
      
      setAssessmentResults({
        "Total Profit": formatCurrency(totalProfit),
        "Risk Score": riskScore,
        "ROI (%)": roi.toFixed(2),
        maxDrawdown: maxDrawdown.toFixed(2),
        volatilityScore: volatilityScore.toFixed(2),
        "Investment Amount": formatCurrency(investmentAmount),
        "Duration": inputs.duration,
        "Market Condition": inputs.market_condition.charAt(0).toUpperCase() + inputs.market_condition.slice(1)
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal', // Changed from 'currency' to remove $ sign
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
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
                name="investment_amount"
                value={inputs.investment_amount}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputs(prev => ({ ...prev, investment_amount: value }));
                }}
                className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                placeholder="Enter amount"
              />
            </div>

            {/* Duration */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Investment Duration (years)</label>
              <input
                type="number"
                name="duration"
                min="1"
                max="50"
                className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                value={inputs.duration}
                placeholder="1-50 years"
                onChange={(e) => {
                  const value = e.target.value === "" ? "" : Math.max(1, Math.min(50, Number(e.target.value)));
                  setInputs(prev => ({ ...prev, duration: value }));
                }}
              />
            </div>

            {/* Risk Appetite */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Risk Appetite: {inputs.risk_appetite}%
              </label>
              <input
                type="range"
                name="risk_appetite"
                min="0"
                max="100"
                value={inputs.risk_appetite}
                onChange={handleSliderChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Aggressive</span>
              </div>
            </div>

            {/* Market Condition */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Market Condition</label>
              <select
                name="market_condition"
                value={inputs.market_condition}
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
              {["stocks", "bonds", "real_estate", "commodities"].map((asset) => (
                <div key={asset} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="capitalize">{asset.replace('_', ' ')}</span>
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
              <div className="text-center text-sm mt-2">
                Current Total: {Object.values(inputs)
                  .filter((_, i) => ["stocks", "bonds", "real_estate", "commodities"].includes(Object.keys(inputs)[i]))
                  .reduce((a, b) => a + b, 0)}%
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center w-full">
              <button
                onClick={fetchAssessmentResults}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                {loading ? "Assessing..." : "Assess Risk"}
              </button>
            </div>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </div>

          {/* Right Column - Results */}
          <div className="bg-[#2A2A3A] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-6">Assessment Results</h3>

            {assessmentResults ? (
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-blue-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Investment Amount</span>
                    <span className="text-xl font-semibold text-blue-400">
                      {assessmentResults["Investment Amount"]}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-green-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Profit</span>
                    <span className="text-xl font-semibold text-green-400">
                      {assessmentResults["Total Profit"]}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-purple-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">ROI</span>
                    <span className="text-xl font-semibold text-purple-400">
                      {assessmentResults["ROI (%)"]}%
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-yellow-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Maximum Drawdown</span>
                    <span className="text-xl font-semibold text-yellow-400">
                      {assessmentResults.maxDrawdown}%
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-red-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Risk Score</span>
                    <span className="text-xl font-semibold text-red-400">
                      {assessmentResults["Risk Score"]}/10
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-indigo-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Volatility Score</span>
                    <span className="text-xl font-semibold text-indigo-400">
                      {assessmentResults.volatilityScore}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-gray-400 text-center mb-4">No assessment yet.</p>
                <p className="text-gray-500 text-sm text-center">Click "Assess Risk" to analyze your portfolio</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;