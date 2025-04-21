// types/accommodation.ts

export interface Host {
  name: string;
  title: string;
  avatar: string;
  isVerified: boolean;
}

export interface Feature {
  text: string;
  icon?: string; // Optional icon identifier if needed later
}

export interface Accommodation {
  id: string; // Unique identifier for the accommodation
  type: 'apartment' | 'duplex' | 'mansion' | 'villa' | 'resort' | 'bungalow'; // Added more types
  propertyName: string;
  location: string; // Could be more structured later (e.g., { city: string, state: string })
  images: string[]; // Array of image URLs
  host: Host;
  rating: number; // e.g., 1-5
  reviews: number; // Number of reviews
  features: Feature[];
  discount?: number; // Optional discount percentage (e.g., 30 for 30%)
  originalPrice?: number; // Optional original price before discount
  currentPrice: number; // The price to display/charge
  priceType: 'Regular' | 'Premium' | 'Deal'; // Example price types
  availability?: { // Optional detailed availability
    startDate: string; // ISO date string
    endDate: string; // ISO date string
  };
  description?: string; // Detailed description for the detail page
  amenities?: string[]; // List of amenities for the detail page
}

// Type for the response of the (mock) API fetching multiple accommodations
export interface FetchAccommodationsResponse {
  data: Accommodation[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

// Type for the parameters passed to the fetch function
export interface FetchAccommodationsParams {
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  sortBy?: string; // e.g., 'price-asc', 'price-desc', 'rating'
  page?: number;
  limit?: number;
}
