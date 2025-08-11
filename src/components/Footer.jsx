import React from "react";

export default function Footer({ lastUpdated }) {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 lg:px-8 text-center text-sm text-gray-500">
        <p>
          Earthquake data provided by USGS | Last updated: {lastUpdated || "—"}
        </p>
        <p className="mt-1">
          For emergency information, please contact your local authorities
        </p>
      </div>
    </footer>
  );
}
