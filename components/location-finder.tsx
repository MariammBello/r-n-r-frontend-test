"use client"; // Need client component for state and hooks

import { useState } from "react"; // Import useState
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { Search, MapPin } from "lucide-react";

export default function LocationFinder() {
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (location.trim()) {
      // Navigate to the accommodation search page with the location query parameter
      router.push(`/accommodation?location=${encodeURIComponent(location.trim())}`);
    } else {
      // Optionally navigate without a query param or show an alert
      router.push('/accommodation');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <section className="w-full pb-10">
      <div className="w-full mx-auto px-[60px]">
        <div className="flex flex-col items-center">
          {/* Title - centered with the specified font */}
          <h2 className="text-[#0e2f3c] text-2xl font-bold mb-4 text-center font-['Bricolage_Grotesque_24pt',_sans-serif]">
            Location Finder
          </h2>

          {/* Search container */}
          <div className="flex w-full max-w-[524px] mt-2">
            {/* Input with location pin icon */}
            <div className="relative flex-grow">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e09f3e]">
                <MapPin size={20} />
              </div>
              <input
                type="text"
                placeholder="Where to?"
                className="w-full h-[50px] pl-10 pr-4 rounded-l-md border border-[#bdbdbd] focus:outline-none focus:border-[#0e2f3c]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown} // Add keydown handler for Enter key
              />
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch} // Add click handler
              className="h-[50px] px-6 bg-[#0e2f3c] text-white rounded-r-md font-medium hover:bg-[#0a2530] transition-colors flex items-center justify-center"
            >
              Search
              <Search className="ml-2" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
