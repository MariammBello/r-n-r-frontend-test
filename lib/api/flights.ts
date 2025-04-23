import { FlightDeal } from "@/types/flight";
import { mockAffordableFlights } from "@/lib/mock-data/flights";

const SIMULATED_DELAY_MS = 350; // Simulate network latency

/**
 * Simulates fetching affordable flight deals for the landing page.
 */
export const fetchAffordableFlights = async (): Promise<FlightDeal[]> => {
  console.log(`Simulating fetch affordable flights`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return all mock flights for now, component can slice if needed
      resolve(mockAffordableFlights);
    }, SIMULATED_DELAY_MS);
  });
};

// Add other flight-related API functions here later (e.g., searchFlights)
