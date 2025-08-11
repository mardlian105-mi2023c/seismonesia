import React from "react";

function getMagColorClass(mag) {
  if (mag >= 7) return "bg-gradient-to-br from-red-600 to-rose-700";
  if (mag >= 6) return "bg-gradient-to-br from-rose-500 to-orange-600";
  if (mag >= 5) return "bg-gradient-to-br from-orange-500 to-amber-500";
  if (mag >= 4) return "bg-gradient-to-br from-amber-400 to-yellow-500";
  return "bg-gradient-to-br from-emerald-500 to-teal-600";
}

function ImpactBadge({ mag, tsunami }) {
  const impact =
    tsunami === 1
      ? { text: "Tsunami Warning", color: "text-red-600", icon: "⚠️" }
      : mag >= 7
      ? { text: "Major Impact", color: "text-red-500", icon: "⚠️" }
      : mag >= 5
      ? { text: "Moderate", color: "text-amber-500", icon: "❗" }
      : { text: "Minor", color: "text-emerald-500", icon: "🔹" };

  return (
    <div
      className={`mt-2 text-xs font-medium px-2 py-1 rounded-full ${impact.color} bg-opacity-20 flex items-center`}
    >
      <span className="mr-1">{impact.icon}</span>
      {impact.text}
    </div>
  );
}

export default function QuakeCard({ feature, onClick, isSelected }) {
  const { properties, geometry } = feature;
  const mag = properties.mag ?? 0;
  const time = new Date(properties.time).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article
      onClick={onClick}
      className={`relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-blue-400 bg-blue-50/70 shadow-md"
          : "bg-white/90 hover:bg-gray-50/80 shadow-sm hover:shadow"
      } border border-gray-100/70 backdrop-blur-sm`}
    >
      <div
        className={`absolute top-0 left-0 h-full w-1 rounded-l-md ${getMagColorClass(
          mag
        )}`}
        aria-hidden="true"
      ></div>

      <div className="flex items-center gap-3 pl-3">
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm ${getMagColorClass(
            mag
          )} shadow-inner`}
        >
          {mag.toFixed(1)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline gap-2">
            <h3 className="font-medium text-gray-900 text-sm truncate">
              {properties.place.split(/,\s*/)[0]}
            </h3>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {time}
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="text-xs text-gray-500 flex items-center">
              <span className="opacity-70 mr-1">Depth:</span>
              <span className="font-medium">
                {geometry.coordinates[2].toFixed(1)} km
              </span>
            </div>
          </div>

          <ImpactBadge mag={mag} tsunami={properties.tsunami} />
        </div>
      </div>
    </article>
  );
}
