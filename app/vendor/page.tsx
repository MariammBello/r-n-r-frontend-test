"use client";

// Imports from app/page.tsx
import Header from "@/components/header";
import LocationFinder from "@/components/location-finder";
import HeroSlider from "@/components/hero-slider";
import PromoBanner from "@/components/promo-banner";
import ViewedRecently from "@/components/viewed-recently";
import DestinationsSection from "@/components/destinations-section";
import BookingSection from "@/components/booking-section";
import BundleDealsSection from "@/components/bundle-deals-section";
import MemberDealsBanner from "@/components/member-deals-banner";
import AccommodationsSection from "@/components/accommodations-section";
import VacationPlanningBanner from "@/components/vacation-planning-banner";
import AffordableFlightsSection from "@/components/affordable-flights-section";
import NaijaExperienceSection from "@/components/naija-experience-section";
// import SideBar from "@/components/sidebar"; // Sidebar might not be needed for vendor page? Keep commented for now.
// import RootsBlogSection from "@/components/roots-blog-section"; // Removed
import Footer from "@/components/footer";
import { useAuth } from "@/contexts/auth-context";
import FaqAccordion from "@/components/FaqAccordion";
import VendorOfferingCards from "@/components/vendor-offering-cards";
import VendorImageCollage from "@/components/vendor-image-collage";
import VendorJoinSection from "@/components/vendor-join-section";
import VendorFeatureSection from "@/components/vendor-feature-section";
import VendorPartnersSection from "@/components/vendor-partners-section";
import VendorSignupPrompt from "@/components/vendor-signup-prompt"; // Import the signup prompt component
import { Users, Globe, Network } from 'lucide-react'; // Import icons for features
// import { Import } from "lucide-react"; // Import seems unused in app/page.tsx

// Renaming the function to reflect it's the Vendor Page
export default function VendorPage() {
  const { isAuthenticated } = useAuth(); // Keep auth context if needed for other sections

  // Vendor-specific content for HeroSlider
  const vendorHeroTitle = "Bring your business to the world";
  const vendorHeroDescription = "List your business on Roots 'n' Routes and enjoy extended reach for your clientele and opportunities for more business.";
  const vendorButtonText = "Sign In"; // Or "Get Started"
  const vendorButtonLink = "/auth/login"; // Link to vendor login/signup

  // Placeholder FAQ data for vendors
  const vendorFaqs = [
    { q: "How do I list my accommodation/experience/flight/event?", a: "Detailed answer about the listing process..." },
    { q: "What are the commission fees?", a: "Explanation of the commission structure..." },
    { q: "How do I get paid?", a: "Information about payout schedules and methods..." },
    { q: "Can I manage my listings easily?", a: "Details about the vendor dashboard and tools..." },
  ];

  return (
    <div className="relative w-full mx-auto bg-white overflow-x-hidden">
      {/* Header - Exclude 'Opportunity' */}
      <Header excludeNavItems={['Opportunity']} />

      {/* Hero Slider - With vendor content */}
      {/* Removed the extra div wrapper and negative margin for now, can re-add if spacing is still off */}
      <HeroSlider
        title={vendorHeroTitle}
        description={vendorHeroDescription}
        buttonText={vendorButtonText}
        buttonLink={vendorButtonLink}
      />

      {/* Sections below are placeholders or specific to the vendor page design */}

      {/* Viewed Recently - Removed */}
      {/* Roots Blog Section - Removed */}

      {/* Placeholder for vendor-specific sections from the design */}
      {/* Section 1: "What offering would you like to list?" */}
      <VendorOfferingCards />
      {/* Section 2: Image Collage */}
      <VendorImageCollage />
      {/* Section 3: "Join in minutes..." */}
      <VendorJoinSection />
      {/* Section 4: Feature Sections (3x) */}
      <VendorFeatureSection
        icon={Users}
        title="Your Services, Seen by the Right People"
        description="Let's connect you with travelers looking for authentic experiences across Africa and increase your visibility like never before, through seamless onboarding, real-time insights, and flexible booking options."
        videoSrc="placeholder-video-1.mp4"
        bgColor="bg-orange-50" // Example color - adjust based on design
        iconBgColor="bg-orange-100"
        iconColor="text-orange-600"
      />
      <VendorFeatureSection
        icon={Globe}
        title="Grow from Local to Global"
        description="Expand your business with the right tools and exposure needed to scale. No matter the size of your business, our platform helps you grow, reach new customers, and maximize your potential."
        videoSrc="placeholder-video-2.mp4"
        bgColor="bg-yellow-50" // Example color - adjust based on design
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
      />
      <VendorFeatureSection
        icon={Network}
        title="A Network That Works for You"
        description="Your services deserve a global audience. Gain access to marketing support, strategic exposure, and a community of like-minded businesses."
        videoSrc="placeholder-video-3.mp4"
        bgColor="bg-blue-50" // Example color - adjust based on design
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
      />
      {/* Section 5: "Powering over 5,000..." + Logos */}
      <VendorPartnersSection />
      {/* Section 6: "Trusted by providers..." */}
      <VendorFeatureSection
        // No icon props passed for this section
        title="Trusted by providers across Africa"
        description="Thousands of providers are already growing their businesses with Roots & Routes. Join our network to boost visibility, attract more travelers, and increase bookings effortlessly."
        videoSrc="placeholder-video-4.mp4"
        bgColor="bg-gray-100" // Example color - adjust based on design
      />
      {/* Section 7: FAQs */}
      <div className="container mx-auto py-16 px-4">
        <FaqAccordion faqs={vendorFaqs} />
      </div>
      {/* Section 8: Sign-in/Create */}
      <VendorSignupPrompt />

      {/* Footer */}
      <Footer />
    </div>
  );
}
