import { ChevronRight } from "lucide-react"
import FlightCard from "./flight-card"
import Link from "next/link"

export default function AffordableFlightsSection() {
  // Sample flight data
  const flights = [
    {
      id: 1,
      isHighlighted: false,
      outbound: {
        departure: "9:10am",
        arrival: "9:40pm",
        duration: "12hrs 30mins",
        stops: 0,
        from: "Ethiopia (ETH)",
        to: "Lagos (LOS)",
      },
      return: {
        departure: "9:10pm",
        arrival: "3:10pm",
        duration: "18hrs",
        stops: 1,
        stopDetails: "Layover in Accra",
        from: "Lagos (LOS)",
        to: "Ethiopia (ETH)",
      },
      price: "₦1,250,000.00",
      seatsLeft: 10,
    },
    {
      id: 2,
      isHighlighted: true,
      outbound: {
        departure: "9:10am",
        arrival: "9:40pm",
        duration: "12hrs 30mins",
        stops: 0,
        from: "Ethiopia (ETH)",
        to: "Lagos (LOS)",
      },
      return: {
        departure: "9:10pm",
        arrival: "3:10pm",
        duration: "18hrs",
        stops: 1,
        stopDetails: "Layover in Accra",
        from: "Lagos (LOS)",
        to: "Ethiopia (ETH)",
      },
      price: "₦1,250,000.00",
      seatsLeft: 10,
    },
    {
      id: 3,
      isHighlighted: false,
      outbound: {
        departure: "9:10am",
        arrival: "9:40pm",
        duration: "12hrs 30mins",
        stops: 0,
        from: "Ethiopia (ETH)",
        to: "Lagos (LOS)",
      },
      return: {
        departure: "9:10pm",
        arrival: "3:10pm",
        duration: "18hrs",
        stops: 1,
        stopDetails: "Layover in Accra",
        from: "Lagos (LOS)",
        to: "Ethiopia (ETH)",
      },
      price: "₦1,250,000.00",
      seatsLeft: 10,
    },
  ]

  return (
    <section className="w-full my-[72px]">
      <div className="w-full mx-auto px-[60px]">
        <h2 className="text-[#0e2f3c] text-5xl font-bold mb-8">
          Affordable Flights to Nigeria
        </h2>

        {/* Flight cards carousel */}
        <div className="relative mb-6">
          <div className="flex space-x-6 overflow-hidden">
            {flights.map((flight) => (
              <div key={flight.id} className="flex-none w-[calc(33.333%-16px)]">
                <FlightCard
                  isHighlighted={flight.isHighlighted}
                  outbound={flight.outbound}
                  return={flight.return}
                  price={flight.price}
                  seatsLeft={flight.seatsLeft}
                />
              </div>
            ))}
          </div>

          {/* Navigation arrow */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md z-10">
            <ChevronRight className="text-[#0e2f3c]" size={24} />
          </button>
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
