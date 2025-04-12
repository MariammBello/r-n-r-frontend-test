import Image from "next/image"
import Link from "next/link"
import { Clock, Construction, MapPin, Calendar } from "lucide-react"

interface WorkInProgressProps {
  title: string
  description: string
}

export default function WorkInProgress({ title, description }: WorkInProgressProps) {
  return (
    <section className="py-12 mb-16">
      <div className="bg-gradient-to-br from-[#ffffde] to-[#d6f7ff] rounded-xl p-8 shadow-sm border border-[#e09f3e]/20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="mb-6 relative">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
              <Construction size={48} className="text-[#e09f3e]" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#0e2f3c] rounded-full flex items-center justify-center text-white">
              <Clock size={20} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#0e2f3c] mb-4">This Page is a Work in Progress</h2>

          <p className="text-lg text-[#4f4f4f] mb-8">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
              <Calendar className="text-[#e09f3e] mb-2" size={32} />
              <p className="text-[#0e2f3c] font-medium">Coming Soon</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
              <MapPin className="text-[#e09f3e] mb-2" size={32} />
              <p className="text-[#0e2f3c] font-medium">Exciting Features</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
              <Image
                src="/images/placeholder.svg" // Updated path, kept placeholder.svg
                alt="Premium icon"
                width={32}
                height={32}
                className="mb-2"
              />
              <p className="text-[#0e2f3c] font-medium">Premium Experiences</p>
            </div>
          </div>

          <Link
            href="/"
            className="px-8 py-3 bg-[#0e2f3c] text-white rounded-md font-medium hover:bg-[#0a2530] transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </section>
  )
}
