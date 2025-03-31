import { useState } from "react";

const RiskAssessment = () => {
  const [inputs, setInputs] = useState({
    investment_amount: "",
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
    setInputs((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  const fetchAssessmentResults = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:8000/risk-assessment/risk-assessment", {  // Fixed route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...inputs,
          investment_amount: Number(inputs.investment_amount),  // Convert string to number
          duration: Number(inputs.duration),
          risk_appetite: Number(inputs.risk_appetite),
          stocks: Number(inputs.stocks),
          bonds: Number(inputs.bonds),
          real_estate: Number(inputs.real_estate),
          commodities: Number(inputs.commodities),
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch risk assessment.");
      }

      const data = await response.json();
      console.log("Raw API Response:", data);
      setAssessmentResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const formatNumber = (num) => {
    if (typeof num === "number") {
      return num.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return num;
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
      <span className="text-gray-300">Total Profit</span>
      <span className="text-xl font-semibold text-blue-400">${assessmentResults["Total Profit"]}</span>
    </div>
         {/* Maximum Drawdown */}
         <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-yellow-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Maximum Drawdown</span>
                    <span className="text-xl font-semibold text-yellow-400">
                      {formatNumber(assessmentResults.maxDrawdown)}%
                    </span>
                  </div>
                </div>
    <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-red-500">
      <span className="text-gray-300">Risk Score</span>
      <span className="text-xl font-semibold text-red-400">{assessmentResults["Risk Score"]}/10</span>
    </div>
    <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-purple-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Volatility Score</span>
                    <span className="text-xl font-semibold text-purple-400">
                      {formatNumber(assessmentResults.volatilityScore)}
                    </span>
                  </div>
                </div>
          
    <div className="p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-green-500">
      <span className="text-gray-300">ROI</span>
      <span className="text-xl font-semibold text-green-400">{assessmentResults["ROI (%)"]}%</span>
    </div>
    
  </div>
  
) : (
  <p className="text-gray-400 text-center">No assessment yet.</p>
)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;

// export default RiskAssessment;
// import { useState } from "react";
// import { useEffect } from "react"; // Import useEffect if not already imported

// const formatNumber = (num) => {
//   if (num === undefined || num === null || isNaN(num)) return "N/A";

//   const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
//   const exponent = Math.floor(Math.log10(Math.abs(num)));
//   const tier = Math.floor(exponent / 3);

//   if (tier < suffixes.length) {
//     const scaled = num / Math.pow(10, tier * 3);
//     return `${scaled.toFixed(2)}${suffixes[tier]}`;
//   }

//   // If number is too large for our suffix list, return in full notation
//   return num.toExponential(2);
// };
// const RiskAssessment = () => {
//   const [inputs, setInputs] = useState({
//     investment_amount: "",
//     duration: "5",
//     risk_appetite: 50,
//     market_condition: "bull",
//     stocks: 40,
//     bonds: 30,
//     real_estate: 20,
//     commodities: 10,
//   });

//   const [assessmentResults, setAssessmentResults] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputs((prev) => ({
//       ...prev,
//       [name]: name === "investment_amount" ? Number(value) : value,
//     }));
//   };

//   const handleSliderChange = (e) => {
//     setInputs((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }));
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError("");

//     const payload = {
//       investment_amount: Number(inputs.investment_amount),
//       duration: Number(inputs.duration),
//       risk_appetite: Number(inputs.risk_appetite),
//       market_condition: inputs.market_condition,
//       stocks: Number(inputs.stocks),
//       bonds: Number(inputs.bonds),
//       real_estate: Number(inputs.real_estate),
//       commodities: Number(inputs.commodities),
//     };

//     console.log("Request Payload:", JSON.stringify(payload, null, 2));

//     try {
//       const response = await fetch("http://127.0.0.1:8000/risk-assessment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputs),
//       });
  
//       const data = await response.json();
//       console.log("API Response Data:", data); // Check this in your console
  
//       if (!response.ok) throw new Error(data.detail || "Failed to fetch results");
  
//       setAssessmentResults(data?.data || {}); // Ensure we are setting the right object
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (assessmentResults) {
//       console.log("Raw Total Profit:", assessmentResults["Total Profit"]);
//       console.log("Formatted Total Profit:", formatNumber(assessmentResults["Total Profit"]));
//     }
//   }, [assessmentResults]); // Runs every time assessmentResults updates
//   return (
//     <div className="min-h-screen bg-[#1E1E2E] text-white p-8">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold mb-2">Risk & Profit Assessment</h2>
//         <p className="text-gray-400 mb-8">
//           Analyze your portfolio's risk exposure and potential returns
//         </p>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Column - Input Form */}
//           <div className="bg-[#2A2A3A] rounded-lg p-6 shadow-lg">
//             <h3 className="text-xl font-semibold mb-6">Portfolio Parameters</h3>

//             {/* Investment Amount */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-2">Investment Amount</label>
//               <input
//                 type="number"
//                 name="investment_amount"
//                 value={inputs.investment_amount}
//                 onChange={handleChange}
//                 className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
//                 placeholder="Enter amount"
//               />
//             </div>

//             {/* Duration */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-2">Duration</label>
//               <div className="flex gap-2">
//                 {["5", "10", "20"].map((year) => (
//                   <button
//                     key={year}
//                     onClick={() => setInputs((prev) => ({ ...prev, duration: year }))}
//                     className={`px-4 py-2 rounded transition-colors ${
//                       inputs.duration === year
//                         ? "bg-[#3B82F6] text-white"
//                         : "bg-[#3B3B4F] hover:bg-[#4B4B5F]"
//                     }`}
//                   >
//                     {year} Years
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Risk Appetite */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-2">
//                 Risk Appetite: {inputs.risk_appetite}%
//               </label>
//               <input
//                 type="range"
//                 name="risk_appetite"
//                 min="0"
//                 max="100"
//                 value={inputs.risk_appetite}
//                 onChange={handleSliderChange}
//                 className="w-full"
//               />
//             </div>

//             {/* Market Condition */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-2">Market Condition</label>
//               <select
//                 name="market_condition"
//                 value={inputs.market_condition}
//                 onChange={handleChange}
//                 className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
//               >
//                 <option value="bull">Bull Market</option>
//                 <option value="bear">Bear Market</option>
//                 <option value="neutral">Neutral Market</option>
//               </select>
//             </div>

//             {/* Asset Allocation */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-2">Asset Allocation</label>
//               {["stocks", "bonds", "real_estate", "commodities"].map((asset) => (
//                 <div key={asset} className="mb-4">
//                   <div className="flex justify-between mb-1">
//                     <span className="capitalize">{asset.replace("_", " ")}</span>
//                     <span>{inputs[asset]}%</span>
//                   </div>
//                   <input
//                     type="range"
//                     name={asset}
//                     min="0"
//                     max="100"
//                     value={inputs[asset]}
//                     onChange={handleSliderChange}
//                     className="w-full"
//                   />
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="w-full bg-[#3B82F6] text-white p-3 rounded hover:bg-[#2563EB] transition-colors"
//               disabled={loading}
//             >
//               {loading ? "Assessing..." : "Assess Risk"}
//             </button>

//             {error && <p className="text-red-500 mt-4">{error}</p>}
//           </div>

//           {/* Right Column - Results */}
//           <div className="bg-[#2A2A3A] rounded-lg p-6 shadow-lg">
//             <h3 className="text-xl font-semibold mb-6">Assessment Results</h3>

//             {assessmentResults ? (
//   <div className="grid grid-cols-1 gap-4">
//     <ResultItem label="Total Profit" value={`$${formatNumber(assessmentResults["Total Profit"])}`} color="blue" />
//     <ResultItem label="Risk Score" value={`${formatNumber(assessmentResults["Risk Score"])}/10`} color="red" />
//     <ResultItem label="ROI" value={`${formatNumber(assessmentResults["ROI (%)"])}%`} color="green" />
//     <ResultItem label="Maximum Drawdown" value={`${formatNumber(assessmentResults["Max Drawdown (%)"])}%`} color="yellow" />
//     <ResultItem label="Volatility Score" value={formatNumber(assessmentResults["Volatility Score"])} color="purple" />
//     <ResultItem label="Reward to Risk Ratio" value={assessmentResults["Risk Score"] !== "N/A" ? formatNumber(assessmentResults["Risk Score"]) : "N/A"} color="cyan" />
//   </div>
// ) : (
//   <p className="text-gray-400">Run the assessment to see results.</p>
// )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper Component for Results Display
// const ResultItem = ({ label, value, color }) => (
//   <div className={`p-4 bg-[#3B3B4F] rounded-lg border-l-4 border-${color}-500`}>
//     <div className="flex justify-between items-center">
//       <span className="text-gray-300">{label}</span>
//       <span className={`text-xl font-semibold text-${color}-400`}>{value}</span>
//     </div>
//   </div>
// );

// export default RiskAssessment;