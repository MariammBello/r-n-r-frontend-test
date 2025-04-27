import { FlightDeal } from "@/types/flight";
import { mockAffordableFlights } from "@/lib/mock-data/flights";

// Get base URL and mock flag from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

const SIMULATED_DELAY_MS = 350; // Simulate network latency for MOCK API ONLY

/**
 * Fetches affordable flight deals for the landing page.
 * Uses mock data or real API based on environment variable.
 */
export const fetchAffordableFlights = async (): Promise<FlightDeal[]> => {
  if (useMockApi) {
    // --- Mock Logic ---
    console.log(`Using Mock API for fetchAffordableFlights`);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return all mock flights for now, component can slice if needed
        resolve(mockAffordableFlights);
      }, SIMULATED_DELAY_MS);
    });
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    console.log(`Using Real API for fetchAffordableFlights`);
    if (!API_BASE_URL) {
      console.error("API_BASE_URL is not defined.");
      return [];
    }
    // Assuming an endpoint like /flights?affordable=true or /flights/deals
    const url = `${API_BASE_URL}/flights?affordable=true`; // Adjust endpoint as needed
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`API Error (${response.status}): ${await response.text()}`);
        return [];
      }
      // Assuming API returns { data: FlightDeal[] } or just FlightDeal[]
      const result = await response.json();
      const data: FlightDeal[] = Array.isArray(result) ? result : result?.data || [];
      return data;
    } catch (error) {
      console.error("Network/Fetch Error fetching affordable flights:", error);
      return [];
    }
    // --- End Real API Logic ---
  }
};

// Add other flight-related API functions here later (e.g., searchFlights)
