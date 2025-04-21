// Using Server Component approach for data fetching
import { notFound } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Import Tabs
import { Card, CardContent } from "@/components/ui/card" // Import Card for booking
import { Input } from "@/components/ui/input" // Import Input for booking
import { Calendar } from "@/components/ui/calendar" // Import Calendar for booking (placeholder usage)
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover" // Import Popover for booking calendar
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion" // Import Accordion for FAQs
import { Label } from "@/components/ui/label" // Import Label

// Icons
import {
  Home, ChevronRight, Star, CheckCircle2, Building2, Share2, Heart, Image as ImageIcon,
  CalendarDays, Users, MinusCircle, PlusCircle, Wifi, ParkingCircle, Utensils, Dumbbell, BedDouble, Tv, Wind, Droplet, PawPrint, BarChart, Info, MapPin, MessageSquare, ShieldQuestion,
  LucideIcon, // Base type
  // Specific amenity icons (add more as needed)
  Waves, // Ocean view -> Pool?
  ConciergeBell, // Restaurant
  Car, // Car parking
  PersonStanding, // Elevator? -> Accessibility?
  CookingPot, // Kitchen
  Check, // Generic check for features
  Sparkles, // Spa
  ShoppingCart, // Price icon
} from "lucide-react"

import { fetchAccommodationById } from "@/lib/api/accommodations";
import { Accommodation } from "@/types/accommodation";
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
  const accommodation = await fetchAccommodationById(params.id);

  // If no accommodation found for the ID, show 404
  if (!accommodation) {
    notFound();
  }

  // Helper to render stars
  const renderStars = (rating: number, size = 16) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} size={size} className={` ${i < Math.round(rating) ? 'text-[#E09F3E] fill-[#E09F3E]' : 'text-gray-300'}`} />
    ));
  };

  // Placeholder data matching the new design structure
  const policies = [
    "To help protect your payment, always use Roots’n’Route to send money and communicate with host", // Updated text
    "Review Host Policy before making payments or reservations. This includes policies regarding refunds and cancellations",
    "In rare cases, you may be eligible for a refund outside of this policy under Roots’n’Route’s Refunds & Dispute Policy.",
  ];
  const reviewsData = { // Structure based on image
    overallRating: 4.7, // Example
    totalReviews: 47, // Example
    ratingBreakdown: [
      { category: "Location", score: 4.8 },
      { category: "Check-in", score: 4.9 },
      { category: "Cleanliness", score: 4.6 },
      { category: "Communication", score: 4.7 },
      { category: "Amenities", score: 4.5 },
      { category: "Eco-friendliness", score: 4.0 },
    ],
    individualReviews: [
      { name: "Tina Rugby", location: "Atlanta, Georgia", rating: 10, scoreType: "Excellent", date: "August 23, 2024", text: "I came here in August with my husband for our 25th wedding anniversary and we stayed 7 nights. It was the best experience ever. The apartment was very neat, clean... We enjoyed our stay here we will be back here again with the whole family.", avatar: "/images/placeholder-user.jpg" },
      { name: "Tina Rugby", location: "Atlanta, Georgia", rating: 6.5, scoreType: "Average", date: "August 23, 2024", text: "I enjoyed my stay here. The only major problem encountered was finding my way to the location which I eventually did. It was a bit too remote then I would have liked, but I would love to come...", avatar: "/images/placeholder-user.jpg" },
      { name: "Tina Rugby", location: "Atlanta, Georgia", rating: 4, scoreType: "Poor", date: "August 23, 2024", text: "My husband and I did not enjoy our stay here at all. The apartment was in a very noisy environment and hold parties every night which prevented us from getting any rest at all. We also had a problem accessing local amenities as we had to go a distance to get ...", avatar: "/images/placeholder-user.jpg" },
      { name: "Tina Rugby", location: "Atlanta, Georgia", rating: 10, scoreType: "Excellent", date: "August 23, 2024", text: "I came here in August with my husband for our 25th wedding anniversary and we stayed 7 nights. It was the best experience ever. The apartment was very neat, clean... We enjoyed our stay here we will be back here again with the whole family.", avatar: "/images/placeholder-user.jpg" },
    ]
  };
  const faqs = [
    { q: "Is the house located in a secure estate?", a: "This 4 bedroom bungalow is located in 'Rural Estate' on Hakeem Dickson street in Lekki phase 1. It is a secure estate with security who conduct routine checks when residents come in and out of the estate to ensure the safety of everyone." },
    { q: "Will I need an access code to get into the building?", a: "Access code needed, front desk (limited hours)" },
    { q: "Will I be charged if I want to check-in at an earlier time?", a: "Early check-in is subject to availability. Extra cost may apply." },
  ];

  // Calculate booking costs (placeholders for now)
  const nights = 5; // Example
  const subtotal = accommodation.currentPrice * nights;
  const cautionDeposit = 100000; // Example
  const serviceCharge = 30000; // Example
  const vat = 22500; // Example
  const totalCost = subtotal + cautionDeposit + serviceCharge + vat;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs START */}
        <Breadcrumb className="mb-6">
          {/* Breadcrumbs remain the same */}
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center text-[#828282] hover:text-[#0e2f3c]">
                  <Home className="mr-2 h-4 w-4" /> Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="h-4 w-4 text-[#828282]" /></BreadcrumbSeparator>
            <BreadcrumbItem>
               <BreadcrumbLink asChild>
                 <Link href="/accommodation" className="text-[#828282] hover:text-[#0e2f3c]">Accommodation</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
             <BreadcrumbSeparator><ChevronRight className="h-4 w-4 text-[#828282]" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-extrabold text-[#0e2f3c]">{accommodation.propertyName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Breadcrumbs END */}

        {/* --- Top Section: Title, Actions, Rating --- */}
        <section className="mb-6">
          <h1 className="font-bricolage text-3xl md:text-4xl font-bold text-[#0E2F3C] mb-2">{accommodation.propertyName}</h1>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            {/* Location & Rating */}
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              <Link href="#" className="font-manrope text-sm md:text-base text-[#4F4F4F] underline hover:text-[#0E2F3C]">{accommodation.location}</Link>
              <span className="text-[#828282] hidden md:inline">•</span>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-[#E09F3E] fill-[#E09F3E]" />
                <span className="font-manrope text-sm md:text-base font-bold text-[#0E2F3C]">{accommodation.rating.toFixed(1)}</span>
                <Link href="#reviews" className="font-manrope text-sm md:text-base text-[#4F4F4F] underline hover:text-[#0E2F3C]">({accommodation.reviews} reviews)</Link>
              </div>
            </div>
            {/* Action Buttons - Adjusted styling */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" className="flex items-center gap-1.5 text-[#0E2F3C] hover:bg-gray-100 px-2 md:px-3 py-1 h-auto text-sm font-medium rounded-md">
                <Share2 size={16} /> Share
              </Button>
              <Button variant="ghost" className="flex items-center gap-1.5 text-[#0E2F3C] hover:bg-gray-100 px-2 md:px-3 py-1 h-auto text-sm font-medium rounded-md">
                <Heart size={16} /> Add to wishlist
              </Button>
            </div>
          </div>
        </section>
        {/* --- End Top Section --- */}

        {/* --- Image Gallery --- */}
        <section className="mb-8">
          {/* Updated Grid Layout for 5 images */}
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[350px] md:h-[500px] rounded-lg overflow-hidden relative">
            {/* Main Image */}
            <div className="col-span-2 row-span-2 relative cursor-pointer group">
              <Image src={accommodation.images[0] || "/images/placeholder.svg"} alt={`${accommodation.propertyName} main image`} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            {/* Other Images */}
            {accommodation.images.slice(1, 5).map((img, index) => (
              <div key={index} className={cn("relative cursor-pointer group", index >= 2 && "hidden md:block")}> {/* Still hide 2 on mobile */}
                <Image src={img || "/images/placeholder.svg"} alt={`${accommodation.propertyName} image ${index + 2}`} fill className="object-cover" />
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
            ))}
            {/* Show all photos button - Adjusted style */}
            <Button variant="secondary" className="absolute bottom-4 right-4 bg-white text-[#0E2F3C] hover:bg-gray-100 shadow-md border border-gray-300 px-4 py-2 h-auto text-sm font-medium rounded-md">
              <ImageIcon size={16} className="mr-2" /> Show all photos
            </Button>
          </div>
        </section>
        {/* --- End Image Gallery --- */}

         {/* --- Main Content Area (Tabs & Booking) --- */}
        {/* Responsive Grid: Stacks on small, 3 columns on large */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Left Column: Tabs (Spans 2 cols on large screens) */}
          <div className="lg:col-span-2">
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
                  {/* Combined Address & Amenities */}
                  <div className="pb-8"> {/* Added padding bottom */}
                    <h2 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-4">{accommodation.propertyName}</h2>
                    <p className="font-manrope text-base text-[#4F4F4F] mb-1">
                      <strong className="text-[#0E2F3C]">Address:</strong> No. 26, Hakeem Dickson street, off admiralty way, Lekki Phase 1, Lagos state {/* Placeholder Address */}
                    </p>
                    {/* Key Amenities Row - Adjusted grid and styling */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6 mb-6">
                       {(accommodation.amenities || ["Reserve now, Pay Later", "Spa", "Fully Refundable", "Pool", "Free Parking", "Restaurant", "Accessibility options", "Gym", "Pet friendly", "Bar"]).slice(0, 10).map((amenity, index) => { // Show more amenities
                          const Icon = amenityIconMap[amenity] || Check;
                          return (
                             <div key={index} className="flex items-center gap-3"> {/* Increased gap */}
                                <Icon size={22} className="text-[#E09F3E]" /> {/* Slightly larger icon */}
                                <span className="font-manrope text-base text-[#4F4F4F]">{amenity}</span>
                             </div>
                          );
                       })}
                    </div>
                    {/* Show all amenities button - Adjusted style */}
                    <Button variant="secondary" className="bg-[#0E2F3C] text-white hover:bg-[#1a4a5f] rounded-md px-6 py-2.5 text-base font-semibold"> {/* Adjusted style */}
                      Show all amenities
                    </Button>
                  </div>

                  <Separator className="bg-gray-200" />

                  {/* Description */}
                  <div className="py-8">
                    <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-4">Description</h3>
                    <p className="font-manrope text-base text-[#4F4F4F] whitespace-pre-line leading-relaxed">
                      {accommodation.description || "This great place is anything but usual. A stylish and contemporary 4 bedroom bungalow with a BQ, nestled in the heart of Lekki Phase 1 with easy access to the road and other local amenities."}
                    </p>
                  </div>

                  <Separator className="bg-gray-200" />

                  {/* Check-in/out etc. */}
                  <div className="py-8">
                     <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-6">Things to know</h3>
                     {/* Adjusted grid layout and styling */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
                        {/* Check-in */}
                        <div className="space-y-1.5"> {/* Increased spacing */}
                            <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-1">Check-in</h4>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Check-in start time: <strong>2:00 PM</strong></p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Check-in end time: <strong>12:00 AM</strong></p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Early check-in is subject to availability</p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Express check-in available (No extra cost)</p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Minimum check-in age: <strong>18</strong></p>
                            <p className="font-manrope text-sm text-red-600 mt-2"><strong>No reservations and deposits are non-refundable*</strong></p>
                        </div>
                        {/* Check-out */}
                         <div className="space-y-1.5">
                            <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-1">Check-out</h4>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Check-out before noon</p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Late check-out subject to availability</p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">(Comes at an extra cost of <strong>NGN 5,000</strong> per hour)</p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Express check-out available</p>
                        </div>
                        {/* Access Methods */}
                         <div className="space-y-1.5">
                            <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-1">Access methods</h4>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Access code needed, front desk (limited hours)</p>
                        </div>
                        {/* Pets */}
                         <div className="space-y-1.5">
                            <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-1">Pets</h4>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Pets allowed for an extra charge of <strong>NGN 5,000.00</strong> per pet, per day</p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Service animals are welcome, and are exempt from fees</p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Welcoming dogs and cats only</p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">2 total (up to 75 lbs per pet)</p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Pets cannot be left unattended to</p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Specific rooms only; pet-friendly rooms can be requested by contacting the host by sending a message with your request</p>
                        </div>
                        {/* Children */}
                         <div className="space-y-1.5">
                            <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-1">Children and extra beds</h4>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Children are welcome</p>
                            <p className="font-manrope text-sm text-[#4F4F4F]">Rollaway/extra beds are available for <strong>NGN 5,000.00</strong> per stay</p>
                        </div>
                     </div>
                  </div>
                </div>
              </TabsContent>

              {/* --- Host Details Tab --- */}
              <TabsContent value="host" className="mt-0 pt-6">
                 {/* Adjusted Host Card Styling */}
                 <Card className="border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start">
                    <Avatar className="h-24 w-24 flex-shrink-0 bg-gray-100 rounded-lg"> {/* Adjusted styling */}
                      <AvatarImage src={accommodation.host.avatar} alt={`${accommodation.host.name} avatar`} />
                      <AvatarFallback><Building2 size={48} className="text-gray-400" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                       <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
                          {/* Host Name & Info */}
                          <div className="mb-3 sm:mb-0">
                             <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-manrope font-extrabold text-xl text-[#0E2F3C]">Hosted by {accommodation.host.name}</h3>
                                {accommodation.host.isVerified && <CheckCircle2 size={18} className="text-[#27AE60]" />}
                             </div>
                             {/* Placeholder Host Details */}
                             <div className="flex items-center gap-x-2 flex-wrap text-sm text-[#4F4F4F]">
                               <span>Response rate: 100%</span>
                               <span className="hidden sm:inline">•</span>
                               <span>Experience: 20 years</span>
                             </div>
                          </div>
                          {/* Host Rating - Adjusted styling */}
                          <div className="text-center border border-gray-200 p-3 rounded-lg flex-shrink-0">
                             <p className="font-bold text-xl text-[#0E2F3C]">9.7</p>
                             <div className="flex justify-center my-1">{renderStars(4.8, 14)}</div>
                             <Link href="#reviews" className="text-xs text-[#4F4F4F] underline hover:text-[#0E2F3C]">See all {reviewsData.totalReviews} Reviews</Link>
                          </div>
                       </div>
                       {/* About Host */}
                       <p className="font-manrope text-base text-[#4F4F4F] mb-5 leading-relaxed"> {/* Increased margin */}
                          {accommodation.host.name} is a Superhost who she is known for offering a great stay experience to guests. Her apartment comes highly recommended {/* Placeholder */}
                       </p>
                       {/* Host Action Buttons - Adjusted styling */}
                       <div className="flex flex-col sm:flex-row gap-3">
                          <Button className="bg-[#E09F3E] text-[#0E2F3C] hover:bg-[#d08f2e] rounded-md px-5 py-2.5 h-auto font-semibold text-base">View Host Profile</Button>
                          <Button variant="outline" className="border-[#0E2F3C] text-[#0E2F3C] hover:bg-gray-50 flex items-center gap-2 rounded-md px-5 py-2.5 h-auto font-semibold text-base">
                             <MessageSquare size={18} /> Message Host
                             <span className="text-xs text-[#828282] font-normal">(Typically responds in 10 mins)</span>
                          </Button>
                       </div>
                    </div>
                 </Card>
              </TabsContent>

              {/* --- Policies Tab --- */}
              <TabsContent value="policies" className="mt-0 pt-6">
                 <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-4">Policies</h3>
                 {/* Adjusted list styling */}
                 <ul className="list-disc pl-6 space-y-2.5 font-manrope text-base text-[#4F4F4F] leading-relaxed">
                    {policies.map((policy, index) => (
                       <li key={index} dangerouslySetInnerHTML={{ __html: policy.replace(/Refunds & Dispute Policy/g, '<a href="#" class="text-[#E09F3E] underline font-semibold">Refunds & Dispute Policy</a>').replace(/Host Policy/g, '<a href="#" class="text-[#E09F3E] underline font-semibold">Host Policy</a>') }}></li>
                    ))}
                 </ul>
              </TabsContent>

              {/* --- Map Tab --- */}
              <TabsContent value="map" className="mt-0 pt-6">
                 <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-4">Map</h3>
                 {/* Map Placeholder */}
                 <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 relative mb-4">
                    <Image src="/images/placeholder.jpg" alt="Map placeholder" layout="fill" objectFit="cover" className="rounded-lg opacity-50" />
                    <span className="z-10 font-medium">Map Placeholder - Integration Required</span>
                    {/* Adjusted Button Style */}
                    <Button variant="secondary" className="absolute top-4 right-4 bg-white text-[#0E2F3C] hover:bg-gray-100 shadow-md border border-gray-300 px-4 py-2 h-auto text-sm font-medium rounded-md">
                       <MapPin size={16} className="mr-1.5" /> View with Google Earth
                    </Button>
                 </div>
                 {/* Location Description */}
                 <p className="font-manrope text-base text-[#4F4F4F] leading-relaxed">
                    Lekki Phase 1 is an Upper-Middle income, a densely populated residential estate located in the Eti-Osa Local government of Lagos State. The state has grown to become one of the most sought-after locations in Lagos and a major attraction for leisure and recreation. It is a working-class area with large residential projects, as well as a couple of commercial and retail developments. Its location makes it very easily accessible to other prime locations, such as Ikoyi and Oniru/ Victoria Island. It is also known for its popular roads like the Admiralty Way, Freedom Way, Adewunmi Adebimpe Drive, etc. {/* Placeholder */}
                 </p>
                 {/* Getting Around */}
                 <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mt-4 mb-2">Getting around:</h4>
                 <p className="font-manrope text-base text-[#4F4F4F]">
                    We recommend all guests get a <Link href="#" className="text-[#E09F3E] underline font-semibold">Car Rental Service</Link> to pick up at the airport
                 </p>
              </TabsContent>

              {/* --- Reviews Tab --- */}
              <TabsContent value="reviews" className="mt-0 pt-6">
                 {/* Overall Rating */}
                 <div className="flex items-center gap-3 mb-6">
                    <Star size={24} className="text-[#E09F3E] fill-[#E09F3E]" />
                    <span className="font-bricolage text-2xl font-bold text-[#0E2F3C]">{reviewsData.overallRating.toFixed(1)} • {reviewsData.totalReviews} reviews</span>
                 </div>
                 {/* Rating Breakdown - Adjusted styling */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8 border border-gray-200 rounded-lg p-6">
                    {/* Guest Favourite Badge - Adjusted styling */}
                    <div className="md:col-span-2 flex items-center gap-3 bg-gray-100 p-3 rounded-lg mb-4">
                       <Badge className="bg-[#0E2F3C] text-white text-lg font-bold px-2.5 py-1 rounded-md">9.7</Badge>
                       <div>
                          <p className="font-semibold text-base text-[#0E2F3C]">Guest favourite</p>
                          <p className="text-sm text-[#4F4F4F]">One of the most loved homes on Roots'n'Route based on ratings, reviews and reliability</p>
                       </div>
                    </div>
                    {/* Individual Categories */}
                    {reviewsData.ratingBreakdown.map(item => (
                       <div key={item.category} className="flex items-center justify-between">
                          <span className="font-manrope text-base text-[#4F4F4F]">{item.category}</span>
                          <div className="flex items-center gap-2">
                             <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden"> {/* Slightly thicker bar */}
                                <div className="h-full bg-[#0E2F3C]" style={{ width: `${(item.score / 5) * 100}%` }}></div>
                             </div>
                             <span className="font-manrope text-sm font-semibold text-[#0E2F3C] w-8 text-right">{item.score.toFixed(1)}</span> {/* Fixed width for alignment */}
                          </div>
                       </div>
                    ))}
                 </div>
                 {/* Individual Reviews - Adjusted styling */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8"> {/* Increased gap */}
                    {reviewsData.individualReviews.slice(0, 4).map((review, index) => ( // Show first 4
                       <Card key={index} className="border-none p-0">
                          <div className="flex items-center justify-between mb-3">
                             <div className="flex items-center gap-3">
                                <Avatar className="h-11 w-11"> {/* Slightly larger avatar */}
                                   <AvatarImage src={review.avatar} alt={review.name} />
                                   <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                   <p className="font-manrope font-semibold text-base text-[#0E2F3C]">{review.name}</p>
                                   <p className="font-manrope text-xs text-[#828282]">{review.location}</p>
                                </div>
                             </div>
                             <Badge variant={review.scoreType === 'Excellent' ? 'default' : review.scoreType === 'Average' ? 'secondary' : 'destructive'}
                                    className={cn("px-2.5 py-1 text-xs font-semibold rounded-md", // Adjusted padding/rounding
                                                 review.scoreType === 'Excellent' && 'bg-green-100 text-green-800', // Darker text
                                                 review.scoreType === 'Average' && 'bg-yellow-100 text-yellow-800', // Darker text
                                                 review.scoreType === 'Poor' && 'bg-red-100 text-red-800' // Darker text
                                    )}>
                                {review.rating}/10 {review.scoreType}
                             </Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                             <div className="flex items-center gap-0.5">{renderStars(review.rating / 2, 14)}</div>
                             <span className="text-sm text-[#828282]">•</span>
                             <span className="font-manrope text-sm text-[#828282]">Stayed 7 nights</span>
                          </div>
                          <p className="font-manrope text-sm text-[#4F4F4F] mb-2 line-clamp-4 leading-relaxed">{review.text}</p>
                          <p className="font-manrope text-xs text-[#828282]">{review.date}</p>
                       </Card>
                    ))}
                 </div>
                 {/* Action Buttons - Adjusted styling */}
                 <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Button variant="secondary" className="bg-[#0E2F3C] text-white hover:bg-[#1a4a5f] rounded-md px-6 py-2.5 text-base font-semibold w-full sm:w-auto">Show all {reviewsData.totalReviews} reviews</Button>
                    <Button className="bg-[#E09F3E] text-[#0E2F3C] hover:bg-[#d08f2e] rounded-md px-6 py-2.5 text-base font-semibold w-full sm:w-auto">Share your reviews</Button>
                 </div>
                 <Link href="#" className="block text-center mt-6 font-manrope text-sm text-[#4F4F4F] underline hover:text-[#0E2F3C]">Learn how reviews work</Link>
              </TabsContent>

              {/* --- FAQs Tab --- */}
              <TabsContent value="faqs" className="mt-0 pt-6">
                 <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-6">Frequently Asked Questions</h3>
                 {/* Adjusted Accordion styling */}
                 <Accordion type="single" collapsible className="w-full space-y-3">
                    {faqs.map((faq, index) => (
                       <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-5"> {/* Increased padding */}
                          <AccordionTrigger className="font-manrope text-base font-semibold text-[#0E2F3C] hover:no-underline py-4 text-left">{faq.q}</AccordionTrigger>
                          <AccordionContent className="font-manrope text-base text-[#4F4F4F] pb-4 pt-1 leading-relaxed">
                             {faq.a}
                          </AccordionContent>
                       </AccordionItem>
                    ))}
                 </Accordion>
              </TabsContent>
            </Tabs>
          </div>
          {/* --- End Left Column --- */}

          {/* --- Right Column: Booking Card (Figma Aligned - Attempt 2) --- */}
          <div className="col-span-1">
            {/* Card matching Figma: border #BDBDBD, rounded-lg (8px), p-[32px_22px], shadow-lg. Removed sticky. */}
            <Card className="border border-[#BDBDBD] rounded-lg shadow-lg p-[32px_22px] flex flex-col gap-[32px]"> {/* Gap from Figma Frame 650 */}

              {/* Price per night section (Figma Frame 649 -> Frame 207) */}
              <div className="flex flex-col gap-[24px]"> {/* Gap from Figma Frame 649 */}
                <div className="flex flex-col"> {/* Figma Frame 207 */}
                  <div className="flex items-center justify-between"> {/* Figma Frame 251 (adjusted for layout) */}
                    {/* Price: Bricolage Grotesque 32px bold #0E2F3C */}
                    <span className="font-bricolage text-[32px] font-bold text-[#0E2F3C] leading-tight">
                      ₦{accommodation.currentPrice.toLocaleString()}
                    </span>
                    <ShoppingCart size={24} className="text-[#0E2F3C]"/> {/* Icon size adjusted */}
                  </div>
                  {/* Per night: Manrope 18px regular #828282 */}
                  <span className="font-manrope text-lg text-[#828282]">Per night</span>
                </div>

                {/* Booking Controls Section (Figma Frame 646) */}
                <div className="flex flex-col gap-[24px]"> {/* Gap from Figma Frame 646 */}
                  {/* Dates Row (Figma Frame 644) - Switched to flex */}
                  <div className="flex gap-4"> {/* Gap from Figma Frame 644 */}
                    {/* Check In (Figma Frame 282) */}
                    <Popover>
                      <PopoverTrigger asChild>
                        {/* Button matching Figma: border #0E2F3C, rounded-lg (8px), p-2 (approx 9px/16px). Added flex-1 */}
                        <Button variant="outline" className="flex-1 flex flex-col items-start h-auto p-[9px_16px] border-[#0E2F3C] rounded-lg text-left hover:bg-gray-50 gap-[3px]">
                          {/* Label: Manrope 14px bold #4F4F4F */}
                          <Label className="font-manrope text-sm font-extrabold text-[#4F4F4F]">Check In</Label>
                          {/* Value: Manrope 16px regular #4F4F4F */}
                          <div className="flex items-center justify-between w-full">
                            <span className="font-manrope text-base text-[#4F4F4F]">DD - MM - YYYY</span>
                            <CalendarDays size={18} className="text-[#0E2F3C]" />
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" /> {/* Add state/logic later */}
                      </PopoverContent>
                    </Popover>
                    {/* Check Out (Figma Frame 283) */}
                    <Popover>
                      <PopoverTrigger asChild>
                        {/* Added flex-1 */}
                        <Button variant="outline" className="flex-1 flex flex-col items-start h-auto p-[9px_16px] border-[#0E2F3C] rounded-lg text-left hover:bg-gray-50 gap-[3px]">
                          <Label className="font-manrope text-sm font-extrabold text-[#4F4F4F]">Check out</Label>
                          <div className="flex items-center justify-between w-full">
                            <span className="font-manrope text-base text-[#4F4F4F]">DD - MM - YYYY</span>
                            <CalendarDays size={18} className="text-[#0E2F3C]" />
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" /> {/* Add state/logic later */}
                      </PopoverContent>
                    </Popover>
                  </div>
                  {/* Guests/Units Row (Figma Frame 645) */}
                  <div className="grid grid-cols-2 gap-4"> {/* Gap from Figma Frame 645 */}
                    {/* No. of Guests (Figma Frame 280) */}
                    <div className="flex flex-col gap-[10px] p-[7px_16px] border border-[#0E2F3C] rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-[8px]">
                          <Label className="font-manrope text-sm font-extrabold text-[#4F4F4F]">No. of Guests</Label>
                          {/* Value: Manrope 16px regular #828282 */}
                          <span className="font-manrope text-base text-[#828282]">2</span> {/* Placeholder */}
                        </div>
                        {/* +/- Buttons mimicking Figma Scroll button */}
                        <div className="flex flex-col gap-1">
                           <Button variant="ghost" size="icon" className="h-5 w-5 text-[#828282] hover:text-[#0E2F3C] rounded-full bg-[#0E2F3C] text-white hover:bg-[#1f5a75]">
                              <PlusCircle size={14} />
                           </Button>
                           <Button variant="ghost" size="icon" className="h-5 w-5 text-[#828282] hover:text-[#0E2F3C] rounded-full bg-[#0E2F3C] text-white hover:bg-[#1f5a75]">
                              <MinusCircle size={14} />
                           </Button>
                        </div>
                      </div>
                    </div>
                    {/* No. of Units (Figma Frame 281) */}
                    <div className="flex flex-col gap-[10px] p-[7px_16px] border border-[#0E2F3C] rounded-lg">
                       <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-[8px]">
                          <Label className="font-manrope text-sm font-extrabold text-[#4F4F4F]">No. of Units</Label>
                          <span className="font-manrope text-base text-[#828282]">1</span> {/* Placeholder */}
                        </div>
                        <div className="flex flex-col gap-1">
                           <Button variant="ghost" size="icon" className="h-5 w-5 text-[#828282] hover:text-[#0E2F3C] rounded-full bg-[#0E2F3C] text-white hover:bg-[#1f5a75]">
                              <PlusCircle size={14} />
                           </Button>
                           <Button variant="ghost" size="icon" className="h-5 w-5 text-[#828282] hover:text-[#0E2F3C] rounded-full bg-[#0E2F3C] text-white hover:bg-[#1f5a75]">
                              <MinusCircle size={14} />
                           </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pay Now Button (Figma Frame 647 -> Frame 648 -> Medium Tooltip) */}
              {/* Button matching Figma: bg #E09F3E, text #0E2F3C, Manrope 18px bold, p-[12px_16px], rounded-lg (8px) */}
              <Link href={`/accommodation/${accommodation.id}/book`} className="block w-full">
                <Button className="w-full bg-[#E09F3E] text-[#0E2F3C] font-manrope text-lg font-extrabold hover:bg-[#d08f2e] p-[12px_16px] rounded-lg h-auto tracking-wider">
                  Pay Now
                </Button>
              </Link>

              {/* Price Breakdown Section (Figma Frame 273) */}
              <div className="flex flex-col gap-[16px]"> {/* Gap from Figma Frame 272 */}
                 {/* Subtotal (Figma Frame 235) */}
                 <div className="flex justify-between items-center">
                    {/* Label: Manrope 16px regular #4F4F4F */}
                    <span className="font-manrope text-base text-[#4F4F4F]">₦{accommodation.currentPrice.toLocaleString()} x {nights} nights</span>
                    {/* Value: Manrope 16px bold #4F4F4F */}
                    <span className="font-manrope text-base font-extrabold text-[#4F4F4F]">₦{subtotal.toLocaleString()}</span>
                 </div>
                 {/* Caution Deposit (Figma Frame 271) */}
                 <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 font-manrope text-base text-[#4F4F4F]"> {/* Text style from Figma */}
                       Caution Deposit <Info size={14} className="text-[#4F4F4F]"/> {/* Icon color from Figma */}
                    </span>
                    <span className="font-manrope text-base font-extrabold text-[#4F4F4F]">₦{cautionDeposit.toLocaleString()}</span>
                 </div>
                 {/* Service Charge (Figma Frame 272 - duplicated ID in Figma data, assuming structure) */}
                 <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 font-manrope text-base text-[#4F4F4F]">
                       Service charge <Info size={14} className="text-[#4F4F4F]"/>
                    </span>
                    <span className="font-manrope text-base font-extrabold text-[#4F4F4F]">₦{serviceCharge.toLocaleString()}</span>
                 </div>
                 {/* VAT (Figma Frame 238) */}
                 <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 font-manrope text-base text-[#4F4F4F]">
                       VAT <Info size={14} className="text-[#4F4F4F]"/>
                    </span>
                    <span className="font-manrope text-base font-extrabold text-[#4F4F4F]">₦{vat.toLocaleString()}</span>
                 </div>
              </div>

              {/* Separator - Added for visual structure */}
              <Separator className="my-2 bg-[#BDBDBD]" />

              {/* Total Price (Figma Frame 258) */}
              <div className="flex justify-between items-center">
                {/* Label: Manrope 18px regular #0E2F3C */}
                <span className="font-manrope text-lg text-[#0E2F3C]">Total:</span>
                <div className="flex items-center gap-2"> {/* Gap from Figma Frame 252 */}
                   <ShoppingCart size={20} className="text-[#0E2F3C]"/> {/* Icon size adjusted */}
                   {/* Value: Manrope 20px bold #0E2F3C */}
                   <span className="font-manrope text-xl font-extrabold text-[#0E2F3C]">₦{totalCost.toLocaleString()}</span>
                </div>
              </div>

              {/* Report Listing Link */}
              {/* Link: Manrope 16px regular #4F4F4F */}
              <Link href="#" className="text-center font-manrope text-base text-[#4F4F4F] underline mt-2 hover:text-[#E09F3E]">
                 Report this listing
              </Link>
            </Card>
          </div>
          {/* --- End Right Column --- */}
        </section>
        {/* --- End Main Content Area --- */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
