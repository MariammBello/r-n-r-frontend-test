"use client"; // Add "use client" for hooks

import Image from "next/image"
import Link from "next/link"
import { Star, Home, ShoppingCart, Coffee, MapPin, Check } from "lucide-react" // Added Check icon
import { useState, useEffect } from "react"; // Import hooks
import { BundleDeal } from "@/types/accommodation"; // Import type
import { fetchBundleDeals } from "@/lib/api/accommodations"; // Import API function
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

// Helper to format price
const formatPrice = (price: number) => {
  return `₦${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Helper to map included items to icons (simple example)
const includeIconMap: Record<string, React.ElementType> = {
  "Breakfast": Coffee,
  "Resort Tour": MapPin,
  "Spa Access": Check, // Placeholder
  "Airport Shuttle": Check, // Placeholder
  // Add more mappings as needed
};

export default function BundleDealsSection() {
  const [deals, setDeals] = useState<BundleDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDeals = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBundleDeals();
        setDeals(data);
      } catch (error) {
        console.error("Failed to fetch bundle deals:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDeals();
  }, []);


  return (
    <section className="w-full my-[72px]">
      <div className="w-full mx-auto px-[60px]">
        {/* Header with title and "See all deals" button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#0e2f3c] text-3xl font-bold">Bundle Deals- Ovajara packages</h2>
          <Link
            href="/deals"
            className="px-6 py-3 bg-[#0e2f3c] text-white rounded-md font-medium hover:bg-[#0a2530] transition-colors"
          >
            See all deals
          </Link>
        </div>

        {/* Date range info */}
        <div className="flex items-center mb-6">
          <span className="text-[#4f4f4f]">Showing deals available from: </span>
          <span className="font-medium ml-1">Feb. 10 - Feb. 16</span> {/* Placeholder date */}
          <span className="ml-4 px-2 py-1 bg-[#ff49b8] text-white text-sm rounded">Auto</span> {/* Placeholder tag */}
        </div>

        {/* Resort deals cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
             // Show skeletons while loading
            [...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <Skeleton className="h-[200px] w-full" />
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-1/4" />
                  </div>
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-5 w-1/4 mb-1" />
                  <Skeleton className="h-5 w-1/3" />
                  <div className="flex justify-between items-center mt-4">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-8 w-1/3" />
                  </div>
                </div>
              </div>
            )) // End Skeleton map
          ) : ( // Ternary else branch
             // Render actual deals
            deals.map((deal) => ( // Start deals.map
              <div key={deal.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {/* Resort Image */}
                <div className="relative h-[200px] w-full">
                  <Image
                    src={deal.image || "/images/placeholder.jpg"}
                    alt={deal.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Resort Info Container */}
                <div className="p-4"> {/* Main content padding */}

                  {/* Top Section: Name & Rating */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Home className="text-[#0e2f3c] mr-2" size={18} />
                      <h3 className="text-[#0e2f3c] text-xl font-bold">{deal.name}</h3>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={i < Math.floor(deal.rating) ? "fill-[#e09f3e] text-[#e09f3e]" : "text-gray-300"} size={16} />
                      ))}
                    </div>
                  </div>

                  {/* Location & Reviews Link */}
                  <div className="flex items-center mb-4">
                    <MapPin className="text-gray-500 mr-1" size={14} />
                    <p className="text-gray-600 text-sm">{deal.location}</p>
                    <Link href="#" className="text-[#e09f3e] text-sm ml-auto">
                      See all {deal.reviews} Reviews
                    </Link>
                  </div>

                  {/* Includes Section */}
                  <div className="mb-4">
                    <p className="text-[#4f4f4f] font-medium mb-2">Includes:</p>
                    <div className="space-y-2">
                      {deal.includes.map((item, index) => {
                         const IconComponent = includeIconMap[item] || Check;
                         return (
                           <div key={index} className="flex items-center">
                             <IconComponent className="text-[#e09f3e] mr-2" size={16} />
                             <span className="text-[#4f4f4f]">{item}</span>
                           </div>
                         );
                      })}
                    </div>
                  </div>

                  {/* Access Type & Price Section */}
                  <div className="flex justify-between items-center mt-4">
                    {deal.dealLink ? (
                       <Link href={deal.dealLink} className={`px-4 py-2 rounded-md font-medium ${
                        deal.accessType === "VIP Access" ? "bg-[#5a1700] text-white hover:bg-[#481300]" : "bg-[#e09f3e] text-[#0e2f3c] hover:bg-[#d08f2e]"
                      }`}>
                         {deal.accessType}
                       </Link>
                    ) : (
                      <span className={`px-4 py-2 rounded-md font-medium ${
                        deal.accessType === "VIP Access" ? "bg-[#5a1700] text-white" : "bg-[#e09f3e] text-[#0e2f3c]"
                      }`}>
                        {deal.accessType}
                      </span>
                    )}
                    <div className="text-right">
                      <div className="flex items-center justify-end">
                        <ShoppingCart className="text-[#0e2f3c] mr-1" size={16} />
                        <span className="text-[#0e2f3c] font-bold">{formatPrice(deal.price)}</span>
                      </div>
                      <p className="text-gray-500 text-sm">Incl. flight + Accommodation</p>
                    </div>
                  </div>

                </div> {/* End Resort Info Container (p-4) */}
              </div> // End Deal Card Div
            )) // End deals.map
          )} {/* End Ternary */}
        </div> {/* Closes the grid div */}
      </div> {/* Closes the container div */}
    </section>
  );
}
