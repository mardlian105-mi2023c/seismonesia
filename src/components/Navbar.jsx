import React from "react";

export default function Navbar({ onRefresh, lastUpdated }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg
            className="h-6 w-6 sm:h-8 sm:w-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="ml-2 text-lg sm:text-xl font-bold text-gray-800">
            SeismoNesia
          </span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="hidden xs:inline text-xs sm:text-sm text-gray-500">
            Last updated: {lastUpdated}
          </span>
          <button
            onClick={onRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg flex items-center text-sm sm:text-base"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>
    </nav>
  );
}
