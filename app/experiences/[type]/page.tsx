import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"
import Image from "next/image"

// Define valid experience types
const validTypes = ["events", "attractions", "restaurants", "tours"]

// Define images and descriptions for each type
const experienceDetails: Record<string, { title: string; description: string; image: string }> = {
  events: {
    title: "Events",
    description: "Discover cultural festivals, concerts, and special events across Africa.",
    image: "/placeholder.svg?height=300&width=600",
  },
  attractions: {
    title: "Attractions",
    description: "Explore must-see landmarks, natural wonders, and cultural sites.",
    image: "/placeholder.svg?height=300&width=600",
  },
  restaurants: {
    title: "Restaurants",
    description: "Taste authentic African cuisine and international flavors at top-rated restaurants.",
    image: "/placeholder.svg?height=300&width=600",
  },
  tours: {
    title: "Tours",
    description: "Join guided adventures that showcase the best of African culture and landscapes.",
    image: "/placeholder.svg?height=300&width=600",
  },
}

export default function ExperienceTypePage({ params }: { params: { type: string } }) {
  const type = params.type.toLowerCase()

  // Check if the experience type is valid
  if (!validTypes.includes(type)) {
    notFound()
  }

  const details = experienceDetails[type]

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
          title={`${details.title} Experiences`}
          description={`We're curating unforgettable ${type} experiences across Africa. Soon you'll be able to discover, book, and enjoy these authentic cultural experiences.`}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
