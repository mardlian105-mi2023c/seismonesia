import React from "react";
import logo from "../assets/logo s.png";

export default function Navbar({ onRefresh, lastUpdated }) {
  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg">
      <div className="container mx-auto px-4 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="SeismoNesia Logo"
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
          <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Seismo<span className="font-extrabold">Nesia</span>
          </span>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-6">
          <div className="hidden sm:block bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-xs sm:text-sm text-white/90 font-medium">
              <span className="hidden md:inline">Updated: </span>
              <span className="font-semibold">{lastUpdated}</span>
            </span>
          </div>

          <button
            onClick={onRefresh}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/189/189687.png"
              alt="Refresh Icon"
              className="h-4 w-4"
            />
            <span className="text-sm sm:text-base font-medium">Refresh</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
