"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function MemberDealsBanner() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="w-full bg-white py-4">
      <div className="w-full mx-auto px-[60px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[#5a1700] text-2xl font-medium font-['Bricolage_Grotesque_24pt',_sans-serif]">
            Member deals come with exclusive benefits
          </h2>

          {isAuthenticated ? (
            <Link
              href="/book-now"
              className="px-8 py-3 bg-[#5a1700] text-white rounded-md font-medium hover:bg-[#4a1300] transition-colors"
            >
              Book Now
            </Link>
          ) : (
            <Link
              href="/auth/login" // Updated path
              className="px-8 py-3 bg-[#5a1700] text-white rounded-md font-medium hover:bg-[#4a1300] transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
