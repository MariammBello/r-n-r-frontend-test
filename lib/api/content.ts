import { ExperienceType, BlogPostSummary } from "@/types/accommodation"; // Add BlogPostSummary
import { mockExperienceTypes } from "@/lib/mock-data/experiences";
import { mockBlogPosts } from "@/lib/mock-data/blogPosts"; // Import mock blog data

// Get base URL and mock flag from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

const SIMULATED_DELAY_MS_CONTENT = 250; // Simulate network latency for MOCK API ONLY

/**
 * Fetches experience types for the landing page.
 * Uses mock data or real API based on environment variable.
 */
export const fetchExperienceTypes = async (): Promise<ExperienceType[]> => {
  if (useMockApi) {
    // --- Mock Logic ---
    console.log(`Using Mock API for fetchExperienceTypes`);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return only the first 3 for the landing page display, as in the original component
        resolve(mockExperienceTypes.slice(0, 3));
      }, SIMULATED_DELAY_MS_CONTENT);
    });
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    console.log(`Using Real API for fetchExperienceTypes`);
    if (!API_BASE_URL) {
      // console.error("API_BASE_URL is not defined.");
      return [];
    }
    // Assuming an endpoint like /experiences?featured=true&limit=3
    const url = `${API_BASE_URL}/experiences?featured=true&limit=3`; // Adjust endpoint as needed
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`API Error (${response.status}): ${await response.text()}`);
        return [];
      }
      // Assuming API returns { data: ExperienceType[] } or just ExperienceType[]
      const result = await response.json();
      const data: ExperienceType[] = Array.isArray(result) ? result : result?.data || [];
      return data;
    } catch (error) {
      console.error("Network/Fetch Error fetching experience types:", error);
      return [];
    }
    // --- End Real API Logic ---
  }
};

/**
 * Fetches blog post summaries for the landing page.
 * Uses mock data or real API based on environment variable.
 */
export const fetchBlogPosts = async (limit: number = 3): Promise<BlogPostSummary[]> => {
  if (useMockApi) {
    // --- Mock Logic ---
    console.log(`Using Mock API for fetchBlogPosts (limit: ${limit})`);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return the specified number of posts
        resolve(mockBlogPosts.slice(0, limit));
      }, SIMULATED_DELAY_MS_CONTENT);
    });
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    console.log(`Using Real API for fetchBlogPosts (limit: ${limit})`);
    if (!API_BASE_URL) {
      // console.error("API_BASE_URL is not defined.");
      return [];
    }
    // Assuming an endpoint like /blog/posts?limit=3
    const url = `${API_BASE_URL}/blog/posts?limit=${limit}`; // Adjust endpoint as needed
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`API Error (${response.status}): ${await response.text()}`);
        return [];
      }
      // Assuming API returns { data: BlogPostSummary[] } or just BlogPostSummary[]
      const result = await response.json();
      const data: BlogPostSummary[] = Array.isArray(result) ? result : result?.data || [];
      return data;
    } catch (error) {
      console.error("Network/Fetch Error fetching blog posts:", error);
      return [];
    }
    // --- End Real API Logic ---
  }
};


// Add other general content API functions here later
// (fetchHeroSlides function removed)
