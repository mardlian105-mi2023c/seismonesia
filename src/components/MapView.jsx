import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapController({ selected }) {
  const map = useMap();

  useEffect(() => {
    if (selected) {
      const [lon, lat] = selected.geometry.coordinates;
      map.flyTo([lat, lon], 6, { duration: 0.9 });
    }
  }, [selected, map]);

  return null;
}

function getMagColor(mag) {
  if (mag >= 7) return "#ef4444";
  if (mag >= 6) return "#f97316";
  if (mag >= 5) return "#eab308";
  if (mag >= 4) return "#84cc16";
  return "#10b981";
}

export default function MapView({
  features,
  selectedFeature,
  onFeatureSelect,
  mapRef,
}) {
  return (
    <MapContainer
      center={[20, 40]}
      zoom={2}
      minZoom={2}
      maxBounds={[
        [-85, -180],
        [85, 180],
      ]}
      style={{ height: "480px", width: "100%" }}
      whenCreated={(map) => {
        mapRef.current = map;
      }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <MapController selected={selectedFeature} />

      {features.map((f) => {
        const [lon, lat, depth] = f.geometry.coordinates;
        const mag = f.properties.mag ?? 0;
        const radius = Math.max(8, Math.sqrt(mag) * 5);
        const isSelected = selectedFeature?.id === f.id;
        const isSignificant = mag >= 5; // Only blink for significant earthquakes (mag 5+)

        return (
          <CircleMarker
            key={f.id}
            center={[lat, lon]}
            radius={radius}
            color={getMagColor(mag)}
            fillColor={getMagColor(mag)}
            fillOpacity={0.8}
            weight={isSelected ? 3 : 1}
            className={
              isSelected
                ? "selected-marker"
                : isSignificant
                ? "blinking-marker"
                : ""
            }
            eventHandlers={{
              click: () => onFeatureSelect(f),
            }}
          >
            <Popup className="custom-popup">
              <div className="min-w-[220px] p-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {f.properties.place}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${getMagColor(mag)}20`,
                          color: getMagColor(mag),
                        }}
                      >
                        Magnitude: {mag.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {new Date(f.properties.time).toLocaleString("id-ID", {
                      timeZone: "Asia/Jakarta",
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <a
                    href={f.properties.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    USGS Details
                  </a>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
