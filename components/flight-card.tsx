import Image from "next/image"
import { ShoppingCart } from "lucide-react"

// Define the structure for a single flight leg
interface FlightLegInfo {
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  stopDetails?: string;
  from: string;
  to: string;
  airline?: string; // Optional airline name
  airlineLogo?: string; // Optional airline logo URL
}

// Define the props for the FlightCard component
interface FlightCardProps {
  isHighlighted?: boolean;
  outbound: FlightLegInfo;
  return?: FlightLegInfo; // Make return flight optional
  price: string; // Expecting pre-formatted price string now
  seatsLeft: number;
}

export default function FlightCard({
  isHighlighted = false,
  outbound,
  return: returnFlight, // Destructure 'return' prop as 'returnFlight'
  price,
  seatsLeft,
}: FlightCardProps) {

  // Helper function to render a flight leg section
  const renderFlightLeg = (leg: FlightLegInfo, isReturn: boolean = false) => (
    <div className={`p-4 ${isReturn ? '' : 'border-b border-gray-200'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="mr-3">
            {/* Use placeholder or actual logo */}
            <Image
              src={leg.airlineLogo || "/images/airline-ethiopian.png"}
              alt={leg.airline || "Airline"}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="text-[#0e2f3c] text-lg font-bold">{leg.airline || "Airline"}</h3>
          </div>
        </div>
        <div className="text-gray-500 text-sm">{seatsLeft} seats Left</div>
      </div>

      <div className="flex justify-between mb-2">
        <div>
          <p className="text-[#0e2f3c] font-bold">Economy</p>
          <p className="text-gray-500 text-sm">
            {leg.stops === 0 ? "0 stops - Direct flight" : `${leg.stops} stop${leg.stops > 1 ? 's' : ''}${leg.stopDetails ? ` - ${leg.stopDetails}` : ''}`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#0e2f3c] font-bold">
            {leg.departure} - {leg.arrival}
          </p>
          <p className="text-gray-500 text-sm">{leg.duration}</p>
        </div>
      </div>

      <div className="flex items-center">
        <p className="text-[#0e2f3c] font-medium">
          {leg.from} - {leg.to}
        </p>
        <div className="ml-auto">
          {/* Simple arrow indicator */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 16L12 7L3 16L3 14L12 5L21 14V16Z" fill={isReturn ? "#E53935" : "#4CAF50"} transform={isReturn ? "rotate(180 12 12)" : ""} />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`bg-white rounded-lg border ${
        isHighlighted ? "border-[#e09f3e] border-2" : "border-gray-200"
      } overflow-hidden flex flex-col h-full`} // Ensure card takes full height if needed
    >
      {/* Outbound Flight */}
      {renderFlightLeg(outbound, false)}

      {/* Return Flight - Conditionally render */}
      {returnFlight && renderFlightLeg(returnFlight, true)}

      {/* Price Section - Always at the bottom */}
      <div className="p-4 flex justify-center items-center mt-auto border-t border-gray-200"> {/* Ensure border-t if return flight is absent */}
        <div className="flex items-center">
          <ShoppingCart className="text-[#0e2f3c] mr-2" size={20} />
          <div className="text-center">
            <p className="text-[#0e2f3c] text-xl font-bold">{price}</p>
            <p className="text-gray-500 text-sm">{returnFlight ? "Round trip" : "One way"} per traveler</p>
          </div>
        </div>
      </div>
    </div>
  );
}
