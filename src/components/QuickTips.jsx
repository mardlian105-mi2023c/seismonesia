import React from "react";

export default function QuickTips() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h4 className="font-semibold text-gray-800 mb-3">Quick Tips</h4>
      <ul className="space-y-3">
        <TipItem
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          }
          text="Click any card to center the map and show details"
        />
        <TipItem
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          }
          text="Use search to find specific locations"
        />
        <TipItem
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          }
          text="Set minimum magnitude to filter weaker quakes"
        />
      </ul>
    </div>
  );
}

function TipItem({ icon, text }) {
  return (
    <li className="flex items-start">
      <span className="flex-shrink-0 bg-blue-100 text-blue-600 p-1 rounded-full mr-2">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icon}
        </svg>
      </span>
      <span className="text-sm text-gray-600">{text}</span>
    </li>
  );
}
