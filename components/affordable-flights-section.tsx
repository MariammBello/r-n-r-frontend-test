"use client"; // Add "use client" for hooks

import { ChevronRight } from "lucide-react";
import FlightCard from "./flight-card"; // Assuming FlightCardProps are defined within this component
import Link from "next/link";
import { useState, useEffect } from "react"; // Import hooks
import { FlightDeal } from "@/types/flight"; // Import type
import { fetchAffordableFlights } from "@/lib/api/flights"; // Import API function
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

// Helper to format price (consider moving to utils.ts if used elsewhere)
const formatPrice = (price: number) => {
  return `₦${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function AffordableFlightsSection() {
  const [flights, setFlights] = useState<FlightDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFlights = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAffordableFlights();
        setFlights(data);
      } catch (error) {
        console.error("Failed to fetch affordable flights:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFlights();
  }, []);

  // TODO: Implement carousel logic if needed

  return (
    <section className="w-full my-[72px]">
      <div className="w-full mx-auto px-[60px]">
        <h2 className="text-[#0e2f3c] text-5xl font-bold mb-8">
          Affordable Flights to Nigeria
        </h2>

        {/* Flight cards carousel */}
        <div className="relative mb-6">
          {/* TODO: Replace with actual carousel component if needed */}
          <div className="flex space-x-6 overflow-x-auto pb-4"> {/* Allow horizontal scroll */}
            {isLoading ? (
              // Skeletons
              [...Array(3)].map((_, index) => (
                <div key={index} className="flex-none w-[calc(33.333%-16px)]">
                  {/* Use a skeleton similar to FlightCard structure */}
                  <Skeleton className="h-[280px] w-full rounded-lg" />
                </div>
              ))
            ) : (
              // Actual Flight Cards
              flights.map((flight) => (
              // Wrap card in Link if flightLink exists
              <Link key={flight.id} href={flight.flightLink || '#'} className="flex-none w-[calc(33.333%-16px)] block group">
                <FlightCard
                  isHighlighted={flight.isHighlighted}
                  outbound={flight.outbound}
                  return={flight.return} // Correct prop name to 'return'
                  price={formatPrice(flight.price)} // Format price
                  seatsLeft={flight.seatsLeft ?? 0} // Provide default value if undefined
                  // Pass other necessary props if FlightCard expects them
                />
              </Link>
            )) // End flights.map
          )} {/* End Ternary */}
          </div>

          {/* Navigation arrow (placeholder for carousel) */}
          {/* TODO: Implement carousel controls */}
           {!isLoading && flights.length > 3 && ( // Only show if not loading and enough items
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md z-10 hover:bg-gray-100 transition-colors">
              <ChevronRight className="text-[#0e2f3c]" size={24} />
            </button>
          )}
        </div>

        {/* Footer bar */}
        <div className="w-full flex justify-between items-center bg-[#0e2f3c] rounded-md">
          <Link
            href="/flights"
            className="text-white font-medium py-4 px-8 hover:bg-[#0a2530] transition-colors rounded-l-md"
          >
            See all flights
          </Link>
          <span className="text-white text-sm pr-8">
            Terms & Conditions Apply
          </span>
        </div>
      </div>
    </section>
  );
}
