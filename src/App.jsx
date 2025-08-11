import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FilterPanel from "./components/FilterPanel";
import MapSection from "./components/MapSection";
import EarthquakeList from "./components/EarthquakeList";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const CONTINENTS = [
  "All",
  "Asia",
  "Europe",
  "Africa",
  "North America",
  "Central America",
  "South America",
  "Oceania",
  "Antarctica",
];

export default function App() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [search, setSearch] = useState("");
  const [minMag, setMinMag] = useState("");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mapRef = useRef(null);

  const continentFromLatLon = (lat, lon) => {
    if (lat <= -60) return "Antarctica";
    if (lon >= 110 && lon <= 180 && lat <= 10 && lat >= -50) return "Oceania";
    if (lon > 25 && lon <= 180 && lat > -10) return "Asia";
    if (lon >= -25 && lon <= 40 && lat >= 35) return "Europe";
    if (lon >= -25 && lon <= 60 && lat <= 35 && lat >= -35) return "Africa";
    if (lon <= -30 && lon >= -180 && lat >= 5) return "North America";
    if (lon >= -120 && lon <= -70 && lat <= 25 && lat >= -25) {
      return lat >= 5 ? "North America" : "Central America";
    }
    if (lon >= -90 && lon <= -30 && lat <= 15 && lat >= -60)
      return "South America";
    return lat > 0 ? "Europe" : "Africa";
  };

  const fetchQuakes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=200&orderby=time"
      );
      const list = (res.data.features || []).map((f) => ({
        ...f,
        continent: continentFromLatLon(
          ...f.geometry.coordinates.slice().reverse()
        ),
      }));
      setFeatures(list);
      setLastUpdated(new Date().toLocaleTimeString("id-ID"));
    } catch (err) {
      console.error("fetchQuakes error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuakes();
  }, []);

  const filtered = features.filter((f) => {
    const textMatch = f.properties.place
      .toLowerCase()
      .includes(search.toLowerCase());
    const magMatch = minMag
      ? (f.properties.mag || 0) >= parseFloat(minMag)
      : true;
    const continentMatch =
      selectedContinent === "All" || f.continent === selectedContinent;
    return textMatch && magMatch && continentMatch;
  });

  const strongest = features.reduce(
    (acc, f) =>
      f.properties.mag > acc.mag
        ? { mag: f.properties.mag, place: f.properties.place }
        : acc,
    { mag: -999 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-x-hidden">
      <Navbar
        onRefresh={fetchQuakes}
        lastUpdated={lastUpdated}
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Hero />

      <main className="container mx-auto px-4 pt-20 lg:px-8 -mt-12 mb-16">
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        <div className="relative flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? "lg:mr-72" : ""
            }`}
          >
            <FilterPanel
              search={search}
              setSearch={setSearch}
              minMag={minMag}
              setMinMag={setMinMag}
              filteredCount={filtered.length}
              totalCount={features.length}
              strongestMag={strongest.mag}
            />

            <div className="relative h-96 sm:h-[480px] w-full z-0">
              <MapSection
                features={filtered}
                selectedFeature={selectedFeature}
                setSelectedFeature={setSelectedFeature}
                mapRef={mapRef}
              />
            </div>

            <EarthquakeList
              loading={loading}
              features={filtered}
              selectedFeature={selectedFeature}
              setSelectedFeature={setSelectedFeature}
              mapRef={mapRef}
            />
          </div>

          {/* Sidebar - Fixed on mobile, normal flow on desktop */}
          <div
            className={`fixed lg:static inset-y-0 left-0 h-full w-72 lg:w-auto bg-white shadow-xl lg:shadow-none z-40 lg:z-auto transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
          >
            <div className="h-full overflow-y-auto p-4 border-r border-gray-200">
              <button
                className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Sidebar
                continents={CONTINENTS}
                selectedContinent={selectedContinent}
                setSelectedContinent={setSelectedContinent}
                selectedFeature={selectedFeature}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer lastUpdated={lastUpdated} />
    </div>
  );
}
