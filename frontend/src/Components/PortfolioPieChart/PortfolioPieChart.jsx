import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioPieChart({ title }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchPortfolioData() {
      try {
        const response = await fetch("http://localhost:8000/suggestions/portfolio_suggestions/"); // Update with your backend URL
        const data = await response.json();

        if (data.optimized_allocation) {
          const labels = Object.keys(data.optimized_allocation);
          const values = Object.values(data.optimized_allocation);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: "Asset Allocation",
                data: values,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                borderColor: "#ffffff",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    }

    fetchPortfolioData();
  }, []);

  return (
    <div className="p-4 bg-[#3B3B4F] rounded-lg">
      <h4 className="text-center font-medium mb-3">{title}</h4>
      <div className="h-64">
        {chartData ? (
          <Pie
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    color: "#E5E7EB",
                    font: {
                      size: 12,
                    },
                  },
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.label || "";
                      const value = context.raw || 0;
                      const total = context.dataset.data.reduce((a, b) => a + b, 0);
                      const percentage = Math.round((value / total) * 100);
                      return `${label}: ${value} (${percentage}%)`;
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <p className="text-center text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  );
}
