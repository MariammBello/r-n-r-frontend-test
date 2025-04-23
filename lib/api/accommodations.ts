// lib/api/accommodations.ts
import { mockAccommodations } from '@/lib/mock-data/accommodations';
import {
  Accommodation,
  FetchAccommodationsParams,
  FetchAccommodationsResponse,
  ReviewsData,
  FaqItem,
  DestinationCity,
  BundleDeal // Import BundleDeal type
} from '@/types/accommodation';
import { mockReviewsData } from '@/lib/mock-data/reviews';
import { mockPolicies } from '@/lib/mock-data/policies';
import { mockFaqs } from '@/lib/mock-data/faqs';
import { mockDestinations } from '@/lib/mock-data/destinations';
import { mockBundleDeals } from '@/lib/mock-data/bundleDeals'; // Import mock bundle deal data

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

/**
 * Simulates fetching reviews data for a specific accommodation ID.
 * Note: Currently returns the same mock data regardless of ID.
 */
export const fetchReviewsByAccommodationId = async (
  id: string
): Promise<ReviewsData> => {
  console.log(`Simulating fetch reviews for ID: ${id}`); // Log which ID is requested
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReviewsData); // Return the imported mock data
    }, SIMULATED_DELAY_MS);
  });
};

/**
 * Simulates fetching policies for a specific accommodation ID.
 * Note: Currently returns the same mock data regardless of ID.
 */
export const fetchPoliciesByAccommodationId = async (
  id: string
): Promise<string[]> => {
   console.log(`Simulating fetch policies for ID: ${id}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPolicies); // Return the imported mock data
    }, SIMULATED_DELAY_MS);
  });
};

/**
 * Simulates fetching FAQs for a specific accommodation ID.
 * Note: Currently returns the same mock data regardless of ID.
 */
export const fetchFaqsByAccommodationId = async (
  id: string
): Promise<FaqItem[]> => {
   console.log(`Simulating fetch FAQs for ID: ${id}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFaqs); // Return the imported mock data
    }, SIMULATED_DELAY_MS);
  });
};

/**
 * Simulates fetching featured destinations for the landing page.
 */
export const fetchFeaturedDestinations = async (): Promise<DestinationCity[]> => {
  console.log(`Simulating fetch featured destinations`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return only the first 3 for the landing page display, as in the original component
      resolve(mockDestinations.slice(0, 3));
    }, SIMULATED_DELAY_MS);
  });
};

/**
 * Simulates fetching bundle deals for the landing page.
 */
export const fetchBundleDeals = async (): Promise<BundleDeal[]> => {
  console.log(`Simulating fetch bundle deals`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return all mock deals for now, component can slice if needed
      resolve(mockBundleDeals);
    }, SIMULATED_DELAY_MS);
  });
};
