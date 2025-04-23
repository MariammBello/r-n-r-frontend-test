import { RecentlyViewedItem } from "@/types/accommodation";
import { mockRecentlyViewedItems } from "@/lib/mock-data/recentlyViewed";

const SIMULATED_DELAY_MS = 400; // Simulate network latency

/**
 * Simulates fetching recently viewed items for the current user.
 * Note: Currently returns the same mock data for any user.
 * A real implementation would require user authentication context.
 */
export const fetchRecentlyViewed = async (): Promise<RecentlyViewedItem[]> => {
  console.log(`Simulating fetch recently viewed items for current user`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, filter/fetch based on user ID
      resolve(mockRecentlyViewedItems);
    }, SIMULATED_DELAY_MS);
  });
};

// Add other user-related API functions here later (e.g., fetchUserProfile)
