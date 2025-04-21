import { Calendar } from "lucide-react"

export default function BookingSection() {
  return (
    <section className="w-full my-[72px]">
      <div className="w-full mx-auto px-[60px]">
        {/* Heading */}
        <h2 className="text-[#0e2f3c] text-4xl font-bold mb-8 text-center">
          Your Next Naija Destination is Here: BOOK NOW!
        </h2>

        {/* Booking Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form className="flex flex-wrap items-end gap-4">
            {/* Destination */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="destination"
                className="block text-[#4f4f4f] font-medium mb-2"
              >
                Your Destination
              </label>
              <input
                id="destination"
                type="text"
                placeholder="Enter City"
                className="w-full h-[50px] px-4 rounded-md border border-[#bdbdbd] focus:outline-none focus:border-[#0e2f3c]"
              />
            </div>

            {/* From Date */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="fromDate"
                className="block text-[#4f4f4f] font-medium mb-2"
              >
                From
              </label>
              <div className="relative">
                <input
                  id="fromDate"
                  type="text"
                  placeholder="DD - MM - YYYY"
                  className="w-full h-[50px] px-4 pr-10 rounded-md border border-[#bdbdbd] focus:outline-none focus:border-[#0e2f3c]"
                />
                <Calendar
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0e2f3c]"
                  size={20}
                />
              </div>
            </div>

            {/* To Date */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="toDate"
                className="block text-[#4f4f4f] font-medium mb-2"
              >
                To
              </label>
              <div className="relative">
                <input
                  id="toDate"
                  type="text"
                  placeholder="DD - MM - YYYY"
                  className="w-full h-[50px] px-4 pr-10 rounded-md border border-[#bdbdbd] focus:outline-none focus:border-[#0e2f3c]"
                />
                <Calendar
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0e2f3c]"
                  size={20}
                />
              </div>
            </div>

            {/* Number of Travelers */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="travelers"
                className="block text-[#4f4f4f] font-medium mb-2"
              >
                Number of Travelers
              </label>
              <input
                id="travelers"
                type="text"
                placeholder="Enter Number"
                className="w-full h-[50px] px-4 rounded-md border border-[#bdbdbd] focus:outline-none focus:border-[#0e2f3c]"
              />
            </div>

            {/* Search Button */}
            <div className="flex-none">
              <button className="h-[50px] px-8 bg-[#e09f3e] text-[#0e2f3c] rounded-md font-medium hover:bg-[#d08f2e] transition-colors">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
