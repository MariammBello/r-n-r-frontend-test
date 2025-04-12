import Image from "next/image"
import Link from "next/link"
import { Star, Home, ShoppingCart, Coffee, MapPin } from "lucide-react"

// Resort deal data
const resortDeals = [
  {
    id: 1,
    name: "Zuma Rock Resort",
    location: "Daura, Niger state",
    rating: 5,
    reviews: 47,
    image: "/images/zuma-rock-resort.png",
    price: "₦1,250,000.00",
    includes: ["Breakfast", "Resort Tour"],
    accessType: "General Access",
  },
  {
    id: 2,
    name: "Zuma Rock Resort",
    location: "Daura, Niger state",
    rating: 5,
    reviews: 47,
    image: "/images/zuma-rock-resort.png",
    price: "₦1,250,000.00",
    includes: ["Breakfast", "Resort Tour"],
    accessType: "VIP Access",
  },
  {
    id: 3,
    name: "Zuma Rock Resort",
    location: "Daura, Niger state",
    rating: 5,
    reviews: 47,
    image: "/images/zuma-rock-resort.png",
    price: "₦1,250,000.00",
    includes: ["Breakfast", "Resort Tour"],
    accessType: "General Access",
  },
]

export default function BundleDealsSection() {
  return (
    <section className="w-full my-[72px]">
      <div className="w-[1440px] mx-auto px-[60px]">
        {/* Header with title and "See all deals" button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#0e2f3c] text-3xl font-bold">Bundle Deals- Ovajara packages</h2>
          <Link
            href="/deals"
            className="px-6 py-3 bg-[#0e2f3c] text-white rounded-md font-medium hover:bg-[#0a2530] transition-colors"
          >
            See all deals
          </Link>
        </div>

        {/* Date range info */}
        <div className="flex items-center mb-6">
          <span className="text-[#4f4f4f]">Showing deals available from: </span>
          <span className="font-medium ml-1">Feb. 10 - Feb. 16</span>
          <span className="ml-4 px-2 py-1 bg-[#ff49b8] text-white text-sm rounded">Auto</span>
        </div>

        {/* Resort deals cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resortDeals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {/* Resort Image */}
              <div className="relative h-[200px] w-full">
                {/* Updated fallback path */}
                <Image src={deal.image || "/images/deal-zuma-1.png"} alt={deal.name} fill className="object-cover" />
              </div>

              {/* Resort Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <Home className="text-[#0e2f3c] mr-2" size={18} />
                    <h3 className="text-[#0e2f3c] text-xl font-bold">{deal.name}</h3>
                  </div>
                  <div className="flex">
                    {[...Array(deal.rating)].map((_, i) => (
                      <Star key={i} className="fill-[#e09f3e] text-[#e09f3e]" size={16} />
                    ))}
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <MapPin className="text-gray-500 mr-1" size={14} />
                  <p className="text-gray-600 text-sm">{deal.location}</p>
                  <Link href={`/reviews/${deal.id}`} className="text-[#e09f3e] text-sm ml-auto">
                    See all {deal.reviews} Reviews
                  </Link>
                </div>

                <div className="mb-4">
                  <p className="text-[#4f4f4f] font-medium mb-2">Includes:</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Coffee className="text-[#e09f3e] mr-2" size={16} />
                      <span className="text-[#4f4f4f]">Breakfast</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="text-[#e09f3e] mr-2" size={16} />
                      <span className="text-[#4f4f4f]">Resort Tour</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    className={`px-4 py-2 rounded-md font-medium ${
                      deal.accessType === "VIP Access" ? "bg-[#5a1700] text-white" : "bg-[#e09f3e] text-[#0e2f3c]"
                    }`}
                  >
                    {deal.accessType}
                  </button>
                  <div className="text-right">
                    <div className="flex items-center justify-end">
                      <ShoppingCart className="text-[#0e2f3c] mr-1" size={16} />
                      <span className="text-[#0e2f3c] font-bold">{deal.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm">Incl. flight + Accommodation</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
