import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SimulationPage() {
  const [formData, setFormData] = useState({
    investment: "",
    duration: 5,
    risk: 50,
    market: "bull", // Keep it lowercase to match backend
    allocation: {
      stocks: 40,
      bonds: 30,
      realEstate: 20,
      commodities: 10, // Changed from crypto to commodities for backend compatibility
    },
  });

  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSimulate = async () => {
    setLoading(true);
    setError("");

    // Ensure total allocation is 100%
    const totalAllocation = Object.values(formData.allocation).reduce((a, b) => a + b, 0);
    if (totalAllocation !== 100) {
      setError("Total asset allocation must sum to 100%.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // console.log("Token:", token);
      if (!token) {
        setError("Unauthorized: Please log in to access this feature.");
        navigate("/login");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          investment_amount: formData.investment,
          duration: formData.duration,
          risk_appetite: formData.risk / 100,
          market_condition: formData.market,
          stocks: formData.allocation.stocks,
          bonds: formData.allocation.bonds,
          real_estate: formData.allocation.realEstate,
          commodities: formData.allocation.commodities,
        }),
      });

      if (!response.ok) {
        throw new Error("Simulation failed. Check input values.");
      }

      const data = await response.json();
      setSimulationResult(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

const years = ["Start", ...Array.from({ length: formData.duration }, (_, i) => `Year ${i + 1}`)];


 

const data = {
  labels: years,
  datasets: [
    {
      label: "Portfolio Value",
      data: simulationResult 
        ? [formData.investment, ...simulationResult["Yearly Portfolio Values"]]  // Use backend values
        : [formData.investment, 125000, 150000, 180000, 210000, 245000],  // Mock values for testing
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
    },
  ],
};

  // const data = {
  //   labels: Array.from({ length: formData.duration + 1 }, (_, i) => `Year ${i}`),  
  //   datasets: [
  //     {
  //       label: "Portfolio Value",
  //       data: simulationResult ? simulationResult["Portfolio Values"] : [formData.investment, 125000, 150000, 180000, 210000, 245000], // Mock values removed
  //       borderColor: "#3B82F6",
  //       backgroundColor: "rgba(59, 130, 246, 0.2)",
  //     },
  //   ],
  // };

  

  return (
    <div className="min-h-screen bg-[#1E1E2E] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Investment Simulation</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#2A2A3A] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-6">Investment Parameters</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Investment Amount</label>
              <input
                type="number"
                className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                value={formData.investment}
                placeholder="Enter amount"
                onChange={(e) => setFormData({ ...formData, investment: Number(e.target.value) })}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Duration (Years)</label>
              <input
                type="number"
                min="1"
                max="20"
                className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                value={formData.duration}
                onChange={(e) => {
                  const value = Math.max(1, Math.min(20, Number(e.target.value))); 
                  setFormData({ ...formData, duration: value });
                }}
              />
            </div>


            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Risk Appetite</label>
              <div className="flex justify-between">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.risk}
                  onChange={(e) => setFormData({ ...formData, risk: Number(e.target.value) })}
                  className="w-full"
                />
                <span className="ml-2">{formData.risk}%</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Market Condition</label>
              <select
                className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                value={formData.market}
                onChange={(e) => setFormData({ ...formData, market: e.target.value })}
              >
                <option value="bull">Bull Market</option>
                <option value="bear">Bear Market</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Asset Allocation</label>
              {Object.keys(formData.allocation).map((key) => (
                <div key={key} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="capitalize">{key}</span>
                    <span>{formData.allocation[key]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.allocation[key]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        allocation: { ...formData.allocation, [key]: Number(e.target.value) },
                      })
                    }
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                onClick={handleSimulate}
                disabled={loading}
              >
                {loading ? "Simulating..." : "Simulate Strategy"}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <div className="bg-[#2A2A3A] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-6">Simulation Results</h3>

            <div className="p-4 bg-[#3B3B4F] rounded-lg mb-6">
              <Line data={data} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["Final Expected Return (%)", "Volatility (%)", "Sharpe Ratio", "Max Drawdown (%)", "Final Total Portfolio Value"].map(
                (key, index) => (
                  <div key={index} className={`p-4 bg-[#3B3B4F] rounded-lg ${index === 4 ? "col-span-2" : ""}`}>
                    <p className="text-sm text-gray-400">{key.replace(" (%)", "").replace("Final ", "")}</p>
                    <p className="text-lg font-semibold">
                      {simulationResult ? `${simulationResult[key]}${index < 4 ? "%" : ""}` : "N/A"}
                    </p>
                  </div>
                )
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
