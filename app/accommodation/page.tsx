"use client" // Moved to the top

import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState } from "react" // Add this line
import { Home, ChevronRight, CalendarDays, ChevronDown, ChevronLeft } from "lucide-react" // Add ChevronLeft
import Link from "next/link"
import { Label } from "@/components/ui/label" // Add Label
import { Input } from "@/components/ui/input" // Add Input
import { Button } from "@/components/ui/button" // Add Button
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover" // Add Popover
import { Calendar } from "@/components/ui/calendar" // Add Calendar
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import AccommodationFilters from "@/components/accommodation-filters"
// Import AccommodationCard and its props type
import AccommodationCard, { AccommodationCardProps } from "@/components/accommodation-card"
// Import Pagination components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


// Define card data - Add 'id' to each
const cardData1: Omit<AccommodationCardProps, 'onSelect'> = { // Omit onSelect here, add later
  id: "zuma-rock-resort", // Added ID
  images: ["/images/pool-image.png", "/images/pool-image.png", "/images/pool-image.png"],
  // Removed duplicate images line
  host: { name: "Zuma Rock Resort", title: "Hospitality Hero", avatar: "/images/placeholder-logo.svg", isVerified: true },
  rating: 5,
  reviews: 47,
  propertyName: "Zuma Rock Resort",
  location: "Daura, Niger state",
  features: [
    { text: "Reservation available" },
    { text: "Fully Refundable" },
    { text: "Accessibility options" },
    { text: "Suitable for Businesses" },
  ],
  discount: 30,
  originalPrice: 1250000,
  currentPrice: 105000.00,
  priceType: "Regular",
};

const cardData2: Omit<AccommodationCardProps, 'onSelect'> = { // Omit onSelect here, add later
  id: "4-bedroom-bungalow", // Added ID
  images: ["/images/pool-image.png", "/images/pool-image.png", "/images/pool-image.png"], // Using same image for consistency
  // Removed duplicate images line
  host: { name: "Lolade", title: "Hospitality Hero", avatar: "/images/placeholder-user.jpg", isVerified: true },
  rating: 5,
  reviews: 47, // Assuming same review count from image
  propertyName: "4 Bedroom Bungalow",
  location: "Lekki Phase 1, Lagos state",
  features: [
    { text: "No Reservation" },
    { text: "Refundable caution deposit" },
    { text: "Accessibility options" },
    { text: "Family-friendly" },
  ],
  discount: undefined, // No discount shown
  originalPrice: undefined, // No original price shown
  currentPrice: 105000.00,
  priceType: "Premium",
};

// Card 3: Exact replica of Card 1 (except ID)
const cardData3: Omit<AccommodationCardProps, 'onSelect'> = {
  ...cardData1, // Spread cardData1
  id: "zuma-rock-resort-copy", // Unique ID
};

// Card 4: Exact replica of Card 2 (except ID)
const cardData4: Omit<AccommodationCardProps, 'onSelect'> = {
  ...cardData2, // Spread cardData2
  id: "4-bedroom-bungalow-copy", // Unique ID
};


export default function AccommodationPage() {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)
  // Add state for selected card
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // Handler function to update selected card
  const handleSelectCard = (id: string) => {
    setSelectedCardId(id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Breadcrumbs START */}
        <Breadcrumb className="mt-12 pb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center text-[#828282] hover:text-[#0e2f3c]">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-[#828282]" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-extrabold text-[#0e2f3c]">
                Accommodation
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Breadcrumbs END */}

        {/* Find Accommodation Section START */}
        <section className="flex flex-col gap-8"> {/* Replaces old section and WorkInProgress */}
          {/* Title */}
          <h1 className="font-bricolage text-4xl font-bold text-[#0E2F3C]"> {/* Adjusted font and size based on Figma style_MOCET7 */}
            Find your Perfect Accommodation
          </h1>

          {/* Form Area */}
          <div className="flex flex-col gap-4">
            {/* Inputs Row */}
            <div className="flex items-end gap-6">
              {/* Destination */}
              <div className="flex flex-col gap-2 flex-grow" style={{ maxWidth: '400px' }}> {/* Max width from Figma */}
                <Label htmlFor="destination" className="font-manrope text-base font-extrabold text-[#4F4F4F]">Your Destination</Label>
                <Input id="destination" placeholder="Enter Destination" className="border-[#4F4F4F] placeholder:text-[#4F4F4F]" />
              </div>
              {/* From Date */}
              <div className="flex flex-col gap-2" style={{ width: '225px' }}> {/* Width from Figma */}
                <Label htmlFor="from-date" className="font-manrope text-base font-extrabold text-[#4F4F4F]">From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-between text-left font-normal border-[#4F4F4F] text-[#4F4F4F]",
                        !fromDate && "text-muted-foreground"
                      )}
                    >
                      {fromDate ? format(fromDate, "dd - MM - yyyy") : <span>DD - MM - YYYY</span>}
                      <CalendarDays className="ml-auto h-4 w-4 opacity-50 text-[#0E2F3C]" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {/* To Date */}
              <div className="flex flex-col gap-2" style={{ width: '225px' }}> {/* Width from Figma */}
                <Label htmlFor="to-date" className="font-manrope text-base font-extrabold text-[#4F4F4F]">To</Label>
                 <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-between text-left font-normal border-[#4F4F4F] text-[#4F4F4F]",
                        !toDate && "text-muted-foreground"
                      )}
                    >
                      {toDate ? format(toDate, "dd - MM - yyyy") : <span>DD - MM - YYYY</span>}
                      <CalendarDays className="ml-auto h-4 w-4 opacity-50 text-[#0E2F3C]" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {/* Number of Travelers */}
              <div className="flex flex-col gap-2" style={{ width: '191px' }}> {/* Width from Figma */}
                <Label htmlFor="travelers" className="font-manrope text-base font-extrabold text-[#4F4F4F]">Number of Travelers</Label>
                <Input id="travelers" placeholder="Enter Number" type="number" className="border-[#4F4F4F] placeholder:text-[#4F4F4F]" />
              </div>
              {/* Search Button */}
              <Button className="bg-[#E09F3E] text-[#0E2F3C] font-manrope font-extrabold hover:bg-[#d08f2e]" style={{ width: '168px', height: '46px', alignSelf: 'flex-end' }}> {/* Width/Height from Figma */}
                Search
              </Button>
            </div>

            {/* Vacation Planning Banner */}
            <div className="flex items-center justify-between bg-[#0E2F3C] rounded-lg border border-[#0E2F3C] py-[15px] pl-12 pr-6"> {/* Padding from Figma */}
              <div className="flex items-center gap-3">
                <Image src="/images/vacation-bundle-icon.svg" alt="Bundle deal icon" width={60} height={60} /> {/* Adjusted size slightly */}
                <p className="font-manrope text-lg font-extrabold text-white tracking-wide"> {/* Style from Figma */}
                  Planning your next vacation?<br />
                  Book bundle deals on accommodations & flights and save up to 30%
                </p>
              </div>
              <Button className="bg-[#E09F3E] text-[#0E2F3C] font-manrope font-extrabold hover:bg-[#d08f2e] px-4 py-3 h-10"> {/* Style from Figma */}
                Explore Now!
              </Button>
            </div>

            {/* Results Info Row */}
            <div className="flex justify-between items-center mt-4"> {/* Added margin-top */}
              <p className="font-manrope text-lg text-[#0E2F3C]">
                Showing available options from: Feb. 10, 2025 - Feb. 16, 2025 {/* Placeholder text */}
              </p>
              <Select>
                <SelectTrigger className="w-[320px] border-[#0E2F3C] text-[#0E2F3C]"> {/* Width from Figma */}
                  <SelectValue placeholder={
                    <span className="flex flex-col items-start">
                      <span className="text-sm font-normal">Sort by</span>
                      <span className="text-base font-normal">Recommended</span>
                    </span>
                  } />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
        {/* Find Accommodation Section END */}

        {/* Filters and Results Section START */}
        <section className="mt-12 flex gap-10"> {/* 48px margin-top (mt-12), 40px gap (gap-10) */}
          {/* Filters Sidebar */}
          <AccommodationFilters />

          {/* Results Area */}
          <div className="flex-1 flex flex-col gap-6"> {/* Added flex-col and gap */}
            {/* Render cards using data, passing id, onSelect, and isSelected */}
            <AccommodationCard
              {...cardData1}
              onSelect={handleSelectCard}
              isSelected={selectedCardId === cardData1.id}
            />
            <AccommodationCard
              {...cardData2}
              onSelect={handleSelectCard}
              isSelected={selectedCardId === cardData2.id}
            />
            <AccommodationCard
              {...cardData3}
              onSelect={handleSelectCard}
              isSelected={selectedCardId === cardData3.id}
            />
            <AccommodationCard
              {...cardData4}
              onSelect={handleSelectCard}
              isSelected={selectedCardId === cardData4.id}
            />
            {/* TODO: Map over actual results data */}
          </div>
        </section>
        {/* Filters and Results Section END */}

        {/* Pagination START */}
        <div className="mt-12 flex justify-center"> {/* 48px margin-top and centering */}
          <Pagination>
            <PaginationContent>
              {/* Re-adding PaginationPrevious Item - Render only icon */}
              <PaginationItem>
                <PaginationPrevious href="#">
                  <ChevronLeft className="h-4 w-4" />
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                {/* Active page style */}
                <PaginationLink href="#" isActive className="bg-[#0E2F3C] text-white hover:bg-[#1c4a5f] hover:text-white">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
               <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              {/* Example Ellipsis if needed later */}
              {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}
              {/* Re-adding PaginationNext Item - Render only icon */}
              <PaginationItem>
                <PaginationNext href="#">
                   <ChevronRight className="h-4 w-4" />
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        {/* Pagination END */}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
