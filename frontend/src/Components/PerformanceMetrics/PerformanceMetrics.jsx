import React from "react";

export default function PerformanceMetrics({ metrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="p-4 bg-[#3B3B4F] rounded-lg">
          <p className="text-sm text-gray-400">{metric.label}</p>
          <p className="text-lg font-semibold">
            {metric.improvement ? (
              <>
                {metric.value.split("→")[0]} →{" "}
                <span className="text-[#10B981]">{metric.value.split("→")[1]}</span>
              </>
            ) : (
              metric.value
            )}
          </p>
        </div>
      ))}
    </div>
  );
}