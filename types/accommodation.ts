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

// Type for the accommodation categories/types shown on the landing page
export interface AccommodationType {
  id: number | string; // Unique identifier for the type
  name: string; // Display name (e.g., "Apartments")
  image: string; // URL for the representative image
  link: string; // Link to the page showing accommodations of this type
}

// --- Review Types ---

export interface ReviewBreakdown {
  category: string;
  score: number;
}

export interface IndividualReview {
  name: string;
  location: string;
  rating: number; // Assuming this is out of 10 based on mock data
  scoreType: string; // e.g., "Excellent", "Average"
  date: string; // Consider using Date type if parsing/formatting needed later
  text: string;
  avatar: string; // URL for avatar image
}

export interface ReviewsData {
  overallRating: number; // Overall average rating
  totalReviews: number; // Total number of reviews counted
  ratingBreakdown: ReviewBreakdown[];
  individualReviews: IndividualReview[];
}

// --- FAQ Type ---

export interface FaqItem {
  q: string; // Question
  a: string; // Answer
}

// --- Destination Type ---

export interface DestinationCity {
  id: string | number; // Unique ID for the city
  name: string;
  image: string; // URL for the representative image
  description: string;
  slug: string; // URL-friendly identifier (e.g., "lagos", "port-harcourt")
}

// --- Bundle Deal Type ---

export interface BundleDeal {
  id: string | number;
  name: string; // Name of the resort/deal
  location: string;
  rating: number; // Star rating (e.g., 5)
  reviews: number; // Number of reviews
  image: string; // URL for the main image
  price: number; // Numeric price
  priceFormatted?: string; // Optional pre-formatted price string if needed
  includes: string[]; // Array of included items (e.g., "Breakfast")
  accessType: 'General Access' | 'VIP Access' | string; // Type of access or package tier
  dealLink?: string; // Optional link to the specific deal page
}

// --- Recently Viewed Item Type ---

export interface RecentlyViewedItem {
  id: string | number;
  type: 'accommodation' | 'flight' | 'bundle' | string; // Type of item viewed
  title: string; // Main title (e.g., property name, airline, "Bundle Deal")
  location?: string; // For accommodation
  route?: string; // For flight (e.g., "ETH - LOS")
  image: string; // URL for thumbnail image
  dates?: { // Optional dates viewed
    from: string; // Formatted date string
    to: string; // Formatted date string
  };
  travelers?: number; // Optional number of travelers
  roundtrip?: boolean; // Optional for flights
  itemLink: string; // Link to the item's detail page
}

// --- Experience Type ---

export interface ExperienceType {
  id: string | number;
  name: string; // e.g., "Events", "Attractions"
  image: string; // URL for representative image
  link: string; // Link to the specific experience category page
}

// --- Blog Post Summary Type ---

export interface BlogPostSummary {
  id: string | number;
  title: string;
  image: string; // URL for the featured image
  excerpt: string;
  link: string; // Link to the full blog post
  slug?: string; // Optional slug if link is constructed differently
}
