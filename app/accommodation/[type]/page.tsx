import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"
import Image from "next/image"

// Define valid accommodation types
const validTypes = ["apartments", "duplexes", "mansions", "villas"]

// Define images and descriptions for each type
const accommodationDetails: Record<string, { title: string; description: string; image: string }> = {
  apartments: {
    title: "Apartments",
    description: "Discover comfortable and convenient apartments for your stay.",
    image: "/placeholder.svg?height=300&width=600",
  },
  duplexes: {
    title: "Duplexes",
    description: "Explore spacious duplexes perfect for families and groups.",
    image: "/placeholder.svg?height=300&width=600",
  },
  mansions: {
    title: "Mansions",
    description: "Experience luxury living in our exclusive mansion properties.",
    image: "/placeholder.svg?height=300&width=600",
  },
  villas: {
    title: "Villas",
    description: "Relax in private villas with premium amenities and services.",
    image: "/placeholder.svg?height=300&width=600",
  },
}

export default function AccommodationTypePage({ params }: { params: { type: string } }) {
  const type = params.type.toLowerCase()

  // Check if the accommodation type is valid
  if (!validTypes.includes(type)) {
    notFound()
  }

  const details = accommodationDetails[type]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">{details.title}</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">{details.description}</p>
        </section>

        {/* Preview Image */}
        <section className="mb-12">
          <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
            <Image src={details.image || "/placeholder.svg"} alt={details.title} fill className="object-cover" />
          </div>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title={`${details.title} Listings`}
          description={`We're currently curating the best ${type} for your stay. Soon you'll be able to browse, filter, and book these accommodations across various destinations.`}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
