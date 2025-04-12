import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "Top 10 cuisines to try this detty December",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog1-rYt3P.png",
    excerpt:
      "Explore the best accommodations, relish in the rich cultural diversity and taste the flavours of Nigeria's biggest tourism hub. Ekaabo!",
    link: "/blog/top-10-cuisines-december",
  },
  {
    id: 2,
    title: "You never knew this existed in Kano State",
    image: "/images/placeholder.jpg", // Updated path
    excerpt:
      "Explore the best accommodations, relish in the rich cultural diversity and taste the flavours of Nigeria's biggest tourism hub. Ekaabo!",
    link: "/blog/kano-state-hidden-gems",
  },
  {
    id: 3,
    title: "All the live band hotspots you should know",
    image: "/images/placeholder.jpg", // Updated path
    excerpt:
      "Explore the best accommodations, relish in the rich cultural diversity and taste the flavours of Nigeria's biggest tourism hub. Ekaabo!",
    link: "/blog/live-band-hotspots",
  },
  {
    id: 4,
    title: "Best beaches to visit in Lagos",
    image: "/images/placeholder.jpg", // Updated path
    excerpt:
      "Explore the best accommodations, relish in the rich cultural diversity and taste the flavours of Nigeria's biggest tourism hub. Ekaabo!",
    link: "/blog/lagos-beaches",
  },
]

export default function RootsBlogSection() {
  return (
    <section className="w-full my-[72px]">
      <div className="w-[1440px] mx-auto px-[60px]">
        {/* Blog header */}
        <div className="mb-6">
          <h2 className="text-[#0e2f3c] text-4xl font-bold mb-2">The Roots Blog</h2>
          <p className="text-[#4f4f4f] text-lg">
            Learn more about Africa, her rich cultural diversity and all her popular vacation hot spots
          </p>
        </div>

        {/* Blog posts carousel */}
        <div className="relative">
          <div className="flex space-x-6 overflow-hidden">
            {blogPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="flex-none w-[calc(33.333%-16px)] bg-white rounded-lg overflow-hidden shadow-sm"
              >
                {/* Blog post image */}
                <div className="relative h-[180px] w-full">
                  <Image src={post.image || "/images/placeholder.jpg"} alt={post.title} fill className="object-cover" /> {/* Updated fallback path */}
                </div>

                {/* Blog post content */}
                <div className="p-6">
                  <h3 className="text-[#0e2f3c] text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-[#4f4f4f] mb-6">{post.excerpt}</p>
                  <Link
                    href={post.link}
                    className="block w-full py-4 bg-[#0e2f3c] text-white text-center rounded-md font-medium hover:bg-[#0a2530] transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrow */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md z-10">
            <ChevronRight className="text-[#0e2f3c]" size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}
