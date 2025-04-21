"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { Home, ChevronRight, CalendarDays, ChevronLeft } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// UI Components
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton" // Import Skeleton

// Custom Components
import AccommodationFilters from "@/components/accommodation-filters"
import AccommodationCard from "@/components/accommodation-card" // Assuming AccommodationCardProps is defined within this component now

// API & Types
import { fetchAccommodations } from "@/lib/api/accommodations"
import { Accommodation, FetchAccommodationsResponse } from "@/types/accommodation"

// Component to handle the main logic, wrapped in Suspense
function AccommodationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for search inputs
  const [destination, setDestination] = useState(searchParams.get('location') || '');
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined); // Keep date state for now, not used in mock API
  const [toDate, setToDate] = useState<Date | undefined>(undefined);     // Keep date state for now, not used in mock API
  const [numTravelers, setNumTravelers] = useState('');                 // Keep traveler state for now, not used in mock API

  // State for fetched data
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  });

  // Effect to fetch data when searchParams change
  useEffect(() => {
    const fetchAndSetData = async () => {
      setIsLoading(true);
      const params = {
        location: searchParams.get('location') || undefined,
        type: searchParams.get('type') || undefined,
        minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
        maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
        sortBy: searchParams.get('sort') || undefined,
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
        // Add other filters like amenities here if needed
      };

      try {
        const response: FetchAccommodationsResponse = await fetchAccommodations(params);
        setAccommodations(response.data);
        setPagination({
          totalItems: response.totalItems,
          totalPages: response.totalPages,
          currentPage: response.currentPage,
        });
      } catch (error) {
        console.error("Failed to fetch accommodations:", error);
        // Handle error state if necessary
        setAccommodations([]);
        setPagination({ totalItems: 0, totalPages: 1, currentPage: 1 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetData();
  }, [searchParams]); // Re-run effect when searchParams change

  // Function to update URL search parameters
  const updateSearchParams = (newParams: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '') {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    // Reset page to 1 if filters change, but not if only page changes
    const pageChanging = Object.keys(newParams).length === 1 && newParams.page !== undefined;
    if (!pageChanging) {
      current.set('page', '1');
    }

    router.push(`/accommodation?${current.toString()}`);
  };

  // Handler for the main search button
  const handleSearch = () => {
    updateSearchParams({ location: destination });
    // Add date/traveler params here if/when API supports them
  };

  // Handler for sort dropdown change
  const handleSortChange = (value: string) => {
    updateSearchParams({ sort: value });
  };

  // Handler for pagination change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
     updateSearchParams({ page: String(page) });
    }
  };

  // Handler for selecting/clicking a card
  const handleSelectCard = (id: string) => {
    router.push(`/accommodation/${id}`);
  };

  // Function to render pagination links
  const renderPagination = () => {
    const items = [];
    const maxPagesToShow = 5; // Adjust as needed
    const startPage = Math.max(1, pagination.currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(pagination.totalPages, startPage + maxPagesToShow - 1);

    // Previous Button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          href="#"
          onClick={(e) => { e.preventDefault(); handlePageChange(pagination.currentPage - 1); }}
          aria-disabled={pagination.currentPage <= 1}
          className={pagination.currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
        >
          <ChevronLeft className="h-4 w-4" />
        </PaginationPrevious>
      </PaginationItem>
    );

    // Ellipsis at start
    if (startPage > 1) {
      items.push(<PaginationItem key="start-ellipsis"><PaginationEllipsis /></PaginationItem>);
    }

    // Page Numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => { e.preventDefault(); handlePageChange(i); }}
            isActive={i === pagination.currentPage}
            className={i === pagination.currentPage ? "bg-[#0E2F3C] text-white hover:bg-[#1c4a5f] hover:text-white" : ""}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

     // Ellipsis at end
    if (endPage < pagination.totalPages) {
      items.push(<PaginationItem key="end-ellipsis"><PaginationEllipsis /></PaginationItem>);
    }

    // Next Button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          href="#"
          onClick={(e) => { e.preventDefault(); handlePageChange(pagination.currentPage + 1); }}
          aria-disabled={pagination.currentPage >= pagination.totalPages}
           className={pagination.currentPage >= pagination.totalPages ? "pointer-events-none opacity-50" : ""}
        >
          <ChevronRight className="h-4 w-4" />
        </PaginationNext>
      </PaginationItem>
    );

    return items;
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Breadcrumbs START */}
        <Breadcrumb className="mt-12 pb-4">
          {/* Breadcrumb content remains the same */}
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
        <section className="flex flex-col gap-8">
          {/* Title */}
          <h1 className="font-bricolage text-4xl font-bold text-[#0E2F3C]">
            Find your Perfect Accommodation
          </h1>

          {/* Form Area */}
          <div className="flex flex-col gap-4">
            {/* Inputs Row */}
            <div className="flex items-end gap-6">
              {/* Destination */}
              <div className="flex flex-col gap-2 flex-grow" style={{ maxWidth: '400px' }}>
                <Label htmlFor="destination" className="font-manrope text-base font-extrabold text-[#4F4F4F]">Your Destination</Label>
                <Input
                  id="destination"
                  placeholder="Enter Destination"
                  className="border-[#4F4F4F] placeholder:text-[#4F4F4F]"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Optional: search on Enter
                />
              </div>
              {/* From Date */}
              <div className="flex flex-col gap-2" style={{ width: '225px' }}>
                {/* From Date Popover - logic remains the same for now */}
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
                    <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              {/* To Date */}
              <div className="flex flex-col gap-2" style={{ width: '225px' }}>
                {/* To Date Popover - logic remains the same for now */}
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
                    <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              {/* Number of Travelers */}
              <div className="flex flex-col gap-2" style={{ width: '191px' }}>
                {/* Travelers Input - logic remains the same for now */}
                <Label htmlFor="travelers" className="font-manrope text-base font-extrabold text-[#4F4F4F]">Number of Travelers</Label>
                <Input
                  id="travelers"
                  placeholder="Enter Number"
                  type="number"
                  className="border-[#4F4F4F] placeholder:text-[#4F4F4F]"
                  value={numTravelers}
                  onChange={(e) => setNumTravelers(e.target.value)}
                 />
              </div>
              {/* Search Button */}
              <Button
                className="bg-[#E09F3E] text-[#0E2F3C] font-manrope font-extrabold hover:bg-[#d08f2e]"
                style={{ width: '168px', height: '46px', alignSelf: 'flex-end' }}
                onClick={handleSearch}
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {/* Vacation Planning Banner - remains the same */}
            <div className="flex items-center justify-between bg-[#0E2F3C] rounded-lg border border-[#0E2F3C] py-[15px] pl-12 pr-6">
              <div className="flex items-center gap-3">
                <Image src="/images/vacation-bundle-icon.svg" alt="Bundle deal icon" width={60} height={60} />
                <p className="font-manrope text-lg font-extrabold text-white tracking-wide">
                  Planning your next vacation?<br />
                  Book bundle deals on accommodations & flights and save up to 30%
                </p>
              </div>
              <Button className="bg-[#E09F3E] text-[#0E2F3C] font-manrope font-extrabold hover:bg-[#d08f2e] px-4 py-3 h-10">
                Explore Now!
              </Button>
            </div>

            {/* Results Info Row */}
            <div className="flex justify-between items-center mt-4">
              <p className="font-manrope text-lg text-[#0E2F3C]">
                {isLoading
                  ? 'Loading results...'
                  : `Showing ${accommodations.length > 0 ? ((pagination.currentPage - 1) * (searchParams.get('limit') ? Number(searchParams.get('limit')) : 4)) + 1 : 0}-${Math.min(pagination.currentPage * (searchParams.get('limit') ? Number(searchParams.get('limit')) : 4), pagination.totalItems)} of ${pagination.totalItems} results`
                }
                {/* TODO: Add date range display if API supports it */}
              </p>
              <Select
                value={searchParams.get('sort') || 'rating'} // Default to rating sort
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-[320px] border-[#0E2F3C] text-[#0E2F3C]">
                  <SelectValue placeholder={
                    <span className="flex flex-col items-start">
                      <span className="text-sm font-normal">Sort by</span>
                      {/* Dynamically show selected sort */}
                      <span className="text-base font-normal capitalize">
                        { (searchParams.get('sort') || 'rating').replace('-', ' ') }
                      </span>
                    </span>
                  } />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="recommended">Recommended</SelectItem> */} {/* Mock API doesn't have recommended */}
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
        {/* Find Accommodation Section END */}

        {/* Filters and Results Section START */}
        <section className="mt-12 flex gap-10">
          {/* Filters Sidebar */}
          {/* Pass updateSearchParams to filters to allow them to update URL */}
          <AccommodationFilters updateSearchParams={updateSearchParams} />

          {/* Results Area */}
          <div className="flex-1 flex flex-col gap-6">
            {isLoading ? (
              // Show Skeleton loaders while loading
              <>
                <Skeleton className="h-[250px] w-full rounded-lg" />
                <Skeleton className="h-[250px] w-full rounded-lg" />
                <Skeleton className="h-[250px] w-full rounded-lg" />
                <Skeleton className="h-[250px] w-full rounded-lg" />
              </>
            ) : accommodations.length > 0 ? (
              // Render fetched accommodation cards
              accommodations.map((accommodation) => (
                <AccommodationCard
                  key={accommodation.id}
                  // Pass props matching the Accommodation type and AccommodationCard expected props
                  // Assuming AccommodationCard now takes the full Accommodation object or specific props
                  // Adjust based on AccommodationCard's actual props definition
                  id={accommodation.id}
                  images={accommodation.images}
                  host={accommodation.host}
                  rating={accommodation.rating}
                  reviews={accommodation.reviews}
                  propertyName={accommodation.propertyName}
                  location={accommodation.location}
                  features={accommodation.features}
                  discount={accommodation.discount}
                  originalPrice={accommodation.originalPrice}
                  currentPrice={accommodation.currentPrice}
                   priceType={accommodation.priceType}
                   onSelect={handleSelectCard} // Pass the handler
                   // isSelected is not needed for basic navigation on click
                 />
               ))
            ) : (
              // Show message if no results found
              <p className="text-center text-gray-500 py-10">No accommodations found matching your criteria.</p>
            )}
          </div>
        </section>
        {/* Filters and Results Section END */}

        {/* Pagination START */}
        {pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                {renderPagination()}
              </PaginationContent>
            </Pagination>
          </div>
        )}
        {/* Pagination END */}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Wrap the main content component with Suspense for useSearchParams
export default function AccommodationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}> {/* Basic fallback */}
      <AccommodationPageContent />
    </Suspense>
  );
}
