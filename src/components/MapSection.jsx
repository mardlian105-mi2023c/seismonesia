import React from "react";
import MapView from "./MapView";

export default function MapSection({
  features,
  selectedFeature,
  setSelectedFeature,
  mapRef,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <MapView
        features={features}
        selectedFeature={selectedFeature}
        onFeatureSelect={setSelectedFeature}
        mapRef={mapRef}
      />
    </div>
  );
}
