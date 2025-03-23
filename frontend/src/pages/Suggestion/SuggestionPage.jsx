import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SuggestionPage() {
    const [activeTab, setActiveTab] = useState("new"); // "new" or "existing"
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

    // Mock data for the pie chart
    const pieData = {
        labels: ["Stocks", "Bonds", "Real Estate", "Crypto"],
        datasets: [
            {
                data: [40, 30, 20, 10], // Mock allocation
                backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
            },
        ],
    };

    return (
        <div className="min-h-screen bg-[#1E1E2E] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Optimize Your Portfolio with AI</h1>
                    <p className="text-gray-400 mb-6">
                        Get data-driven investment insights tailored to your risk profile.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            className={`px-6 py-3 rounded-lg transition-colors ${activeTab === "new"
                                ? "bg-[#3B82F6] text-white"
                                : "bg-[#3B3B4F] hover:bg-[#4B4B5F]"
                                }`}
                            onClick={() => setActiveTab("new")}
                        >
                            Create New Portfolio
                        </button>
                        <button
                            className={`px-6 py-3 rounded-lg transition-colors ${activeTab === "existing"
                                ? "bg-[#3B82F6] text-white"
                                : "bg-[#3B3B4F] hover:bg-[#4B4B5F]"
                                }`}
                            onClick={() => setActiveTab("existing")}
                        >
                            Analyze Existing Portfolio
                        </button>
                    </div>
                </div>

                {/* Create New Portfolio Section */}
                {activeTab === "new" && (
                    <div className="bg-[#2A2A3A] rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">Create a New Portfolio</h2>
                        <form className="space-y-6">
                            {/* Investment Amount */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Investment Amount
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                                    value={investmentAmount}
                                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                                />
                            </div>

                            {/* Risk Appetite */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Risk Appetite
                                </label>
                                <div className="flex gap-4">
                                    {["low", "medium", "high"].map((risk) => (
                                        <button
                                            key={risk}
                                            className={`px-4 py-2 rounded capitalize ${riskAppetite === risk
                                                ? "bg-[#3B82F6] text-white"
                                                : "bg-[#3B3B4F] hover:bg-[#4B4B5F]"
                                                }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setRiskAppetite(risk);
                                            }}
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
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.keys(assetPreferences).map((asset) => (
                                        <div key={asset} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={asset}
                                                checked={assetPreferences[asset]}
                                                onChange={(e) =>
                                                    setAssetPreferences({
                                                        ...assetPreferences,
                                                        [asset]: e.target.checked,
                                                    })
                                                }
                                                className="mr-2"
                                            />
                                            <label htmlFor={asset} className="capitalize">
                                                {asset}
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
                                    {[1, 5, 10].map((year) => (
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#3B82F6] text-white p-2 rounded hover:bg-[#2563EB] transition-colors"
                            >
                                Generate Suggestions
                            </button>
                        </form>

                        {/* Output Section */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-4">Recommended Portfolio Allocation</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Pie Chart */}
                                <div className="p-4 bg-[#3B3B4F] rounded-lg">
                                    <Pie data={pieData} />
                                </div>

                                {/* Expected Returns & Risk Analysis */}
                                <div className="space-y-4">
                                    <div className="p-4 bg-[#3B3B4F] rounded-lg">
                                        <p className="text-sm text-gray-400">Expected Return</p>
                                        <p className="text-lg font-semibold">12.5%</p>
                                    </div>
                                    <div className="p-4 bg-[#3B3B4F] rounded-lg">
                                        <p className="text-sm text-gray-400">Risk Analysis</p>
                                        <p className="text-lg font-semibold">Medium Risk</p>
                                    </div>
                                    <div className="p-4 bg-[#3B3B4F] rounded-lg">
                                        <p className="text-sm text-gray-400">Comparison vs. S&P 500</p>
                                        <p className="text-lg font-semibold">+2.3%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Analyze Existing Portfolio Section */}
                {activeTab === "existing" && (
                    <div className="bg-[#2A2A3A] rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">Analyze Existing Portfolio</h2>
                        <div className="space-y-6">
                            {/* Upload Portfolio Data */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Upload Portfolio Data (CSV)
                                </label>
                                <input
                                    type="file"
                                    className="w-full p-2 rounded bg-[#3B3B4F] text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                                />
                            </div>

                            {/* Current Asset Breakdown */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Current Asset Breakdown</h3>
                                <div className="flex justify-center">
                                    <div className="w-64 h-64"> {/* Slightly larger pie chart container */}
                                        <Pie data={pieData} />
                                    </div>
                                </div>
                            </div>

                            {/* AI Optimization Suggestions */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">AI Optimization Suggestions</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Current vs. Suggested Allocation */}
                                    <div className="p-4 bg-[#3B3B4F] rounded-lg">
                                        <h4 className="text-lg font-semibold mb-2">Current Allocation</h4>
                                        <div className="w-64 h-64 mx-auto"> {/* Slightly larger pie chart container */}
                                            <Pie data={pieData} />
                                        </div>
                                    </div>
                                    <div className="p-4 bg-[#3B3B4F] rounded-lg">
                                        <h4 className="text-lg font-semibold mb-2">Suggested Allocation</h4>
                                        <div className="w-64 h-64 mx-auto"> {/* Slightly larger pie chart container */}
                                            <Pie data={pieData} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Risk & Return Analysis */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Risk & Return Analysis</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-[#3B3B4F] rounded-lg">
                                        <p className="text-sm text-gray-400">Current Risk</p>
                                        <p className="text-lg font-semibold">High Risk</p>
                                    </div>
                                    <div className="p-4 bg-[#3B3B4F] rounded-lg">
                                        <p className="text-sm text-gray-400">Suggested Risk</p>
                                        <p className="text-lg font-semibold">Medium Risk</p>
                                    </div>
                                    <div className="p-4 bg-[#3B3B4F] rounded-lg">
                                        <p className="text-sm text-gray-400">Current Return</p>
                                        <p className="text-lg font-semibold">8.2%</p>
                                    </div>
                                    <div className="p-4 bg-[#3B3B4F] rounded-lg">
                                        <p className="text-sm text-gray-400">Suggested Return</p>
                                        <p className="text-lg font-semibold">12.5%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}