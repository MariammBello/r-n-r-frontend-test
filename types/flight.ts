// types/flight.ts

export interface FlightLeg {
  departure: string; // Time string (e.g., "9:10am")
  arrival: string; // Time string (e.g., "9:40pm")
  duration: string; // Duration string (e.g., "12hrs 30mins")
  stops: number; // Number of stops
  stopDetails?: string; // Optional details about layovers
  from: string; // Departure location (e.g., "Ethiopia (ETH)")
  to: string; // Arrival location (e.g., "Lagos (LOS)")
  airline?: string; // Optional airline name
  airlineLogo?: string; // Optional airline logo URL
}

export interface FlightDeal {
  id: string | number;
  isHighlighted?: boolean; // Optional flag for highlighting the card
  outbound: FlightLeg;
  return?: FlightLeg; // Optional for one-way flights
  price: number; // Numeric price
  priceFormatted?: string; // Optional pre-formatted price string
  seatsLeft?: number; // Optional number of seats left
  flightLink?: string; // Optional link to booking/details page
}
