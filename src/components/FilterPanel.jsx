import React from "react";

export default function FilterPanel({
  search,
  setSearch,
  minMag,
  setMinMag,
  filteredCount,
  totalCount,
  strongestMag,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold text-gray-800">
            Earthquake Monitor
          </h3>
          <p className="text-sm text-gray-500">
            Real-time seismic activity tracking
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search location..."
              className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Magnitude Input */}
          <div className="relative flex-1 sm:flex-none sm:w-32">
            <input
              value={minMag}
              onChange={(e) => setMinMag(e.target.value)}
              placeholder="Min Magnitude"
              type="number"
              step="0.1"
              min="0"
              max="10"
              className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-2.5 text-gray-400 text-sm">
              M
            </span>
          </div>

          {/* Count Display */}
          <div className="text-sm bg-blue-50 rounded-lg px-3 py-2 flex justify-between items-center sm:block">
            <div className="flex items-center gap-1 sm:block">
              <span className="font-semibold text-blue-700">
                {filteredCount}
              </span>{" "}
              <span className="text-gray-600 hidden sm:inline">of</span>
              <span className="text-gray-600 sm:hidden">/</span>{" "}
              <span className="font-semibold">{totalCount}</span>
            </div>
            <div className="text-xs text-gray-500 sm:mt-1">
              Strongest:{" "}
              {strongestMag > -900 ? (
                <span className="font-bold text-red-600">
                  {strongestMag.toFixed(1)}
                </span>
              ) : (
                "—"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
