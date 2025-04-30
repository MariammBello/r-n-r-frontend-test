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

// Get base URL and mock flag from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

const SIMULATED_DELAY_MS = 300; // Simulate network latency for MOCK API ONLY

/**
 * Fetches a list of accommodations with filtering, sorting, and pagination.
 * Uses mock data or real API based on environment variable.
 */
export const fetchAccommodations = async (
  params: FetchAccommodationsParams = {}
): Promise<FetchAccommodationsResponse> => {
  if (useMockApi) {
    // --- Mock Logic ---
    console.log("Using Mock API for fetchAccommodations");
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
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    console.log("Using Real API for fetchAccommodations");
    if (!API_BASE_URL) {
      // console.error("API_BASE_URL is not defined.");
      // Return an empty response or throw an error, depending on desired handling
      return { data: [], totalItems: 0, totalPages: 0, currentPage: 1 };
    }

    // Construct query parameters
    const queryParams = new URLSearchParams();
    if (params.type) queryParams.append('type', params.type);
    if (params.location) queryParams.append('location', params.location);
    if (params.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const url = `${API_BASE_URL}/accommodations?${queryParams.toString()}`; // Assuming endpoint '/accommodations'

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`API Error (${response.status}): ${await response.text()}`);
        // Fallback or specific error handling
        return { data: [], totalItems: 0, totalPages: 0, currentPage: 1 };
      }
      const data: FetchAccommodationsResponse = await response.json(); // Assuming API returns data in the correct shape
      return data;
    } catch (error) {
      console.error("Network/Fetch Error fetching accommodations:", error);
      // Fallback or specific error handling
      return { data: [], totalItems: 0, totalPages: 0, currentPage: 1 };
    }
    // --- End Real API Logic ---
  }
};

/**
 * Fetches a single accommodation by its ID.
 * Uses mock data or real API based on environment variable.
 */
export const fetchAccommodationById = async (
  id: string
): Promise<Accommodation | null> => {
  if (useMockApi) {
    // --- Mock Logic ---
    console.log(`Using Mock API for fetchAccommodationById: ${id}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        const accommodation = mockAccommodations.find(acc => acc.id === id) || null;
        resolve(accommodation);
      }, SIMULATED_DELAY_MS);
    });
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    console.log(`Using Real API for fetchAccommodationById: ${id}`);
    if (!API_BASE_URL) {
      // console.error("API_BASE_URL is not defined.");
      return null;
    }
    const url = `${API_BASE_URL}/accommodations/${id}`; // Assuming endpoint '/accommodations/:id'
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Not found
        }
        console.error(`API Error (${response.status}): ${await response.text()}`);
        return null;
      }
      const data: Accommodation = await response.json(); // Assuming API returns a single accommodation object
      return data;
    } catch (error) {
      console.error("Network/Fetch Error fetching accommodation by ID:", error);
      return null;
    }
    // --- End Real API Logic ---
  }
};

/**
 * Fetches reviews data for a specific accommodation ID.
 * Uses mock data or real API based on environment variable.
 */
export const fetchReviewsByAccommodationId = async (
  id: string
): Promise<ReviewsData> => {
  if (useMockApi) {
    // --- Mock Logic ---
    console.log(`Using Mock API for fetchReviewsByAccommodationId: ${id}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockReviewsData); // Return the imported mock data
      }, SIMULATED_DELAY_MS);
    });
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    console.log(`Using Real API for fetchReviewsByAccommodationId: ${id}`);
     if (!API_BASE_URL) {
      // console.error("API_BASE_URL is not defined.");
      // Return default/empty structure matching ReviewsData
      return { overallRating: 0, totalReviews: 0, ratingBreakdown: [], individualReviews: [] };
    }
    const url = `${API_BASE_URL}/accommodations/${id}/reviews`; // Assuming endpoint '/accommodations/:id/reviews'
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`API Error (${response.status}): ${await response.text()}`);
        return { overallRating: 0, totalReviews: 0, ratingBreakdown: [], individualReviews: [] };
      }
      const data: ReviewsData = await response.json(); // Assuming API returns data in ReviewsData shape
      return data;
    } catch (error) {
      console.error("Network/Fetch Error fetching reviews:", error);
      return { overallRating: 0, totalReviews: 0, ratingBreakdown: [], individualReviews: [] };
    }
    // --- End Real API Logic ---
  }
};

/**
 * Fetches policies for a specific accommodation ID.
 * Uses mock data or real API based on environment variable.
 */
export const fetchPoliciesByAccommodationId = async (
  id: string
): Promise<string[]> => {
  if (useMockApi) {
    // --- Mock Logic ---
    console.log(`Using Mock API for fetchPoliciesByAccommodationId: ${id}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPolicies); // Return the imported mock data
      }, SIMULATED_DELAY_MS);
    });
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    console.log(`Using Real API for fetchPoliciesByAccommodationId: ${id}`);
    if (!API_BASE_URL) {
      // console.error("API_BASE_URL is not defined.");
      return [];
    }
    const url = `${API_BASE_URL}/accommodations/${id}/policies`; // Assuming endpoint '/accommodations/:id/policies'
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`API Error (${response.status}): ${await response.text()}`);
        return [];
      }
      const data: string[] = await response.json(); // Assuming API returns an array of strings
      return data;
    } catch (error) {
      console.error("Network/Fetch Error fetching policies:", error);
      return [];
    }
    // --- End Real API Logic ---
  }
};

/**
 * Fetches FAQs for a specific accommodation ID.
 * Uses mock data or real API based on environment variable.
 */
export const fetchFaqsByAccommodationId = async (
  id: string
): Promise<FaqItem[]> => {
  if (useMockApi) {
    // --- Mock Logic ---
    console.log(`Using Mock API for fetchFaqsByAccommodationId: ${id}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockFaqs); // Return the imported mock data
      }, SIMULATED_DELAY_MS);
    });
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    console.log(`Using Real API for fetchFaqsByAccommodationId: ${id}`);
     if (!API_BASE_URL) {
      // console.error("API_BASE_URL is not defined.");
      return [];
    }
    const url = `${API_BASE_URL}/accommodations/${id}/faqs`; // Assuming endpoint '/accommodations/:id/faqs'
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`API Error (${response.status}): ${await response.text()}`);
        return [];
      }
      const data: FaqItem[] = await response.json(); // Assuming API returns an array of FaqItem
      return data;
    } catch (error) {
      console.error("Network/Fetch Error fetching FAQs:", error);
      return [];
    }
    // --- End Real API Logic ---
  }
};

/**
 * Fetches featured destinations for the landing page.
 * Uses mock data or real API based on environment variable.
 */
export const fetchFeaturedDestinations = async (): Promise<DestinationCity[]> => {
  if (useMockApi) {
    // --- Mock Logic ---
    console.log(`Using Mock API for fetchFeaturedDestinations`);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return only the first 3 for the landing page display, as in the original component
        resolve(mockDestinations.slice(0, 3));
      }, SIMULATED_DELAY_MS);
    });
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    console.log(`Using Real API for fetchFeaturedDestinations`);
    if (!API_BASE_URL) {
      // console.error("API_BASE_URL is not defined.");
      return [];
    }
    // Assuming an endpoint like /destinations?featured=true&limit=3
    const url = `${API_BASE_URL}/destinations?featured=true&limit=3`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`API Error (${response.status}): ${await response.text()}`);
        return [];
      }
      // Assuming API returns { data: DestinationCity[] } or just DestinationCity[]
      const result = await response.json();
      const data: DestinationCity[] = Array.isArray(result) ? result : result?.data || [];
      return data;
    } catch (error) {
      console.error("Network/Fetch Error fetching featured destinations:", error);
      return [];
    }
    // --- End Real API Logic ---
  }
};

/**
 * Fetches bundle deals for the landing page.
 * Uses mock data or real API based on environment variable.
 */
export const fetchBundleDeals = async (): Promise<BundleDeal[]> => {
  if (useMockApi) {
    // --- Mock Logic ---
    console.log(`Using Mock API for fetchBundleDeals`);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return all mock deals for now, component can slice if needed
        resolve(mockBundleDeals);
      }, SIMULATED_DELAY_MS);
    });
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    console.log(`Using Real API for fetchBundleDeals`);
    if (!API_BASE_URL) {
      // console.error("API_BASE_URL is not defined.");
      return [];
    }
    // Assuming an endpoint like /deals?featured=true
    const url = `${API_BASE_URL}/deals?featured=true`; // Adjust endpoint as needed
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`API Error (${response.status}): ${await response.text()}`);
        return [];
      }
      // Assuming API returns { data: BundleDeal[] } or just BundleDeal[]
      const result = await response.json();
      const data: BundleDeal[] = Array.isArray(result) ? result : result?.data || [];
      return data;
    } catch (error) {
      console.error("Network/Fetch Error fetching bundle deals:", error);
      return [];
    }
    // --- End Real API Logic ---
  }
};
