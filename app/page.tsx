"use client"

import Header from "@/components/header"
import LocationFinder from "@/components/location-finder"
import HeroSlider from "@/components/hero-slider"
import PromoBanner from "@/components/promo-banner"
import ViewedRecently from "@/components/viewed-recently"
import DestinationsSection from "@/components/destinations-section"
import BookingSection from "@/components/booking-section"
import BundleDealsSection from "@/components/bundle-deals-section"
import MemberDealsBanner from "@/components/member-deals-banner"
import AccommodationsSection from "@/components/accommodations-section"
import VacationPlanningBanner from "@/components/vacation-planning-banner"
import AffordableFlightsSection from "@/components/affordable-flights-section"
import NaijaExperienceSection from "@/components/naija-experience-section"
// Removed unused SideBar import
import RootsBlogSection from "@/components/roots-blog-section"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { Import } from "lucide-react"
import { Suspense } from "react"; // Import Suspense

export default function LandingPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="relative w-full mx-auto bg-white overflow-x-hidden">
      {/* Header at the top of the page */}
      <Header />

      {/* Location Finder */}
      <div className="mb-10">
        <LocationFinder />
      </div>

      {/* Hero Slider */}
      <div className="mb-10">
        <HeroSlider />
      </div>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Viewed Recently */}
      {isAuthenticated && <ViewedRecently />}

      {/* Destinations Section */}  
      <DestinationsSection />

      {/* Booking Section - Wrapped in Suspense */}
      <Suspense fallback={<div className="w-full my-[72px] px-[60px] text-center"><p>Loading booking options...</p></div>}>
        <BookingSection />
      </Suspense>

      {/* Bundle Deals Section */}
      <BundleDealsSection />

      {/* 16px gap */}
      <div className="h-4"></div>

      {/* Member Deals Banner */}
      <MemberDealsBanner />

      {/* Accommodations Section */}
      <AccommodationsSection />

      {/* Vacation Planning Banner */}
      <VacationPlanningBanner />

      {/* Affordable Flights Section */}
      <AffordableFlightsSection />

      {/* Naija Experience Section */}
      <NaijaExperienceSection />

      {/* Roots Blog Section */}
      <RootsBlogSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
