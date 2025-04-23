import { BlogPostSummary } from "@/types/accommodation"; // Assuming type is here for now

// Mock data for blog post summaries shown on the landing page
export const mockBlogPosts: BlogPostSummary[] = [
 {
    id: "blog-cuisine-dec",
    title: "Top 10 cuisines to try this detty December",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog1-rYt3P.png",
    excerpt:
      "From spicy suya to flavorful jollof rice, discover the must-try dishes that define Nigeria's festive season.",
    link: "/blog/top-10-cuisines-december",
    slug: "top-10-cuisines-december",
  },
  {
    id: "blog-kano-gems",
    title: "You never knew this existed in Kano State",
    image: "/images/placeholder.jpg", // Replace with actual image later
    excerpt:
      "Uncover hidden historical sites, breathtaking landscapes, and unique cultural experiences in Nigeria's ancient city.",
    link: "/blog/kano-state-hidden-gems",
    slug: "kano-state-hidden-gems",
  },
  {
    id: "blog-live-bands",
    title: "All the live band hotspots you should know",
    image: "/images/placeholder.jpg", // Replace with actual image later
    excerpt:
      "Find the best venues across major cities to enjoy electrifying live music performances and vibrant nightlife.",
    link: "/blog/live-band-hotspots",
    slug: "live-band-hotspots",
  },
  {
    id: "blog-lagos-beaches",
    title: "Best beaches to visit in Lagos",
    image: "/images/placeholder.jpg", // Replace with actual image later
    excerpt:
      "Relax and unwind at Lagos's most beautiful beaches, offering everything from serene escapes to lively shores.",
    link: "/blog/lagos-beaches",
    slug: "lagos-beaches",
  },
  // Add more posts if needed
];
