import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"
import Image from "next/image"
import { Calendar, User } from "lucide-react"

// Define valid blog post slugs
const validSlugs = ["top-10-cuisines-december", "kano-state-hidden-gems", "live-band-hotspots", "lagos-beaches"]

// Define details for each blog post
const blogPostDetails: Record<string, { title: string; excerpt: string; image: string; author: string; date: string }> =
  {
    "top-10-cuisines-december": {
      title: "Top 10 cuisines to try this detty December",
      excerpt:
        "Explore the best accommodations, relish in the rich cultural diversity and taste the flavours of Nigeria's biggest tourism hub. Ekaabo!",
      image: "/placeholder.svg?height=400&width=800",
      author: "Chioma Okonkwo",
      date: "December 1, 2024",
    },
    "kano-state-hidden-gems": {
      title: "You never knew this existed in Kano State",
      excerpt:
        "Discover hidden treasures and lesser-known attractions in one of Nigeria's most historic states. From ancient architecture to vibrant markets, Kano has more to offer than meets the eye.",
      image: "/placeholder.svg?height=400&width=800",
      author: "Ibrahim Hassan",
      date: "November 15, 2024",
    },
    "live-band-hotspots": {
      title: "All the live band hotspots you should know",
      excerpt:
        "From Lagos to Abuja, we've compiled the ultimate list of venues featuring the best live music experiences in Nigeria. Perfect for music lovers and nightlife enthusiasts.",
      image: "/placeholder.svg?height=400&width=800",
      author: "Tunde Adebayo",
      date: "November 5, 2024",
    },
    "lagos-beaches": {
      title: "Best beaches to visit in Lagos",
      excerpt:
        "Escape the hustle and bustle of Lagos city life with our guide to the most beautiful and serene beaches. Whether you're looking for water sports or relaxation, we've got you covered.",
      image: "/placeholder.svg?height=400&width=800",
      author: "Amara Okafor",
      date: "October 22, 2024",
    },
  }

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug.toLowerCase()

  // Check if the blog post slug is valid
  if (!validSlugs.includes(slug)) {
    notFound()
  }

  const post = blogPostDetails[slug]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">{post.title}</h1>
          <div className="flex items-center text-[#4f4f4f] mb-6">
            <div className="flex items-center mr-6">
              <User size={16} className="mr-2" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{post.date}</span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="mb-8">
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
        </section>

        {/* Excerpt */}
        <section className="mb-12">
          <p className="text-xl text-[#4f4f4f] max-w-3xl border-l-4 border-[#e09f3e] pl-4 py-2">{post.excerpt}</p>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="Blog Post Coming Soon"
          description="We're crafting this article with care to provide you with valuable insights and information. Check back soon to read the full story."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
