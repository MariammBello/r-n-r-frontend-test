"use client"

import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function VacationPlanningBanner() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="w-full bg-[#0e2f3c] py-6">
      <div className="w-[1440px] mx-auto px-[60px]">
        <div className="flex items-center justify-between">
          {/* Left side with logo and text */}
          <div className="flex items-center">
            {/* Bundle Icon */}
            <div className="mr-4">
              <Image src="/images/bundle-icon.svg" alt="Bundle icon" width={80} height={80} className="w-20 h-20" />
            </div>

            {/* Text content */}
            <div>
              <h2 className="text-[#e09f3e] text-3xl font-bold mb-0">Planning your next vacation?</h2>
              <p className="text-white text-lg">Explore and book bundle deals on accommodations & flights</p>
            </div>
          </div>

          {/* Button - changes based on auth state */}
          {isAuthenticated ? (
            <Link
              href="/book-now"
              className="px-6 py-2 bg-[#e09f3e] text-[#0e2f3c] rounded-md font-bold hover:bg-a transition-colors"
            >
              Book Now
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="px-6 py-2 bg-[#e09f3e] text-[#0e2f3c] rounded-md font-bold hover:bg-[#d08f2e] transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
