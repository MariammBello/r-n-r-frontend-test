import Link from "next/link";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button"; // Keep for potential future buttons here
import { Home, ChevronRight, Star, Share2, Heart } from "lucide-react";

interface ListingHeaderProps {
  propertyName: string;
  location: string;
  rating: number;
  reviews: number;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
  propertyName,
  location,
  rating,
  reviews,
}) => {
  return (
    <>
      {/* Breadcrumbs START */}
      <Breadcrumb className="mb-6">
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
            <BreadcrumbPage className="font-extrabold text-[#0e2f3c]">{propertyName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Breadcrumbs END */}

      {/* --- Top Section: Title, Actions, Rating --- */}
      <section className="mb-6">
        <h1 className="font-bricolage text-3xl md:text-4xl font-bold text-[#0E2F3C] mb-2">{propertyName}</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
          {/* Location & Rating */}
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <Link href="#" className="font-manrope text-sm md:text-base text-[#4F4F4F] underline hover:text-[#0E2F3C]">{location}</Link>
            <span className="text-[#828282] hidden md:inline">•</span>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-[#E09F3E] fill-[#E09F3E]" />
              <span className="font-manrope text-sm md:text-base font-bold text-[#0E2F3C]">{rating.toFixed(1)}</span>
              <Link href="#reviews" className="font-manrope text-sm md:text-base text-[#4F4F4F] underline hover:text-[#0E2F3C]">({reviews} reviews)</Link>
            </div>
          </div>
          {/* Action Buttons - Moved below gallery */}
        </div>
      </section>
      {/* --- End Top Section --- */}
    </>
  );
};

export default ListingHeader;
