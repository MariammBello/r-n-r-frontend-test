import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"

// Define valid cities
const validCities = ["lagos", "abuja", "port-harcourt"]

export default function DestinationCityPage({ params }: { params: { city: string } }) {
  const city = params.city.toLowerCase()

  // Check if the city is valid
  if (!validCities.includes(city)) {
    notFound()
  }

  // Format city name for display (capitalize first letter of each word)
  const formattedCityName = city
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">Discover {formattedCityName}</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">
            Explore the best accommodations, attractions, and experiences in {formattedCityName}.
          </p>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title={`${formattedCityName} Travel Guide`}
          description={`We're building a comprehensive guide to help you discover the best of ${formattedCityName}. Soon you'll be able to explore accommodations, attractions, restaurants, and local experiences in this vibrant destination.`}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
