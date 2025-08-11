import React from "react";

export default function RegionSelector({ continents, selected, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {continents.map((continent) => (
        <button
          key={continent}
          onClick={() => onChange(continent)}
          className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
            selected === continent
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {continent}
        </button>
      ))}
    </div>
  );
}
