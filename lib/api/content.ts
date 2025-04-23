import { ExperienceType, BlogPostSummary } from "@/types/accommodation"; // Add BlogPostSummary
import { mockExperienceTypes } from "@/lib/mock-data/experiences";
import { mockBlogPosts } from "@/lib/mock-data/blogPosts"; // Import mock blog data

const SIMULATED_DELAY_MS_CONTENT = 250;

/**
 * Simulates fetching experience types for the landing page.
 */
export const fetchExperienceTypes = async (): Promise<ExperienceType[]> => {
  console.log(`Simulating fetch experience types`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return only the first 3 for the landing page display, as in the original component
      resolve(mockExperienceTypes.slice(0, 3));
    }, SIMULATED_DELAY_MS_CONTENT);
  });
};

/**
 * Simulates fetching blog post summaries for the landing page.
 */
export const fetchBlogPosts = async (limit: number = 3): Promise<BlogPostSummary[]> => {
  console.log(`Simulating fetch blog posts (limit: ${limit})`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return the specified number of posts
      resolve(mockBlogPosts.slice(0, limit));
    }, SIMULATED_DELAY_MS_CONTENT);
  });
};


// Add other general content API functions here later
// (fetchHeroSlides function removed)
