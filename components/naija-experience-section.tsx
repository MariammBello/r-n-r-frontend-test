import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

// Experience types data
const experienceTypes = [
  {
    id: 1,
    name: "Events",
    image: "/images/lagos.png",
    link: "/experiences/events",
  },
  {
    id: 2,
    name: "Attractions",
    image: "/images/lagos.png",
    link: "/experiences/attractions",
  },
  {
    id: 3,
    name: "Restaurants",
    image: "/images/lagos.png",
    link: "/experiences/restaurants",
  },
  {
    id: 4,
    name: "Tours",
    image: "/images/lagos.png",
    link: "/experiences/tours",
  },
]

export default function NaijaExperienceSection() {
  return (
    <section className="w-full my-[72px]">
      <div className="w-full mx-auto px-[60px]">
        {/* Header with title and "See Experience" button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#0e2f3c] text-4xl font-bold">Explore the Naija Experience</h2>
          <Link
            href="/experiences"
            className="px-6 py-3 bg-[#0e2f3c] text-white rounded-md font-medium hover:bg-[#0a2530] transition-colors"
          >
            See Experience
          </Link>
        </div>

        {/* Experience types carousel */}
        <div className="relative">
          <div className="flex space-x-6 overflow-hidden">
            {experienceTypes.slice(0, 3).map((type) => (
              <div key={type.id} className="flex-none w-[calc(33.333%-16px)] relative rounded-lg overflow-hidden">
                {/* Experience Image */}
                <div className="relative h-[280px] w-full">
                  <Image
                    src={type.image || "/images/placeholder.jpg"} // Updated fallback path
                    alt={`${type.name} experience in Nigeria`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Clickable Experience Type Name */}
                <Link
                  href={type.link}
                  className="block absolute bottom-0 left-0 right-0 bg-[#e09f3e] py-4 hover:bg-[#d08f2e] transition-colors"
                >
                  <h3 className="text-[#0e2f3c] text-2xl font-bold text-center">{type.name}</h3>
                </Link>
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
