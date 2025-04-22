// Using Server Component approach for data fetching
import { notFound } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ListingHeader from "@/components/ListingHeader";
import ImageGallery from "@/components/ImageGallery";
import BookingCard from "@/components/BookingCard";
import AboutIntroSection from "@/components/AboutIntroSection";
import DescriptionSection from "@/components/DescriptionSection";
import HostDetailsCard from "@/components/HostDetailsCard";
import AboutHostSection from "@/components/AboutHostSection"; // Import the new component
import PoliciesList from "@/components/PoliciesList";
import MapSection from "@/components/MapSection";
import ReviewsSummary from "@/components/ReviewsSummary";
import ReviewList from "@/components/ReviewList";
import FaqAccordion from "@/components/FaqAccordion"; // Import the new component
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs
// Removed Card, Input, Calendar, Popover, Label imports
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Import Accordion for FAQs


// Icons
import {
  Star, // Keep Star for renderStars helper
  // Re-add icons needed for amenityIconMap
  Utensils, Dumbbell, Building2, Wifi, Wind, ParkingCircle, ShieldQuestion, PawPrint, Droplet, Tv, BarChart, Info,
  CalendarDays, // Keep for BookingCard & amenity map
  MapPin, // Keep for MapSection
  MessageSquare, // Keep for HostDetailsCard
  LucideIcon, // Base type
  // Specific amenity icons (keep as they are used in amenityIconMap)
  Waves,
  ConciergeBell,
  Car,
  PersonStanding,
  CookingPot,
  Check,
  Sparkles,
  ShoppingCart,
} from "lucide-react";

// Import all necessary fetch functions and types
import {
  fetchAccommodationById,
  fetchReviewsByAccommodationId,
  fetchPoliciesByAccommodationId,
  fetchFaqsByAccommodationId
} from "@/lib/api/accommodations";
import { Accommodation, ReviewsData, FaqItem } from "@/types/accommodation"; // Import necessary types
import { cn } from '@/lib/utils';

// Revalidate data periodically or on demand if needed (optional)
// export const revalidate = 3600 // Revalidate every hour

// Map amenity text to icons (expand this map based on actual data)
const amenityIconMap: Record<string, LucideIcon> = {
  "Pool": Waves, // Using Waves for Pool
  "Restaurant": Utensils,
  "Gym": Dumbbell,
  "Spa": Sparkles,
  "Conference Hall": Building2, // Placeholder
  "Free Wi-Fi": Wifi,
  "Air Conditioning": Wind,
  "Kitchen": CookingPot,
  "Parking": Car,
  "Security": ShieldQuestion, // Placeholder
  "Garden": PawPrint, // Placeholder
  "Washing Machine": Droplet, // Placeholder
  "Kitchenette": CookingPot,
  "Balcony": Building2, // Placeholder
  "Elevator": PersonStanding, // Placeholder
  "Private Pool": Waves,
  "Chef Service": ConciergeBell,
  "Cinema Room": Tv,
  "Living Room": Tv, // Placeholder
  "Daily Housekeeping": Check, // Placeholder
  "24/7 Power": Check, // Placeholder
  "Bar": BarChart, // Placeholder
  "Tour Desk": Info, // Placeholder
  "Ocean view": Waves,
  "Pet friendly": PawPrint,
  "Reserve now, Pay Later": CalendarDays, // Placeholder
  "Fully Refundable": Check, // Placeholder
  "Free Parking": Car,
  "Accessibility options": PersonStanding,
  // Removed duplicate Spa, Pool, Gym, Bar, Pet friendly keys below
};

// Helper function to generate simple slugs from text (if needed later)
// const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

export default async function AccommodationDetailPage({ params }: { params: { id: string } }) {
  // Fetch all data in parallel
  const [accommodation, reviewsData, policies, faqs] = await Promise.all([
    fetchAccommodationById(params.id),
    fetchReviewsByAccommodationId(params.id),
    fetchPoliciesByAccommodationId(params.id),
    fetchFaqsByAccommodationId(params.id)
  ]);

  // If the main accommodation data fails to load, show 404
  if (!accommodation) {
    notFound();
  }

  // Helper to render stars
  const renderStars = (rating: number, size = 16) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} size={size} className={` ${i < Math.round(rating) ? 'text-[#E09F3E] fill-[#E09F3E]' : 'text-gray-300'}`} />
    ));
  };

   // Data (reviewsData, policies, faqs) is now fetched above
   // Cost calculations are handled within BookingCard component

   return (
     <div className="relative w-full mx-auto bg-white overflow-x-hidden">
       {/* Header */}
      <Header />

      {/* Main Content - Updated max-width and removed padding */}
      <main className="max-w-[1300px] mx-auto py-8">
        {/* Use the ListingHeader component */}
        <ListingHeader
          propertyName={accommodation.propertyName}
          location={accommodation.location}
          rating={accommodation.rating}
          reviews={accommodation.reviews}
        />

        {/* Use the ImageGallery component */}
        <ImageGallery
          images={accommodation.images}
          propertyName={accommodation.propertyName}
        />

         {/* --- Main Content Area (Tabs & Booking) --- */}
        {/* Responsive Grid: Stacks on small, content + auto-sized sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16">
          {/* Left Column: Tabs (Takes up remaining space) */}
          <div> {/* Removed lg:col-span-2 */}
            <Tabs defaultValue="about" className="w-full">
              {/* Styled TabsList */}
              <TabsList className="border-b border-gray-200 rounded-none justify-start bg-transparent p-0 h-auto mb-6">
                <TabsTrigger value="about" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E2F3C] data-[state=active]:text-[#0E2F3C] rounded-none pb-2 px-1 mr-6 text-[#4F4F4F] font-semibold text-base hover:text-[#0E2F3C]">About</TabsTrigger>
                <TabsTrigger value="host" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E2F3C] data-[state=active]:text-[#0E2F3C] rounded-none pb-2 px-1 mr-6 text-[#4F4F4F] font-semibold text-base hover:text-[#0E2F3C]">Host Details</TabsTrigger>
                <TabsTrigger value="policies" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E2F3C] data-[state=active]:text-[#0E2F3C] rounded-none pb-2 px-1 mr-6 text-[#4F4F4F] font-semibold text-base hover:text-[#0E2F3C]">Policies</TabsTrigger>
                <TabsTrigger value="map" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E2F3C] data-[state=active]:text-[#0E2F3C] rounded-none pb-2 px-1 mr-6 text-[#4F4F4F] font-semibold text-base hover:text-[#0E2F3C]">Map</TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E2F3C] data-[state=active]:text-[#0E2F3C] rounded-none pb-2 px-1 mr-6 text-[#4F4F4F] font-semibold text-base hover:text-[#0E2F3C]">Reviews</TabsTrigger>
                <TabsTrigger value="faqs" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E2F3C] data-[state=active]:text-[#0E2F3C] rounded-none pb-2 px-1 text-[#4F4F4F] font-semibold text-base hover:text-[#0E2F3C]">FAQs</TabsTrigger>
              </TabsList>

              {/* --- About Tab --- */}
              <TabsContent value="about" className="mt-0 pt-6">
                <div className="flex flex-col gap-8">
                  {/* Use the AboutIntroSection component */}
                  <AboutIntroSection
                    propertyName={accommodation.propertyName}
                    amenities={accommodation.amenities}
                    amenityIconMap={amenityIconMap}
                  />

                  <Separator className="bg-gray-200" />

                  {/* Use the updated DescriptionSection component */}
                  <DescriptionSection
                    description={accommodation.description}
                    // Pass placeholder props for now - replace with actual data later
                    // checkInOut={accommodation.checkInOutInfo}
                    // accessMethods={accommodation.accessInfo}
                    // petPolicy={accommodation.petsInfo}
                    // childPolicy={accommodation.childrenInfo}
                  />

                  {/* Removed Separator and ThingsToKnowSection */}
                </div>
              </TabsContent>

              {/* --- Host Details Tab --- */}
              <TabsContent value="host" className="mt-0 pt-6">
                 <HostDetailsCard
                   host={accommodation.host}
                   totalReviews={reviewsData.totalReviews} // Pass total reviews
                   renderStars={renderStars} // Pass the helper function
                 />
                 {/* Add AboutHostSection below the card */}
                 <AboutHostSection
                   hostName={accommodation.host.name}
                   // aboutText={accommodation.host.about} // Pass actual about text later
                 />
              </TabsContent>

              {/* --- Policies Tab --- */}
              <TabsContent value="policies" className="mt-0 pt-6">
                 <PoliciesList policies={policies} />
              </TabsContent>

              {/* --- Map Tab --- */}
              <TabsContent value="map" className="mt-0 pt-6">
                 <MapSection />
              </TabsContent>

              {/* --- Reviews Tab --- */}
              <TabsContent value="reviews" className="mt-0 pt-6">
                 {/* Removed overall rating text div that was here */}
                 <ReviewsSummary
                   overallRating={reviewsData.overallRating} // Prop still passed, though not used in component currently
                   totalReviews={reviewsData.totalReviews}
                   ratingBreakdown={reviewsData.ratingBreakdown}
                 />
                 <ReviewList
                   reviews={reviewsData.individualReviews}
                   totalReviews={reviewsData.totalReviews}
                   renderStars={renderStars}
                 />
              </TabsContent>

              {/* --- FAQs Tab --- */}
              <TabsContent value="faqs" className="mt-0 pt-6">
                 <FaqAccordion faqs={faqs} />
              </TabsContent>
            </Tabs>
          </div>
          {/* --- End Left Column --- */}

          {/* --- Right Column: Booking Card --- */}
          <BookingCard
            accommodationId={accommodation.id}
            currentPrice={accommodation.currentPrice}
            // Pass date/guest/unit state props here later
          />
        </section>
        {/* --- End Main Content Area --- */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
