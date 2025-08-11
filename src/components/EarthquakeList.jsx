import React from "react";
import QuakeCard from "./QuakeCard";

export default function EarthquakeList({
  loading,
  features,
  selectedFeature,
  setSelectedFeature,
  mapRef,
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Earthquakes
      </h3>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-6 w-6 bg-blue-400 rounded-full mb-2"></div>
            <div className="text-sm text-gray-500">
              Loading earthquake data...
            </div>
          </div>
        </div>
      ) : features.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <QuakeCard
              key={f.id}
              feature={f}
              isSelected={selectedFeature?.id === f.id}
              onClick={() => {
                setSelectedFeature(f);
                if (mapRef.current?.flyTo) {
                  const [lon, lat] = f.geometry.coordinates;
                  mapRef.current.flyTo([lat, lon], 6, { duration: 0.9 });
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
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
      <h4 className="mt-3 text-gray-700 font-medium">No earthquakes found</h4>
      <p className="mt-1 text-sm text-gray-500">
        Try adjusting your filters or search criteria
      </p>
    </div>
  );
}
