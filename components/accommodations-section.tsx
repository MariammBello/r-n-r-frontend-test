import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

// Accommodation types data
const accommodationTypes = [
  {
    id: 1,
    name: "Apartments",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jGyk2mylWLojMQTWtHRdyA6WidAjOJ.png",
    link: "/accommodation/apartments",
  },
  {
    id: 2,
    name: "Duplexes",
    image: "/images/accom-duplexes.png", // Updated path
    link: "/accommodation/duplexes",
  },
  {
    id: 3,
    name: "Mansions",
    image: "/images/accom-mansions.png", // Updated path
    link: "/accommodation/mansions",
  },
  {
    id: 4,
    name: "Villas",
    // Assuming there's no accom-villas.png, using a generic placeholder for now
    image: "/images/placeholder.jpg", 
    link: "/accommodation/villas",
  },
]

export default function AccommodationsSection() {
  return (
    <section className="w-full my-[72px]">
      <div className="w-full mx-auto px-[60px]">
        {/* Header with title and "See all listings" button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#0e2f3c] text-4xl font-bold">
            Find Your Perfect Accommodation
          </h2>
          <Link
            href="/accommodation"
            className="px-6 py-3 bg-[#0e2f3c] text-white rounded-md font-medium hover:bg-[#0a2530] transition-colors"
          >
            See all listings
          </Link>
        </div>

        {/* Accommodation types carousel */}
        <div className="relative">
          <div className="flex space-x-6 overflow-hidden">
            {accommodationTypes.slice(0, 3).map((type) => (
              <div
                key={type.id}
                className="flex-none w-[calc(33.333%-16px)] relative rounded-lg overflow-hidden"
              >
                {/* Accommodation Image */}
                <div className="relative h-[400px] w-full">
                  {/* Updated fallback path */}
                  <Image
                    src={type.image || "/images/placeholder.jpg"}
                    alt={type.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Clickable Accommodation Type Name */}
                <Link
                  href={type.link}
                  className="block absolute bottom-0 left-0 right-0 bg-[#e09f3e] py-4 hover:bg-[#d08f2e] transition-colors"
                >
                  <h3 className="text-[#0e2f3c] text-2xl font-bold text-center">
                    {type.name}
                  </h3>
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
  );
}
