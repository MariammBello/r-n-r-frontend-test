"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

export default function PromoBanner() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="w-full max-w-[1300px] mx-auto bg-[#0e2f3c] py-4">
      <div className="w-full  mx-auto px-[60px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3">
              <Image
                src="/images/bundle-icon.svg"
                alt="Bundle rewards icon"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <p className="text-white text-lg font-medium">
              Unlock exclusive rewards when you book bundle deals
            </p>
          </div>

          {isAuthenticated ? (
            <Link
              href="/book-now"
              className="px-6 py-2 bg-[#e09f3e] text-[#0e2f3c] rounded-md font-medium hover:bg-[#d08f2e] transition-colors"
            >
              Book Now
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="px-6 py-2 bg-[#e09f3e] text-[#0e2f3c] rounded-md font-medium hover:bg-[#d08f2e] transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
