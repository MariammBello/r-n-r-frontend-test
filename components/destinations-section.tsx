"use client"; // Add "use client" for hooks

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"; // Import hooks
import { DestinationCity } from "@/types/accommodation"; // Import type
import { fetchFeaturedDestinations } from "@/lib/api/accommodations"; // Import API function
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

export default function DestinationsSection() {
  const [destinations, setDestinations] = useState<DestinationCity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDestinations = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFeaturedDestinations();
        setDestinations(data);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
        // Optionally set an error state here
      } finally {
        setIsLoading(false);
      }
    };
    loadDestinations();
  }, []);

  return (
    <section className="w-full my-[72px]">
      <div className="w-full mx-auto px-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            // Show skeletons while loading
            [...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <Skeleton className="h-[240px] w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-11 w-full mt-2" />
                </div>
              </div>
            ))
          ) : (
            // Render actual destinations once loaded
            destinations.map((city) => (
              <div
                key={city.id} // Use city.id as key
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                {/* City Image */}
                <div className="relative h-[240px] w-full">
                  <Image
                    src={city.image || "/images/placeholder.jpg"} // Updated fallback path
                    alt={`View of ${city.name}`}
                    fill
                    className="object-cover"
                    // Removed sizes prop as it seemed to cause issues
                  />
                </div>

                {/* City Content */}
                <div className="p-6">
                  <h3 className="text-[#0e2f3c] text-2xl font-bold mb-2">
                    {city.name}
                  </h3>
                  <p className="text-[#4f4f4f] mb-6">{city.description}</p>
                  <Link
                    href={`/destinations/${city.slug}`} // Use city.slug for link
                    className="block w-full py-4 bg-[#0e2f3c] text-white text-center rounded-md font-medium hover:bg-[#0a2530] transition-colors"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
