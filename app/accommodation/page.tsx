"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { Home, ChevronRight, CalendarDays, ChevronLeft } from "lucide-react" // Keep CalendarDays for potential use elsewhere if needed
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// UI Components
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
// Removed Label, Input, Popover, Calendar imports
import { Button } from "@/components/ui/button" // Keep Button for Vacation Banner
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"

// Custom Components
import AccommodationFilters from "@/components/accommodation-filters"
import AccommodationCard from "@/components/accommodation-card"
import AccommodationSearchBar from "@/components/AccommodationSearchBar";
import PromoBanner2 from "@/components/promo-banner"; // Import the reusable banner

// API & Types
import { fetchAccommodations } from "@/lib/api/accommodations"
import { Accommodation, FetchAccommodationsResponse } from "@/types/accommodation"
import VacationPlanningBanner from "@/components/vacation-planning-banner"

// Component to handle the main logic, wrapped in Suspense
function AccommodationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for fetched data ONLY
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
        // TODO: Add date and traveler params from searchParams if AccommodationSearchBar adds them
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
        setAccommodations([]);
        setPagination({ totalItems: 0, totalPages: 1, currentPage: 1 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetData();
  }, [searchParams]);

  // Function to update URL search parameters (used by Filters and Pagination)
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
    const maxPagesToShow = 5;
    const startPage = Math.max(1, pagination.currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(pagination.totalPages, startPage + maxPagesToShow - 1);

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

    if (startPage > 1) {
      items.push(<PaginationItem key="start-ellipsis"><PaginationEllipsis /></PaginationItem>);
    }

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

     if (endPage < pagination.totalPages) {
      items.push(<PaginationItem key="end-ellipsis"><PaginationEllipsis /></PaginationItem>);
    }

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
      <Header />
      <main className="w-full mx-auto px-[60px]">
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

        <section className="flex flex-col gap-8">
          <h1 className="font-bricolage text-4xl font-bold text-[#0E2F3C]">
            Find your Perfect Accommodation
          </h1>

          <div className="flex flex-col gap-4">
            {/* Use the new reusable search bar component */}
            <AccommodationSearchBar />

            {/* Use reusable PromoBanner for Vacation Planning */}
            <VacationPlanningBanner/>

            {/* Results Info Row */}
            <div className="flex justify-between items-center mt-4">
              <p className="font-manrope text-lg text-[#0E2F3C]">
                {isLoading
                  ? 'Loading results...'
                  : `Showing ${accommodations.length > 0 ? ((pagination.currentPage - 1) * (searchParams.get('limit') ? Number(searchParams.get('limit')) : 4)) + 1 : 0}-${Math.min(pagination.currentPage * (searchParams.get('limit') ? Number(searchParams.get('limit')) : 4), pagination.totalItems)} of ${pagination.totalItems} results`
                }
              </p>
              <Select
                value={searchParams.get('sort') || 'rating'}
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-[320px] border-[#0E2F3C] text-[#0E2F3C]">
                  <SelectValue placeholder={
                    <span className="flex flex-col items-start">
                      <span className="text-sm font-normal">Sort by</span>
                      <span className="text-base font-normal capitalize">
                        { (searchParams.get('sort') || 'rating').replace('-', ' ') }
                      </span>
                    </span>
                  } />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="mt-12 flex gap-10">
          <AccommodationFilters updateSearchParams={updateSearchParams} />
          <div className="flex-1 flex flex-col gap-6">
            {isLoading ? (
              <>
                <Skeleton className="h-[250px] w-full rounded-lg" />
                <Skeleton className="h-[250px] w-full rounded-lg" />
                <Skeleton className="h-[250px] w-full rounded-lg" />
                <Skeleton className="h-[250px] w-full rounded-lg" />
              </>
            ) : accommodations.length > 0 ? (
              accommodations.map((accommodation) => (
                <AccommodationCard
                  key={accommodation.id}
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
                   onSelect={handleSelectCard}
                 />
               ))
            ) : (
              <p className="text-center text-gray-500 py-10">No accommodations found matching your criteria.</p>
            )}
          </div>
        </section>

        {pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                {renderPagination()}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// Wrap the main content component with Suspense for useSearchParams
export default function AccommodationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccommodationPageContent />
    </Suspense>
  );
}
