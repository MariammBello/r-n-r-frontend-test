
"use client" // Add "use client" because we'll use hooks

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react" // Import ChevronLeft
import { useState, useEffect } from "react" // Import hooks
import { AccommodationType } from "@/types/accommodation" // Import the type
import { accommodationTypes as mockAccommodationTypes } from "@/lib/mock-data/accommodationTypes" // Import mock data
import { ProtectedLink } from "@/components/protectedLink" // Import ProtectedLink


export default function AccommodationsSection() {
  // State to hold the accommodation types
  const [types, setTypes] = useState<AccommodationType[]>([])

  // Simulate fetching data on component mount
  useEffect(() => {
    // In a real scenario, this would be an API call
    // For now, we just use the imported mock data
    setTypes(mockAccommodationTypes)
  }, []) // Empty dependency array ensures this runs only once

  // TODO: Implement carousel logic (state for current index, handlers for next/prev)
  // Placeholder functions to resolve ReferenceError
  const prevSlide = () => {
    console.log("Previous slide clicked - logic not implemented");
  };
  const nextSlide = () => {
    console.log("Next slide clicked - logic not implemented");
  };

  return (
    <section className="w-full my-[72px]">
      {/* Reverted to original width and padding */}
      <div className="w-full mx-auto px-[60px]">
        {/* Header with title and "See all listings" button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#0e2f3c] text-4xl font-bold">
            Find Your Perfect Accommodation
          </h2>
          <ProtectedLink
  href="/accommodation"
  className="px-6 py-3 bg-[#0e2f3c] text-white rounded-md font-medium hover:bg-[#0a2530] transition-colors"
>
  See all listings
</ProtectedLink>

        </div>

        {/* Accommodation types carousel */}
        {/* TODO: Replace this div with a proper carousel component (e.g., from shadcn/ui) */}
        <div className="relative">
          {/* Reverted overflow behavior, kept mapping over 'types' */}
          <div className="flex space-x-6 overflow-hidden">
            {types.map((type) => ( // Map over the state variable 'types'
              <div
                key={type.id}
                // Reverted to original width calculation
                className="flex-none w-[calc(33.333%-16px)] relative rounded-lg overflow-hidden"
              >
                {/* Accommodation Image */}
                <div className="relative h-[400px] w-full">
                  {/* Updated fallback path */}
                  <Image
                    src={type.image || "/images/placeholder.jpg"}
                    alt={type.name}
                    fill
                    // Removed sizes attribute and hover effect for simplicity, revert if needed
                    className="object-cover"
                  />
                  {/* Removed gradient overlay */}
                </div>

                {/* Clickable Accommodation Type Name - Reverted Styling */}
                <Link
                  href={type.link}
                  // Reverted to original styling
                  className="block absolute bottom-0 left-0 right-0 bg-[#e09f3e] py-4 hover:bg-[#d08f2e] transition-colors"
                >
                  {/* Reverted to original styling */}
                  <h3 className="text-[#0e2f3c] text-2xl font-bold text-center">
                    {type.name}
                  </h3>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation arrow - Reverted to original single arrow */}
          {/* TODO: Implement proper carousel controls later */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md z-10">
            <ChevronRight className="text-[#0e2f3c]" size={24} />
          </button>

        </div>
        <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-slate-800 p-2 rounded-full border-2 border-slate-800 hover:bg-slate-800 hover:text-white">
                 <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-slate-800 p-2 rounded-full  border-2 border-slate-800 hover:bg-slate-800 hover:text-white">
                <ChevronRight size={24} />
        </button>
      </div>
     
    </section>

  );
}
