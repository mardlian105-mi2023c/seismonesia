import React from "react";
import RegionSelector from "./RegionSelector";
import EarthquakeDetails from "./EarthquakeDetails";
import QuickTips from "./QuickTips";

export default function Sidebar({
  continents,
  selectedContinent,
  setSelectedContinent,
  selectedFeature,
}) {
  return (
    <aside className="space-y-6 w-full md:w-auto">
      {/* Mobile menu button would be in the parent/layout component */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-800 text-sm md:text-base">
            Filter by Region
          </h4>
          <svg
            className="h-4 w-4 md:h-5 md:w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <RegionSelector
          continents={continents}
          selected={selectedContinent}
          onChange={setSelectedContinent}
        />
      </div>

      <EarthquakeDetails selectedFeature={selectedFeature} />

      <QuickTips />
    </aside>
  );
}
