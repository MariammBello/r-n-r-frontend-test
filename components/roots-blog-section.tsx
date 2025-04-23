"use client"; // Add "use client" for hooks

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"; // Import hooks
import { BlogPostSummary } from "@/types/accommodation"; // Import type (assuming it's in accommodation.ts)
import { fetchBlogPosts } from "@/lib/api/content"; // Import API function
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

export default function RootsBlogSection() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        // Fetch the first 3 posts for the landing page display
        const data = await fetchBlogPosts(3);
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  // TODO: Implement carousel logic if needed

  return (
    <section className="w-full my-[72px]">
      <div className="w-full mx-auto px-[60px]">
        {/* Blog header */}
        <div className="mb-6">
          <h2 className="text-[#0e2f3c] text-4xl font-bold mb-2">The Roots Blog</h2>
          <p className="text-[#4f4f4f] text-lg">
            Learn more about Africa, her rich cultural diversity and all her popular vacation hot spots
          </p>
        </div>

        {/* Blog posts carousel */}
        <div className="relative">
           {/* TODO: Replace with actual carousel component if needed */}
          <div className="flex space-x-6 overflow-x-auto pb-4"> {/* Allow horizontal scroll */}
            {isLoading ? (
              // Skeletons
              [...Array(3)].map((_, index) => (
                <div key={index} className="flex-none w-[calc(33.333%-16px)] bg-white rounded-lg overflow-hidden shadow-sm">
                  <Skeleton className="h-[180px] w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-11 w-full mt-2" />
                  </div>
                </div>
              ))
            ) : (
              // Actual Blog Posts
              posts.map((post) => (
              <div
                key={post.id}
                className="flex-none w-[calc(33.333%-16px)] bg-white rounded-lg overflow-hidden shadow-sm"
              >
                {/* Blog post image */}
                <div className="relative h-[180px] w-full">
                  <Image
                    src={post.image || "/images/placeholder.jpg"} // Use placeholder
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes
                  />
                </div>

                {/* Blog post content */}
                <div className="p-6">
                  <h3 className="text-[#0e2f3c] text-xl font-bold mb-2 line-clamp-2">{post.title}</h3> {/* Added line-clamp */}
                  <p className="text-[#4f4f4f] mb-6 line-clamp-3">{post.excerpt}</p> {/* Added line-clamp */}
                  <Link
                    href={post.link}
                    className="block w-full py-4 bg-[#0e2f3c] text-white text-center rounded-md font-medium hover:bg-[#0a2530] transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            )) // End posts.map
          )} {/* End Ternary */}
          </div>

          {/* Navigation arrow (placeholder for carousel) */}
           {/* TODO: Implement carousel controls */}
           {!isLoading && posts.length > 3 && ( // Only show if not loading and enough items (though API currently limits to 3)
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md z-10 hover:bg-gray-100 transition-colors">
              <ChevronRight className="text-[#0e2f3c]" size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
