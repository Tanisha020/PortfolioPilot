import React from "react";

export default function SuggestionsList({ title, suggestions }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg md:text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="p-4 bg-[#3B3B4F] rounded-lg">
            <h4 className="font-medium text-[#3B82F6] mb-2">{suggestion.title}</h4>
            <p className="text-sm text-gray-300 whitespace-pre-line">
              {suggestion.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}