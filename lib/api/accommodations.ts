// lib/api/accommodations.ts
import { mockAccommodations } from '@/lib/mock-data/accommodations';
import {
  Accommodation,
  FetchAccommodationsParams,
  FetchAccommodationsResponse
} from '@/types/accommodation';

const SIMULATED_DELAY_MS = 300; // Simulate network latency

/**
 * Simulates fetching a list of accommodations with filtering, sorting, and pagination.
 */
export const fetchAccommodations = async (
  params: FetchAccommodationsParams = {}
): Promise<FetchAccommodationsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...mockAccommodations]; // Start with a copy of all mock data

      // 1. Filtering
      if (params.type) {
        results = results.filter(acc => acc.type.toLowerCase() === params.type?.toLowerCase());
      }
      if (params.location) {
        // Simple location search (case-insensitive)
        results = results.filter(acc => acc.location.toLowerCase().includes(params.location?.toLowerCase() ?? ''));
      }
      if (params.minPrice !== undefined) {
        results = results.filter(acc => acc.currentPrice >= (params.minPrice ?? 0));
      }
      if (params.maxPrice !== undefined) {
        results = results.filter(acc => acc.currentPrice <= (params.maxPrice ?? Infinity));
      }
      // TODO: Add filtering by amenities if needed

      // 2. Sorting
      if (params.sortBy) {
        switch (params.sortBy) {
          case 'price-asc':
            results.sort((a, b) => a.currentPrice - b.currentPrice);
            break;
          case 'price-desc':
            results.sort((a, b) => b.currentPrice - a.currentPrice);
            break;
          case 'rating':
            results.sort((a, b) => b.rating - a.rating); // Higher rating first
            break;
          // Add more sorting options if needed
        }
      } else {
        // Default sort (e.g., by rating descending)
        results.sort((a, b) => b.rating - a.rating);
      }

      // 3. Pagination
      const page = params.page ?? 1;
      const limit = params.limit ?? 4; // Default limit to 4 cards per page
      const totalItems = results.length;
      const totalPages = Math.ceil(totalItems / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = results.slice(startIndex, endIndex);

      resolve({
        data: paginatedData,
        totalItems,
        totalPages,
        currentPage: page,
      });
    }, SIMULATED_DELAY_MS);
  });
};

/**
 * Simulates fetching a single accommodation by its ID.
 */
export const fetchAccommodationById = async (
  id: string
): Promise<Accommodation | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const accommodation = mockAccommodations.find(acc => acc.id === id) || null;
      resolve(accommodation);
    }, SIMULATED_DELAY_MS);
  });
};
