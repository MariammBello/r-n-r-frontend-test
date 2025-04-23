"use client"; // Already client component

import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react"; // Import hooks
import { RecentlyViewedItem } from "@/types/accommodation"; // Import type
import { fetchRecentlyViewed } from "@/lib/api/users"; // Import API function
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

export default function ViewedRecently() {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data only if authenticated
    if (isAuthenticated) {
      const loadItems = async () => {
        setIsLoading(true);
        try {
          const data = await fetchRecentlyViewed();
          setItems(data);
        } catch (error) {
          console.error("Failed to fetch recently viewed items:", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadItems();
    } else {
      // If not authenticated, ensure loading is false and items are empty
      setIsLoading(false);
      setItems([]);
    }
  }, [isAuthenticated]); // Re-run effect if auth status changes

  // Only show section if authenticated AND (loading OR has items)
  if (!isAuthenticated || (isLoading && items.length === 0) || (!isLoading && items.length === 0)) {
    return null; // Don't render anything if not authenticated or no items/still loading initial state
  }

  // TODO: Implement carousel logic if needed

  return (
    <section className="w-full my-8">
      <div className="w-full mx-auto px-[60px]">
        <h2 className="text-[#0e2f3c] text-2xl font-bold mb-6">
          Viewed Recently
        </h2>

        <div className="relative">
          {/* TODO: Replace with actual carousel component if needed */}
          <div className="flex space-x-6 overflow-x-auto pb-4"> {/* Allow horizontal scroll */}
            {isLoading ? (
              // Skeletons
              [...Array(3)].map((_, index) => (
                <div key={index} className="flex-none w-[300px] sm:w-[350px]">
                  <Skeleton className="h-[112px] w-full rounded-lg" />
                </div>
              ))
            ) : (
              // Actual Items
              items.map((item) => (
              <Link key={item.id} href={item.itemLink} className="flex-none w-[300px] sm:w-[350px] block group">
                <div className="bg-white rounded-lg border border-gray-200 p-4 group-hover:shadow-md transition-shadow duration-200 h-full">
                  <div className="flex items-center h-full">
                    <div className="w-20 h-20 relative mr-4 flex-shrink-0">
                      <Image
                        src={item.image || "/images/placeholder.jpg"}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-grow overflow-hidden"> {/* Prevent text overflow */}
                      <h3 className="text-[#0e2f3c] font-bold truncate">{item.title}</h3>
                      {item.location && (
                        <p className="text-[#4f4f4f] text-sm truncate">
                          {item.location}
                        </p>
                      )}
                      {item.route && (
                        <p className="text-[#4f4f4f] text-sm truncate">{item.route}</p>
                      )}

                      {item.dates && (
                        <div className="text-xs text-[#4f4f4f] mt-1 truncate">
                          {item.dates.from} to {item.dates.to}
                          {item.roundtrip && (
                            <span className="ml-2 bg-gray-100 px-1 py-0.5 rounded text-gray-600">
                              Roundtrip
                            </span>
                          )}
                        </div>
                      )}

                      {item.travelers && ( // Check if travelers exists
                        <div className="text-xs text-[#4f4f4f] mt-1">
                          {item.travelers}{" "}
                          {item.travelers === 1 ? "traveler" : "travelers"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )) // End items.map
          )} {/* End Ternary */}
          </div>

          {/* Navigation arrow (placeholder for carousel) */}
          {/* TODO: Implement carousel controls */}
          {!isLoading && items.length > 3 && ( // Only show if not loading and enough items
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md z-10 hover:bg-gray-100 transition-colors">
              <ChevronRight className="text-[#0e2f3c]" size={16} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
