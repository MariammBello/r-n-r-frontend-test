import { FlightDeal } from "@/types/flight";

// Mock data for affordable flights section
export const mockAffordableFlights: FlightDeal[] = [
  {
    id: "eth-los-1",
    isHighlighted: false,
    outbound: {
      departure: "9:10am",
      arrival: "9:40pm",
      duration: "12hrs 30mins",
      stops: 0,
      from: "Ethiopia (ETH)",
      to: "Lagos (LOS)",
      airline: "Ethiopian Airlines", // Added airline info
      airlineLogo: "/images/airline-ethiopian.png"
    },
    return: {
      departure: "9:10pm",
      arrival: "3:10pm",
      duration: "18hrs",
      stops: 1,
      stopDetails: "Layover in Accra",
      from: "Lagos (LOS)",
      to: "Ethiopia (ETH)",
      airline: "Ethiopian Airlines",
      airlineLogo: "/images/airline-ethiopian.png"
    },
    price: 1250000.00, // Numeric price
    seatsLeft: 10,
    flightLink: "/flights/eth-los-1", // Example link
  },
  {
    id: "eth-los-2",
    isHighlighted: true, // Highlighted deal
    outbound: {
      departure: "10:00am", // Different time
      arrival: "10:30pm",
      duration: "12hrs 30mins",
      stops: 0,
      from: "Ethiopia (ETH)",
      to: "Lagos (LOS)",
      airline: "Ethiopian Airlines",
      airlineLogo: "/images/airline-ethiopian.png"
    },
    return: {
      departure: "10:00pm", // Different time
      arrival: "4:00pm",
      duration: "18hrs",
      stops: 1,
      stopDetails: "Layover in Accra",
      from: "Lagos (LOS)",
      to: "Ethiopia (ETH)",
      airline: "Ethiopian Airlines",
      airlineLogo: "/images/airline-ethiopian.png"
    },
    price: 1200000.00, // Slightly cheaper
    seatsLeft: 5, // Fewer seats
    flightLink: "/flights/eth-los-2",
  },
  {
    id: "eth-los-3",
    isHighlighted: false,
    outbound: {
      departure: "8:30am", // Different time
      arrival: "9:00pm",
      duration: "12hrs 30mins",
      stops: 0,
      from: "Ethiopia (ETH)",
      to: "Lagos (LOS)",
      airline: "Ethiopian Airlines",
      airlineLogo: "/images/airline-ethiopian.png"
    },
    return: {
      departure: "8:30pm", // Different time
      arrival: "2:30pm",
      duration: "18hrs",
      stops: 1,
      stopDetails: "Layover in Accra",
      from: "Lagos (LOS)",
      to: "Ethiopia (ETH)",
      airline: "Ethiopian Airlines",
      airlineLogo: "/images/airline-ethiopian.png"
    },
    price: 1300000.00, // More expensive
    seatsLeft: 15,
    flightLink: "/flights/eth-los-3",
  },
];
