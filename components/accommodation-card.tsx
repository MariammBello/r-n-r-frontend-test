"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator" // Add Separator
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Star,
  Home, // Keep Home for property name icon
  Building2, // Add Building2 for Avatar fallback
  CalendarCheck,
  Undo2,
  Accessibility,
  Briefcase,
  ShoppingCart,
  MessageCircle, // Placeholder for custom chat icon
  Ban, // Added for "No Reservation"
  ShieldCheck, // Added for "Refundable caution deposit"
  Users, // Added for "Family-friendly"
  LucideIcon, // Import type for icon mapping
} from "lucide-react"
import { cn } from "@/lib/utils" // Import cn utility

// Define Props Interface
interface Feature {
  // Keep icon optional for now, map by text
  text: string;
}

interface Host {
  name: string;
  title: string;
  avatar: string;
  isVerified: boolean;
}

export interface AccommodationCardProps { // Added export
  images: string[];
  host: Host;
  rating: number;
  reviews: number;
  propertyName: string;
  location: string;
  features: Feature[]; // Use the simpler Feature interface for now
  discount?: number; // Optional
  originalPrice?: number; // Optional
  currentPrice: number;
  priceType: "Regular" | "Premium"; // Specific types
  isSelected?: boolean; // Optional selected state
  id: string; // Add unique ID prop
  onSelect: (id: string) => void; // Add selection handler prop
}

// Map feature text to icons (adjust as needed)
const featureIconMap: { [key: string]: LucideIcon } = {
  "Reservation available": CalendarCheck,
  "Fully Refundable": Undo2,
  "Accessibility options": Accessibility,
  "Suitable for Businesses": Briefcase,
  "No Reservation": Ban,
  "Refundable caution deposit": ShieldCheck,
  "Family-friendly": Users,
  // Add more mappings if needed
};

// Remove placeholder data block entirely

export default function AccommodationCard(props: AccommodationCardProps) { // Accept props
  const {
    images,
    host,
    rating,
    reviews,
    propertyName,
    location,
    features,
    discount,
    originalPrice,
    currentPrice,
    priceType,
    isSelected = false, // Default isSelected to false
    id, // Destructure id
    onSelect, // Destructure onSelect
  } = props // Use props

  return (
    // Add onClick handler and conditional border
    <Card
      className={cn(
        "w-full border border-[#BDBDBD] rounded-lg overflow-hidden flex cursor-pointer transition-all duration-200", // Added cursor and transition
        isSelected && "border-2 border-[#E09F3E] shadow-md" // Enhanced selected style
      )}
      onClick={() => onSelect(id)} // Call onSelect with id when clicked
    >
      {/* Image Carousel */}
      <div className="w-[398px] flex-shrink-0"> {/* Width from Figma */}
        {/* Added relative positioning for controls */}
        <Carousel className="w-full h-[350px] relative">
          <CarouselContent className="h-full">
            {images.map((src, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={src}
                    alt={`${propertyName} image ${index + 1}`}
                    width={398} // Explicit width
                    height={350} // Explicit height
                    className="w-full h-full object-cover" // Use Tailwind for sizing/fit
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Styled Previous/Next buttons */}
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none hover:bg-black/70 h-8 w-8" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none hover:bg-black/70 h-8 w-8" />
           {/* Basic Dot Indicators */}
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              // TODO: Add active state logic based on current slide
              <div key={index} className={`h-1.5 w-1.5 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/50'}`} />
            ))}
          </div>
        </Carousel>
      </div>

      {/* Details Section */}
      {/* Removed flex flex-col again, relying on block flow and margins */}
      <CardContent className="p-6">
        {/* Top Section: Host & Rating */}
        <div className="flex justify-between items-start mb-4">
          {/* Host Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={host.avatar} alt={`${host.name} avatar`} />
              {/* Changed fallback icon to Building2 */}
              <AvatarFallback><Building2 size={24} className="text-gray-500" /></AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-manrope font-extrabold text-base text-[#0E2F3C]">Hosted by {host.name}</span>
                {host.isVerified && <CheckCircle2 size={16} className="text-[#27AE60]" />}
              </div>
              <span className="font-manrope text-sm text-[#27AE60]">{host.title}</span>
            </div>
          </div>
          {/* Rating */}
          {/* Added min-w-[150px] for potentially more stable alignment */}
          <div className="flex flex-col items-end min-w-[150px]">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={` ${i < rating ? 'text-[#E09F3E] fill-[#E09F3E]' : 'text-gray-300'}`} />
              ))}
            </div>
            <a href="#" className="font-manrope text-sm text-[#4F4F4F] underline mt-1">
              See all {reviews} Reviews
            </a>
          </div>
        </div>

        {/* Separator after Top Section */}
        <Separator className="my-4 bg-[#BDBDBD]" />

        {/* Combined Middle/Bottom Section */}
        {/* Property Name/Location first */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Home size={20} className="text-[#0E2F3C]" />
            <h3 className="font-bricolage text-xl font-bold text-[#0E2F3C]">{propertyName}</h3>
          </div>
          <p className="font-manrope text-sm text-[#828282] ml-7">{location}</p> {/* Aligned with name */}
        </div>

        {/* Features (Left) and Chat/Price (Right) Row */}
        {/* Removed justify-between, kept items-start */}
        <div className="flex items-start">
          {/* Left: Features & Discount - Added flex-grow */}
          <div className="flex flex-col gap-2 flex-grow mr-4"> {/* Added flex-grow and right margin */}
            {/* Features List - Updated to use featureIconMap */}
            {features.map((feature, index) => {
              const Icon = featureIconMap[feature.text]; // Look up icon
              return (
                <div key={index} className="flex items-center gap-2">
                  {Icon ? ( // Render icon if found
                    <Icon size={16} className="text-[#E09F3E]" />
                  ) : ( // Optional: Render a placeholder or nothing if icon not found
                    <div className="w-4 h-4" /> // Placeholder space
                  )}
                  <span className="font-manrope text-sm text-[#0E2F3C]">{feature.text}</span>
                </div>
              );
            })}
            {/* Discount Badge - Added check for discount existence */}
            {discount && discount > 0 && (
              <Badge className="bg-[#E09F3E] text-[#0E2F3C] font-manrope font-extrabold w-fit px-2 py-1 mt-2"> {/* Added margin-top */}
                {discount}% off
              </Badge>
            )}
          </div>

          {/* Right: Chat Icon & Price Info - Reverted: Removed h-full and justify-between */}
          <div className="flex flex-col items-end flex-shrink-0"> {/* Removed h-full, justify-between */}
            {/* Chat Icon */}
            <Button variant="outline" size="icon" className="rounded-full border-[#0E2F3C] text-[#0E2F3C] h-12 w-12">
              <MessageCircle size={24} />
            </Button>

            {/* Price Info */}
            <div className="flex flex-col items-end"> {/* Align price text right */}
              <div className="flex items-center gap-2">
                <ShoppingCart size={16} className="text-[#0E2F3C]" />
                {originalPrice && currentPrice < originalPrice && (
                  <span className="font-manrope text-sm text-[#0E2F3C] line-through">
                    ₦{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="font-manrope text-xl font-extrabold text-[#0E2F3C] mt-1"> {/* Added margin-top */}
                ₦{currentPrice.toLocaleString()}
              </span>
              <div className="flex items-center gap-1">
                 <span className="font-manrope text-base text-[#828282]">Price is per night</span>
                 <span className={`font-manrope text-sm font-extrabold ${priceType === 'Premium' ? 'text-green-600' : 'text-blue-600'}`}>
                    {priceType}
                 </span>
              </div>
           </div> {/* Closing div for Price Info Block */}
          </div> {/* Closing div for Right Column (Chat/Price) */}
        </div> {/* Closing div for Features/Chat/Price Row */}
      </CardContent>
    </Card>
  )
}
