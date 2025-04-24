"use client"

import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function VacationPlanningBanner() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="w-full max-w-[1300px] mx-auto bg-[#0e2f3c] py-4 rounded-[10px]">
      <div className="w-full mx-auto px-[60px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4">
              <Image src="/images/bundle-icon.svg" alt="Bundle icon" width={50} height={50} className="w-10 h-10" />
            </div>
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
              href="/auth/login" // Updated path
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
