// import React, { useState } from "react";
// import PortfolioPieChart from "../PortfolioPieChart/PortfolioPieChart";
// import PerformanceMetrics from "../PerformanceMetrics/PerformanceMetrics";
// import SuggestionsList from "../SuggestionsList/SuggestionsList";
// const initialPieData = {
//     labels: ["Stocks", "Bonds", "Real Estate", "Crypto"],
//     datasets: [
//       {
//         data: [60, 30, 5, 5],
//         backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
//         borderColor: ["#1E1E2E"],
//         borderWidth: 1,
//       },
//     ],
//   };

// const optimizedPieData = {
//     labels: ["Stocks", "Bonds", "Real Estate", "Crypto"],
//     datasets: [
//       {
//         data: [40, 30, 20, 10],
//         backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
//         borderColor: ["#1E1E2E"],
//         borderWidth: 1,
//       },
//     ],
//   };

// export default function NewPortfolio() {
//   const [investmentAmount, setInvestmentAmount] = useState(100000);
//   const [riskAppetite, setRiskAppetite] = useState(0.5);
//   const [assetPreferences, setAssetPreferences] = useState({
//     stocks: 40,
//     bonds: 30,
//     realEstate: 20,
//     commodities: 10,
//   });
//   const [datatobefeed,setDatatobefeed] = useState(initialPieData);

//   const [duration, setDuration] = useState(5);
//   const [marketCondition, setMarketCondition] = useState("bull");
//   const [showOptimizedPortfolio, setShowOptimizedPortfolio] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);


// const handleOptimizePortfolio = async (e) => {
//   e.preventDefault();
//   setShowOptimizedPortfolio(false);
//   setShowSuggestions(false);

//   const datatosend = {
//     investment: investmentAmount * 1.0,
//     duration: duration,
//     risk_tolerance: riskAppetite * 1.0,
//     stocks: assetPreferences.stocks / 100,  // Convert percentages to fractions
//     bonds: assetPreferences.bonds / 100,
//     real_estate: assetPreferences.realEstate / 100,
//     commodities: assetPreferences.commodities / 100,
//   };
  

//   //In the above part the attributes stocks,bonds ,real_estate and commodities should not be hard coded they should be replaced with state variable for maintaining dynamicity

//     const res = await fetch("http://127.0.0.1:8000/suggestions/portfolio_suggestions", {
//       method: "POST",
//       headers: {
//         "accept": "application/json",  // Match cURL headers
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(datatosend),
//     });

//   const data = await res.json();
//   console.log(data);

//    setShowOptimizedPortfolio(false);

   
//   setDatatobefeed((prev) => ({
//     ...prev,
//     datasets: prev.datasets.map((dataset, index) =>
//       index === 0
//         ? {
//             ...dataset,
//             data: [investmentAmount/100000, riskAppetite, duration, 10],
//             backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
//             borderColor: ["#1E1E2E"],
//             borderWidth: 1,
//           }
//         : dataset
//     ),
//   }));
// };



//   const handleGenerateSuggestions = () => {
//     setShowSuggestions(true);
//   };

//   return (
//     <div className="bg-[#2A2A3A] rounded-lg p-4 md:p-6 shadow-lg">
//       <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Create a New Portfolio</h2>
//       <form className="space-y-4 md:space-y-6" onSubmit={handleOptimizePortfolio}>
//         {/* Investment Amount */}
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Investment Amount ($)
//           </label>
//           <input
//             type="number"
//             className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
//             value={investmentAmount}
//             onChange={(e) => setInvestmentAmount(Number(e.target.value))}
//             min="1000"
//             step="1000"
//           />
//         </div>

// {/* Risk Appetite */}
// <div>
//   <label className="block text-sm font-medium mb-2">
//     Risk Appetite (0 to 1)
//   </label>
//   <div className="flex items-center gap-4">
//     <input
//       type="range"
//       min="0"
//       max="1"
//       step="0.1"
//       value={riskAppetite}
//       onChange={(e) => setRiskAppetite(parseFloat(e.target.value))}
//       className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
//     />
//     <span className="text-sm font-semibold">{Number(riskAppetite).toFixed(1)}</span>
//   </div>
// </div>


//        {/* Asset Preferences with Percentage Allocation */}
// <div>
//   <label className="block text-sm font-medium mb-2">
//     Asset Allocation (%)
//   </label>
//   {Object.entries(assetPreferences).map(([asset, value]) => (
//     <div key={asset} className="mb-3">
//       <label className="capitalize text-sm md:text-base">{asset.replace(/([A-Z])/g, ' $1').trim()}</label>
//       <input
//         type="range"
//         min="0"
//         max="100"
//         value={value}
//         step="5"
//         onChange={(e) => {
//           const newValue = Number(e.target.value);
//           const totalOther = Object.values(assetPreferences).reduce((sum, v) => sum + v, 0) - value;
          
//           if (totalOther + newValue <= 100) {  // Ensure total allocation doesn't exceed 100%
//             setAssetPreferences({ ...assetPreferences, [asset]: newValue });
//           }
//         }}
//         className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
//       />
//       <span className="ml-2 text-sm">{value}%</span>
//     </div>
//   ))}
// </div>


//         {/* Investment Duration */}
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Investment Duration
//           </label>
//           <select
//             className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
//             value={duration}
//             onChange={(e) => setDuration(Number(e.target.value))}
//           >
//             {[1, 3, 5, 7, 10].map((year) => (
//               <option key={year} value={year}>
//                 {year} Year{year > 1 ? "s" : ""}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Market Condition */}
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Market Condition Preference
//           </label>
//           <select
//             className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
//             value={marketCondition}
//             onChange={(e) => setMarketCondition(e.target.value)}
//           >
//             <option value="bull">Bull Market</option>
//             <option value="bear">Bear Market</option>
//             <option value="neutral">Neutral</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#3B82F6] text-white p-2 rounded hover:bg-[#2563EB] transition-colors font-medium"
//         >
//           Optimize Portfolio
//         </button>
//       </form>

//       {showOptimizedPortfolio && (
//         <div className="mt-6 md:mt-8">
//           <h3 className="text-lg md:text-xl font-semibold mb-4">Portfolio Optimization</h3>
          
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//             <PortfolioPieChart 
//               title="Initial Allocation" 
//               data={datatobefeed} 
//             />
//             {/* <PortfolioPieChart 
//               title="Optimized Allocation" 
//               data={optimizedPieData} 
//             /> */}
//           </div>

//           <PerformanceMetrics 
//             metrics={[
//               { label: "Expected Return", value: "8.2% → 12.5%", improvement: true },
//               { label: "Risk Level", value: "High → Medium", improvement: true },
//               { label: "Diversification Score", value: "45 → 82", improvement: true }
//             ]} 
//           />

//           {!showSuggestions && (
//             <div className="text-center">
//               <button
//                 onClick={handleGenerateSuggestions}
//                 className="bg-[#10B981] text-white px-6 py-2 rounded hover:bg-[#059669] transition-colors font-medium"
//               >
//                 Generate Detailed Suggestions
//               </button>
//             </div>
//           )}
import React, { useState } from "react";
import PortfolioPieChart from "../PortfolioPieChart/PortfolioPieChart";
import PerformanceMetrics from "../PerformanceMetrics/PerformanceMetrics";
import SuggestionsList from "../SuggestionsList/SuggestionsList";

const initialPieData = {
  labels: ["Stocks", "Bonds", "Real Estate", "Commodities"],
  datasets: [
    {
      data: [60, 30, 5, 5],
      backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
      borderColor: ["#1E1E2E"],
      borderWidth: 1,
    },
  ],
};

export default function NewPortfolio() {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [riskAppetite, setRiskAppetite] = useState(0.5);
  const [assetPreferences, setAssetPreferences] = useState({
    stocks: 40,
    bonds: 30,
    realEstate: 20,
    commodities: 10,
  });
  const [datatobefeed, setDatatobefeed] = useState(initialPieData);

  const [duration, setDuration] = useState(5);
  const [marketCondition, setMarketCondition] = useState("bull");
  const [showOptimizedPortfolio, setShowOptimizedPortfolio] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleOptimizePortfolio = async (e) => {
    e.preventDefault();
    setShowOptimizedPortfolio(false);
    setShowSuggestions(false);
   
    const datatosend = {
      investment: investmentAmount * 1.0,  // Ensures numeric format
      duration: duration,
      risk_tolerance: riskAppetite * 1.0,
      stocks: assetPreferences.stocks,  
      bonds: assetPreferences.bonds,
      real_estate: assetPreferences.realEstate,
      commodities: assetPreferences.commodities,
    };
    
    // Debugging print
    console.log("🚀 Data being sent to backend:", datatosend);
    
    console.log("data",datatosend);

    const res = await fetch("http://127.0.0.1:8000/suggestions/portfolio_suggestions", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datatosend),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok && data.optimized_allocation) {
      setDatatobefeed((prev) => ({
        ...prev,
        datasets: prev.datasets.map((dataset, index) =>
          index === 0
            ? {
                ...dataset,
                data: [
                  data.optimized_allocation.Stocks ,
                  data.optimized_allocation.Bonds ,
                  data.optimized_allocation.Real_Estate ,
                  data.optimized_allocation.Commodities ,
                ],
                backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
                borderColor: ["#1E1E2E"],
                borderWidth: 1,
              }
            : dataset
        ),
      }));
      setShowOptimizedPortfolio(true);
    }
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
          <label className="block text-sm font-medium mb-2">Investment Amount (₹)</label>
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
          <label className="block text-sm font-medium mb-2">Risk Appetite (0 to 1)</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={riskAppetite}
              onChange={(e) => setRiskAppetite(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-semibold">{Number(riskAppetite).toFixed(1)}</span>
          </div>
        </div>

        {/* Asset Preferences with Percentage Allocation */}
        <div>
          <label className="block text-sm font-medium mb-2">Asset Allocation (%)</label>
          {Object.entries(assetPreferences).map(([asset, value]) => (
            <div key={asset} className="mb-3">
              <label className="capitalize text-sm md:text-base">
                {asset.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                step="5"
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  const totalOther =
                    Object.values(assetPreferences).reduce((sum, v) => sum + v, 0) - value;

                  if (totalOther + newValue <= 100) {
                    setAssetPreferences({ ...assetPreferences, [asset]: newValue });
                  }
                }}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-2 text-sm">{value}%</span>
            </div>
          ))}
        </div>

        {/* Investment Duration */}
        <div>
          <label className="block text-sm font-medium mb-2">Investment Duration</label>
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
            <PortfolioPieChart title="Optimized Allocation" data={datatobefeed} />
          </div>

          <PerformanceMetrics
            metrics={[
              { label: "Expected Return", value: "8.2% → 12.5%", improvement: true },
              { label: "Risk Level", value: "High → Medium", improvement: true },
              { label: "Diversification Score", value: "45 → 82", improvement: true },
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