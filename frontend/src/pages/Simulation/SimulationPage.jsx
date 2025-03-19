import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SimulationPage() {
  const [investment, setInvestment] = useState(100000);
  const [duration, setDuration] = useState(5);
  const [risk, setRisk] = useState(50);
  const [market, setMarket] = useState("Bull Market");
  const [allocation, setAllocation] = useState({
    stocks: 40,
    bonds: 30,
    realEstate: 20,
    crypto: 10,
  });

  // Mock Data for Graph
  const data = {
    labels: ["2025", "2027", "2029", "2031", "2033", "2035"],
    datasets: [
      {
        label: "Portfolio Value",
        data: [investment, 125000, 150000, 180000, 210000, 245000], // Mock data
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#1E1E2E] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Investment Simulation</h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Investment Parameters */}
          <div className="bg-[#2A2A3A] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-6">Investment Parameters</h3>

            {/* Investment Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Investment Amount</label>
              <input
                type="number"
                className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
              />
            </div>

            {/* Duration */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Duration</label>
              <div className="flex gap-2">
                {[5, 10, 20].map((year) => (
                  <button
                    key={year}
                    className={`px-4 py-2 rounded transition-colors ${
                      duration === year ? "bg-[#3B82F6] text-white" : "bg-[#3B3B4F] hover:bg-[#4B4B5F]"
                    }`}
                    onClick={() => setDuration(year)}
                  >
                    {year} Years
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Appetite */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Risk Appetite</label>
              <div className="flex justify-between">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={risk}
                  onChange={(e) => setRisk(Number(e.target.value))}
                  className="w-full"
                />
                <span className="ml-2">{risk}%</span>
              </div>
            </div>

            {/* Market Condition */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Market Condition</label>
              <select
                className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                value={market}
                onChange={(e) => setMarket(e.target.value)}
              >
                <option value="Bull Market">Bull Market</option>
                <option value="Bear Market">Bear Market</option>
                <option value="Neutral">Neutral</option>
              </select>
            </div>

            {/* Asset Allocation */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Asset Allocation</label>
              {Object.keys(allocation).map((key) => (
                <div key={key} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="capitalize">{key}</span>
                    <span>{allocation[key]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={allocation[key]}
                    onChange={(e) => setAllocation({ ...allocation, [key]: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            {/* Simulate Button */}
            <button className="w-full bg-[#3B82F6] text-white p-2 rounded hover:bg-[#2563EB] transition-colors">
              Simulate Strategy
            </button>
          </div>

          {/* Right Column: Simulation Results */}
          <div className="bg-[#2A2A3A] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-6">Simulation Results</h3>

            {/* Graph */}
            <div className="p-4 bg-[#3B3B4F] rounded-lg mb-6">
              <Line data={data} />
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#3B3B4F] rounded-lg">
                <p className="text-sm text-gray-400">Expected Return</p>
                <p className="text-lg font-bold">12.5%</p>
              </div>
              <div className="p-4 bg-[#3B3B4F] rounded-lg">
                <p className="text-sm text-gray-400">Volatility</p>
                <p className="text-lg font-bold">8.2%</p>
              </div>
              <div className="p-4 bg-[#3B3B4F] rounded-lg">
                <p className="text-sm text-gray-400">Sharpe Ratio</p>
                <p className="text-lg font-bold">1.8</p>
              </div>
              <div className="p-4 bg-[#3B3B4F] rounded-lg">
                <p className="text-sm text-gray-400">Max Drawdown</p>
                <p className="text-lg font-bold">-15.3%</p>
              </div>
            </div>

            {/* Projected Value */}
            <div className="text-center p-6 bg-[#3B3B4F] rounded-lg mt-6">
              <p className="text-sm text-gray-400">Projected Value (2035)</p>
              <p className="text-3xl font-bold">$245,000</p>
              <p className="text-sm text-gray-400 mt-2">
                Initial Investment: $100,000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
