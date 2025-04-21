import Image from "next/image"
import Link from "next/link"

// City data
const cities = [
  {
    name: "Lagos",
    image: "/images/city-lagos.png",
    description:
      "Explore the best accommodations, relish in the rich cultural diversity and taste the flavours of Nigeria's biggest tourism hub. Ekaabo!",
  },
  {
    name: "Abuja",
    image: "/images/city-abuja.png", // Updated path
    description:
      "Explore the best accommodations, relish in the rich cultural diversity and taste the flavours of Nigeria's biggest tourism hub. Ekaabo!",
  },
  {
    name: "Port Harcourt",
    image: "/images/city-port-harcourt.png", // Updated path
    description:
      "Explore the best accommodations, relish in the rich cultural diversity and taste the flavours of Nigeria's biggest tourism hub. Ekaabo!",
  },
]

export default function DestinationsSection() {
  return (
    <section className="w-full my-[72px]">
      <div className="w-full mx-auto px-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              {/* City Image */}
              <div className="relative h-[240px] w-full">
                <Image
                  src={city.image || "/images/placeholder.jpg"} // Updated fallback path
                  alt={`View of ${city.name}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* City Content */}
              <div className="p-6">
                <h3 className="text-[#0e2f3c] text-2xl font-bold mb-2">
                  {city.name}
                </h3>
                <p className="text-[#4f4f4f] mb-6">{city.description}</p>
                <Link
                  href={`/destinations/${city.name.toLowerCase()}`}
                  className="block w-full py-4 bg-[#0e2f3c] text-white text-center rounded-md font-medium hover:bg-[#0a2530] transition-colors"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
