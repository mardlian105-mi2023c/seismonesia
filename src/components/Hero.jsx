import React from "react";

export default function Hero() {
  return (
    <header className="relative bg-gradient-to-br from-blue-700 to-blue-500 text-white py-12 lg:py-16 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white mix-blend-overlay"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-teal-300 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-teal-100">
              Global Earthquake Monitor
            </span>
          </h1>
          <p className="mt-4 text-lg text-blue-100 leading-relaxed">
            Real-time tracking of seismic activity worldwide. Explore the latest
            200 earthquakes, filter by region, and assess potential impacts.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse mr-2"></div>
              <span className="text-sm font-medium text-blue-100">
                Live Data
              </span>
            </div>
            <span className="text-blue-200">•</span>
            <span className="text-sm text-blue-100">
              Updated every 5 minutes
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-4 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/10 backdrop-blur-sm">
          <svg
            className="absolute bottom-0 left-0 w-full h-4 text-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
    </header>
  );
}
