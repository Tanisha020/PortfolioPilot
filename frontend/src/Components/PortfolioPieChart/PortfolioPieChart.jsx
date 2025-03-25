import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioPieChart({ title, data }) {
  return (
    <div className="p-4 bg-[#3B3B4F] rounded-lg">
      <h4 className="text-center font-medium mb-3">{title}</h4>
      <div className="h-64">
        <Pie 
          data={data} 
          options={{ 
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#E5E7EB',
                  font: {
                    size: 12
                  }
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: ${value} (${percentage}%)`;
                  }
                }
              }
            }
          }} 
        />
      </div>
    </div>
  );
}