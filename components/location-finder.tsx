import { Search, MapPin } from "lucide-react"

export default function LocationFinder() {
  return (
    <section className="w-full pb-10">
      <div className="w-[1440px] mx-auto px-[60px]">
        <div className="flex flex-col items-center">
          {/* Title - centered with the specified font */}
          <h2 className="text-[#0e2f3c] text-2xl font-bold mt-5 text-center font-['Bricolage_Grotesque_24pt',_sans-serif]">
            Location Finder
          </h2>

          {/* Search container */}
          <div className="flex w-full max-w-[524px] mt-2">
            {/* Input with location pin icon */}
            <div className="relative flex-grow">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e09f3e]">
                <MapPin size={20} />
              </div>
              <input
                type="text"
                placeholder="Where to?"
                className="w-full h-[50px] pl-10 pr-4 rounded-l-md border border-[#bdbdbd] focus:outline-none focus:border-[#0e2f3c]"
              />
            </div>

            {/* Search button */}
            <button className="h-[50px] px-6 bg-[#0e2f3c] text-white rounded-r-md font-medium hover:bg-[#0a2530] transition-colors flex items-center justify-center">
              Search
              <Search className="ml-2" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
