import { RecentlyViewedItem } from "@/types/accommodation";
import { mockRecentlyViewedItems } from "@/lib/mock-data/recentlyViewed";

// Get base URL and mock flag from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

const SIMULATED_DELAY_MS = 400; // Simulate network latency for MOCK API ONLY

/**
 * Fetches recently viewed items for the current user.
 * Uses mock data or real API based on environment variable.
 * Note: Real API implementation assumes authentication context is handled (e.g., via cookies/headers).
 */
export const fetchRecentlyViewed = async (): Promise<RecentlyViewedItem[]> => {
  if (useMockApi) {
    // --- Mock Logic ---
    console.log(`Using Mock API for fetchRecentlyViewed`);
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, filter/fetch based on user ID
        resolve(mockRecentlyViewedItems);
      }, SIMULATED_DELAY_MS);
    });
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    console.log(`Using Real API for fetchRecentlyViewed`);
    if (!API_BASE_URL) {
      // console.error("API_BASE_URL is not defined.");
      return [];
    }
    // Assuming an endpoint like /users/me/recently-viewed or similar
    // The backend needs to identify the user based on the request (e.g., auth token)
    const url = `${API_BASE_URL}/users/me/recently-viewed`; // Adjust endpoint as needed
    try {
      const response = await fetch(url, {
        // Include credentials if your API relies on cookies for auth
        // credentials: 'include',
        // Or include Authorization header if using tokens
        // headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!response.ok) {
        console.error(`API Error (${response.status}): ${await response.text()}`);
        return [];
      }
      // Assuming API returns { data: RecentlyViewedItem[] } or just RecentlyViewedItem[]
      const result = await response.json();
      const data: RecentlyViewedItem[] = Array.isArray(result) ? result : result?.data || [];
      return data;
    } catch (error) {
      console.error("Network/Fetch Error fetching recently viewed items:", error);
      return [];
    }
    // --- End Real API Logic ---
  }
};

// Add other user-related API functions here later (e.g., fetchUserProfile)
