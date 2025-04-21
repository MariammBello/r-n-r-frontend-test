"use client"

import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

// Sample recently viewed items
const recentlyViewedItems = [
  {
    id: 1,
    type: "accommodation",
    title: "3 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    image: "/images/placeholder.jpg", // Updated path
    dates: {
      from: "Fri, Feb 14, 2025",
      to: "Sun, Feb 16, 2025",
    },
    travelers: 5,
  },
  {
    id: 2,
    type: "flight",
    title: "Ethiopian Airlines",
    route: "Ethiopia (ETH) to Lagos (LOS)",
    image: "/images/airline-ethiopian.png", // Updated path
    dates: {
      from: "Fri, Feb 14, 2025",
      to: "Sun, Feb 16, 2025",
    },
    travelers: 2,
    roundtrip: true,
  },
  {
    id: 3,
    type: "bundle",
    title: "Bundle Deal",
    route: "From Ethiopia to Lagos",
    image: "/images/placeholder.jpg", // Updated path
    travelers: 2,
  },
]

export default function ViewedRecently() {
  const { isAuthenticated } = useAuth()

  // Only show for authenticated users
  if (!isAuthenticated) {
    return null
  }

  return (
    <section className="w-full my-8">
      <div className="w-full mx-auto px-[60px]">
        <h2 className="text-[#0e2f3c] text-2xl font-bold mb-6">
          Viewed Recently
        </h2>

        <div className="relative">
          <div className="flex space-x-6 overflow-hidden">
            {recentlyViewedItems.map((item) => (
              <div key={item.id} className="flex-none w-[calc(33.333%-16px)]">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="w-20 h-20 relative mr-4 flex-shrink-0">
                      <Image
                        src={item.image || "/images/placeholder.jpg"} // Updated fallback path
                        alt={item.title}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-[#0e2f3c] font-bold">{item.title}</h3>
                      {item.location && (
                        <p className="text-[#4f4f4f] text-sm">
                          {item.location}
                        </p>
                      )}
                      {item.route && (
                        <p className="text-[#4f4f4f] text-sm">{item.route}</p>
                      )}

                      {item.dates && (
                        <div className="text-xs text-[#4f4f4f] mt-1">
                          {item.dates.from} to {item.dates.to}
                          {item.roundtrip && (
                            <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded">
                              Roundtrip
                            </span>
                          )}
                        </div>
                      )}

                      <div className="text-xs text-[#4f4f4f] mt-1">
                        {item.travelers}{" "}
                        {item.travelers === 1 ? "traveler" : "travelers"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrow */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md z-10">
            <ChevronRight className="text-[#0e2f3c]" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
