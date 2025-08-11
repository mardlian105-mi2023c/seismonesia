import React from "react";

export default function EarthquakeDetails({ selectedFeature }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800">Earthquake Details</h4>
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {selectedFeature ? (
        <DetailContent feature={selectedFeature} />
      ) : (
        <EmptyDetailState />
      )}
    </div>
  );
}

function DetailContent({ feature }) {
  const { properties, geometry } = feature;
  const m = properties.mag ?? 0;

  const impact =
    properties.tsunami === 1
      ? {
          text: "Tsunami Warning - Seek Higher Ground",
          color: "text-red-600",
          icon: "⚠️",
        }
      : m >= 7
      ? { text: "Major Impact Expected", color: "text-red-600", icon: "⚠️" }
      : m >= 5
      ? {
          text: "Moderate Impact Possible",
          color: "text-amber-500",
          icon: "❗",
        }
      : { text: "Minor Impact Expected", color: "text-green-600", icon: "✅" };

  return (
    <div className="space-y-3">
      <div className="bg-blue-50 rounded-lg p-3">
        <h5 className="font-bold text-gray-800 text-lg">{properties.place}</h5>
        <div className="flex items-center mt-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Magnitude: {properties.mag}
          </span>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Depth: {geometry.coordinates[2]} km
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="text-gray-500">Time (WIB)</div>
          <div className="font-medium">
            {new Date(properties.time).toLocaleString("id-ID", {
              timeZone: "Asia/Jakarta",
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="text-gray-500">Coordinates</div>
          <div className="font-medium">
            {geometry.coordinates[1].toFixed(2)}°N,{" "}
            {geometry.coordinates[0].toFixed(2)}°E
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="font-medium text-gray-700 mb-1">Potential Impact</div>
        <div className={`flex items-center ${impact.color} font-semibold`}>
          <span className="mr-2">{impact.icon}</span>
          {impact.text}
        </div>
      </div>

      <a
        href={properties.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
      >
        <svg
          className="h-4 w-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
        View Details on USGS
      </a>
    </div>
  );
}

function EmptyDetailState() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <svg
        className="h-12 w-12 mx-auto text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h5 className="mt-2 font-medium text-gray-700">No Earthquake Selected</h5>
      <p className="text-sm text-gray-500 mt-1">
        Click on an earthquake marker to see details
      </p>
    </div>
  );
}
