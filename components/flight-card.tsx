import Image from "next/image"
import { ShoppingCart } from "lucide-react"

interface FlightCardProps {
  isHighlighted?: boolean
  outbound: {
    departure: string
    arrival: string
    duration: string
    stops: number
    stopDetails?: string
    from: string
    to: string
  }
  return: {
    departure: string
    arrival: string
    duration: string
    stops: number
    stopDetails?: string
    from: string
    to: string
  }
  price: string
  seatsLeft: number
}

export default function FlightCard({
  isHighlighted = false,
  outbound,
  return: returnFlight,
  price,
  seatsLeft,
}: FlightCardProps) {
  return (
    <div
      className={`bg-white rounded-lg border ${
        isHighlighted ? "border-[#e09f3e] border-2" : "border-gray-200"
      } overflow-hidden`}
    >
      {/* Outbound Flight */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="mr-3">
              <Image
                src="/images/airline-ethiopian.png" // Updated path
                alt="Ethiopian Airlines"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-[#0e2f3c] text-lg font-bold">Ethiopian Airlines</h3>
            </div>
          </div>
          <div className="text-gray-500 text-sm">{seatsLeft} seats Left</div>
        </div>

        <div className="flex justify-between mb-2">
          <div>
            <p className="text-[#0e2f3c] font-bold">Economy</p>
            <p className="text-gray-500">
              {outbound.stops === 0 ? "0 stops - Direct flight" : `${outbound.stops} stop - ${outbound.stopDetails}`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#0e2f3c] font-bold">
              {outbound.departure} - {outbound.arrival}
            </p>
            <p className="text-gray-500">{outbound.duration}</p>
          </div>
        </div>

        <div className="flex items-center">
          <p className="text-[#0e2f3c] font-medium">
            {outbound.from} - {outbound.to}
          </p>
          <div className="ml-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16L12 7L3 16L3 14L12 5L21 14V16Z" fill="#4CAF50" />
            </svg>
          </div>
        </div>
      </div>

      {/* Return Flight */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="mr-3">
              <Image
                src="/images/airline-ethiopian.png" // Updated path
                alt="Ethiopian Airlines"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-[#0e2f3c] text-lg font-bold">Ethiopian Airlines</h3>
            </div>
          </div>
          <div className="text-gray-500 text-sm">{seatsLeft} seats Left</div>
        </div>

        <div className="flex justify-between mb-2">
          <div>
            <p className="text-[#0e2f3c] font-bold">Economy</p>
            <p className="text-gray-500">
              {returnFlight.stops === 0
                ? "0 stops - Direct flight"
                : `${returnFlight.stops} stop - ${returnFlight.stopDetails}`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#0e2f3c] font-bold">
              {returnFlight.departure} - {returnFlight.arrival}
            </p>
            <p className="text-gray-500">{returnFlight.duration}</p>
          </div>
        </div>

        <div className="flex items-center">
          <p className="text-[#0e2f3c] font-medium">
            {returnFlight.from} - {returnFlight.to}
          </p>
          <div className="ml-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16L12 7L3 16L3 14L12 5L21 14V16Z" fill="#E53935" transform="rotate(180 12 12)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="p-4 flex justify-center items-center">
        <div className="flex items-center">
          <ShoppingCart className="text-[#0e2f3c] mr-2" size={20} />
          <div className="text-center">
            <p className="text-[#0e2f3c] text-xl font-bold">{price}</p>
            <p className="text-gray-500 text-sm">Round trip per traveler</p>
          </div>
        </div>
      </div>
    </div>
  )
}
