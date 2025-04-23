"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Accommodation } from "@/types/accommodation" // Import Accommodation type if needed for type mapping

// Define the props for the component, including the callback function
interface AccommodationFiltersProps {
  updateSearchParams: (newParams: Record<string, string | null>) => void;
}

// Map display names to potential API values (adjust as needed)
const typeMap: Record<string, Accommodation['type']> = {
  "Apartment": "apartment",
  "Duplex": "duplex",
  "Condo": "apartment", // Map Condo to apartment for now
  "Hotel": "resort", // Map Hotel to resort
  "Chalet": "villa", // Map Chalet to villa
  "Room/Bedsitter": "bungalow", // Map Room/Bedsitter to bungalow
  // Add mappings for Mansion, Villa if they appear in display list
};

// Placeholder data for filters - Use consistent casing and map to API values later
const accommodationTypesDisplay = ["Apartment", "Duplex", "Mansion", "Villa", "Resort", "Bungalow"]; // Match types in mock data/API
const amenitiesDisplay = ["Pool", "Restaurant", "Gym", "Spa", "Kitchen", "Free Wi-Fi", "Parking", "Ocean view"]; // Example amenities
const accessibilityOptionsDisplay = ["Roll-in shower", "Stair-free entrance", "Accessible bathrooms", "Wheelchair accessible parking"];
const hostLanguagesDisplay = ["English", "Igbo", "Yoruba", "Pidgin", "Swahili", "Afrikaans"];
const bookingOptionsDisplay = ["Adults only", "Party friendly", "Family friendly", "Children friendly", "Business friendly"];
const ratingsOptionsDisplay = ["Guest favourite", "Star rating", "Recommendations"];

// Default price range values
const MIN_PRICE = 0;
const MAX_PRICE = 600000; // Increased max price based on mock data

export default function AccommodationFilters({ updateSearchParams }: AccommodationFiltersProps) {
  const searchParams = useSearchParams();

  // State for filters
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());
  const [selectedAccessibility, setSelectedAccessibility] = useState<Set<string>>(new Set());
  const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set());
  const [selectedBookingOptions, setSelectedBookingOptions] = useState<Set<string>>(new Set());
  const [selectedRatings, setSelectedRatings] = useState<Set<string>>(new Set());

  // Effect to initialize state from URL search params
  useEffect(() => {
    const typesFromUrl = searchParams.get('type')?.split(',') || [];
    setSelectedTypes(new Set(typesFromUrl));

    const minPriceFromUrl = searchParams.get('minPrice');
    const maxPriceFromUrl = searchParams.get('maxPrice');
    setPriceRange([
      minPriceFromUrl ? Number(minPriceFromUrl) : MIN_PRICE,
      maxPriceFromUrl ? Number(maxPriceFromUrl) : MAX_PRICE
    ]);

    const amenitiesFromUrl = searchParams.get('amenities')?.split(',') || [];
    setSelectedAmenities(new Set(amenitiesFromUrl));

    const accessibilityFromUrl = searchParams.get('accessibility')?.split(',') || [];
    setSelectedAccessibility(new Set(accessibilityFromUrl));

    const languagesFromUrl = searchParams.get('language')?.split(',') || [];
    setSelectedLanguages(new Set(languagesFromUrl));

    const bookingFromUrl = searchParams.get('booking')?.split(',') || [];
    setSelectedBookingOptions(new Set(bookingFromUrl));

    const ratingsFromUrl = searchParams.get('rating_type')?.split(',') || []; // e.g., rating_type=favourite,star
    setSelectedRatings(new Set(ratingsFromUrl));

  }, [searchParams]);


  // Handlers for filter changes
  const handleTypeChange = (typeValue: string, checked: boolean | string) => {
    setSelectedTypes(prev => {
      const next = new Set(prev);
      if (checked) {
        next.add(typeValue);
      } else {
        next.delete(typeValue);
      }
      return next;
    });
  };

  const handleAmenityChange = (amenityValue: string, checked: boolean | string) => {
     setSelectedAmenities(prev => {
      const next = new Set(prev);
      if (checked) {
        next.add(amenityValue);
      } else {
        next.delete(amenityValue);
      }
      return next;
    });
  };

  // Generic handler for checkbox groups
  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    value: string,
    checked: boolean | string
  ) => {
    setter(prev => {
      const next = new Set(prev);
      if (checked) {
        next.add(value);
      } else {
        next.delete(value);
      }
      return next;
    });
  };


  // Handler for Apply Filter button
  const handleApplyFilters = () => {
    const params: Record<string, string | null> = {};

    params.type = selectedTypes.size > 0 ? Array.from(selectedTypes).join(',') : null;
    params.amenities = selectedAmenities.size > 0 ? Array.from(selectedAmenities).join(',') : null;
    params.accessibility = selectedAccessibility.size > 0 ? Array.from(selectedAccessibility).join(',') : null;
    params.language = selectedLanguages.size > 0 ? Array.from(selectedLanguages).join(',') : null;
    params.booking = selectedBookingOptions.size > 0 ? Array.from(selectedBookingOptions).join(',') : null;
    params.rating_type = selectedRatings.size > 0 ? Array.from(selectedRatings).join(',') : null;


    // Only add price filters if they differ from the default min/max
    params.minPrice = priceRange[0] > MIN_PRICE ? String(priceRange[0]) : null;
    params.maxPrice = priceRange[1] < MAX_PRICE ? String(priceRange[1]) : null;

    updateSearchParams(params);
  };

  // Handler for Clear Filters button
  const handleClearFilters = () => {
     setSelectedTypes(new Set());
     setPriceRange([MIN_PRICE, MAX_PRICE]);
     setSelectedAmenities(new Set());
     setSelectedAccessibility(new Set());
     setSelectedLanguages(new Set());
     setSelectedBookingOptions(new Set());
     setSelectedRatings(new Set());

     // Update URL to remove filter params
     updateSearchParams({
       type: null,
       minPrice: null,
       maxPrice: null,
       amenities: null,
       accessibility: null,
       language: null,
       booking: null,
       rating_type: null,
     });
  };

  // TODO: Implement "See more" functionality for filters if needed

  return (
    <Card className="w-[348px] border-none shadow-lg rounded-lg sticky top-6"> {/* Added sticky positioning */}
      <CardHeader className="p-6 pb-4">
        <CardTitle className="font-bricolage text-2xl font-bold text-[#0E2F3C]">Filter by</CardTitle>
      </CardHeader>
      <Separator className="bg-[#E0E0E0]" /> {/* Lighter separator */}

      <CardContent className="flex flex-col max-h-[calc(100vh-10rem)] overflow-y-auto"> {/* Added max-height and scroll */}
        {/* Type of Accommodation */}
        <div className="px-6 py-4 flex flex-col gap-3"> {/* Adjusted padding/gap */}
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Type</Label>
          <div className="flex flex-col gap-3">
            {accommodationTypesDisplay.map((displayType) => {
              const apiValue = typeMap[displayType] || displayType.toLowerCase(); // Get API value or default
              return (
                <div key={apiValue} className="flex items-center space-x-3">
                  <Checkbox
                    id={`type-${apiValue}`}
                    checked={selectedTypes.has(apiValue)}
                    onCheckedChange={(checked) => handleTypeChange(apiValue, checked)}
                    className="h-5 w-5 border-[#828282] data-[state=checked]:bg-[#0E2F3C] data-[state=checked]:text-white" // Adjusted style
                  />
                  <Label htmlFor={`type-${apiValue}`} className="font-manrope text-base font-normal text-[#4F4F4F]">
                    {displayType}
                  </Label>
                </div>
              );
            })}
          </div>
          {/* <Button variant="link" className="text-[#E09F3E] font-manrope font-extrabold p-0 h-auto justify-start self-start mt-1"> See more </Button> */}
        </div>
        <Separator className="bg-[#E0E0E0]" />

        {/* Price */}
        <div className="px-6 py-4 flex flex-col gap-3">
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Price Range</Label>
          <Slider
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={10000} // Larger step
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="[&>span:first-child]:h-1 [&>span:first-child]:bg-gray-200 [&>span:first-child>span]:bg-[#E09F3E] [&_[role=slider]]:bg-[#E09F3E] [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-0" // Adjusted styles
          />
           <div className="flex justify-between text-sm text-[#4F4F4F] font-manrope">
             <span>₦{priceRange[0].toLocaleString()}</span>
             <span>₦{priceRange[1].toLocaleString()}{priceRange[1] >= MAX_PRICE ? '+' : ''}</span>
           </div>
        </div>
        <Separator className="bg-[#E0E0E0]" />

        {/* Amenities */}
        <div className="px-6 py-4 flex flex-col gap-3">
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Amenities</Label>
           <div className="flex flex-col gap-3">
            {amenitiesDisplay.slice(0, 6).map((amenity) => { // Show initial items
              const amenityValue = amenity.toLowerCase().replace(' ', '-'); // Simple value generation
              return (
                <div key={amenityValue} className="flex items-center space-x-3">
                  <Checkbox
                    id={`amenity-${amenityValue}`}
                    checked={selectedAmenities.has(amenityValue)}
                    onCheckedChange={(checked) => handleAmenityChange(amenityValue, checked)}
                    className="h-5 w-5 border-[#828282] data-[state=checked]:bg-[#0E2F3C] data-[state=checked]:text-white"
                  />
                  <Label htmlFor={`amenity-${amenityValue}`} className="font-manrope text-base font-normal text-[#4F4F4F]">
                    {amenity}
                  </Label>
                </div>
              );
            })}
          </div>
          {/* <Button variant="link" className="text-[#E09F3E] font-manrope font-extrabold p-0 h-auto justify-start self-start mt-1"> See more </Button> */}
        </div>
        <Separator className="bg-[#E0E0E0]" />

        {/* Accessibility Options */}
        <div className="px-6 py-4 flex flex-col gap-3">
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Accessibility Options</Label>
          <div className="flex flex-col gap-3">
            {accessibilityOptionsDisplay.slice(0, 4).map((option) => { // Show initial items
              const value = option.toLowerCase().replace(/ /g, '-');
              return (
                <div key={value} className="flex items-center space-x-3">
                  <Checkbox
                    id={`access-${value}`}
                    checked={selectedAccessibility.has(value)}
                    onCheckedChange={(checked) => handleCheckboxChange(setSelectedAccessibility, value, checked)}
                    className="h-5 w-5 border-[#828282] data-[state=checked]:bg-[#0E2F3C] data-[state=checked]:text-white"
                  />
                  <Label htmlFor={`access-${value}`} className="font-manrope text-base font-normal text-[#4F4F4F]">
                    {option}
                  </Label>
                </div>
              );
            })}
          </div>
           <Button variant="link" className="text-[#E09F3E] font-manrope font-extrabold p-0 h-auto justify-start self-start mt-1"> See more </Button>
        </div>
        <Separator className="bg-[#E0E0E0]" />

        {/* Host Language Options */}
        <div className="px-6 py-4 flex flex-col gap-3">
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Host Language Options</Label>
          <div className="flex flex-col gap-3">
            {hostLanguagesDisplay.slice(0, 6).map((lang) => { // Show initial items
              const value = lang.toLowerCase();
              return (
                <div key={value} className="flex items-center space-x-3">
                  <Checkbox
                    id={`lang-${value}`}
                    checked={selectedLanguages.has(value)}
                    onCheckedChange={(checked) => handleCheckboxChange(setSelectedLanguages, value, checked)}
                    className="h-5 w-5 border-[#828282] data-[state=checked]:bg-[#0E2F3C] data-[state=checked]:text-white"
                  />
                  <Label htmlFor={`lang-${value}`} className="font-manrope text-base font-normal text-[#4F4F4F]">
                    {lang}
                  </Label>
                </div>
              );
            })}
          </div>
           <Button variant="link" className="text-[#E09F3E] font-manrope font-extrabold p-0 h-auto justify-start self-start mt-1"> See more </Button>
        </div>
        <Separator className="bg-[#E0E0E0]" />

        {/* Booking Options */}
        <div className="px-6 py-4 flex flex-col gap-3">
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Booking Options</Label>
          <div className="flex flex-col gap-3">
            {bookingOptionsDisplay.slice(0, 5).map((option) => { // Show initial items
              const value = option.toLowerCase().replace(/ /g, '-');
              return (
                <div key={value} className="flex items-center space-x-3">
                  <Checkbox
                    id={`booking-${value}`}
                    checked={selectedBookingOptions.has(value)}
                    onCheckedChange={(checked) => handleCheckboxChange(setSelectedBookingOptions, value, checked)}
                    className="h-5 w-5 border-[#828282] data-[state=checked]:bg-[#0E2F3C] data-[state=checked]:text-white"
                  />
                  <Label htmlFor={`booking-${value}`} className="font-manrope text-base font-normal text-[#4F4F4F]">
                    {option}
                  </Label>
                </div>
              );
            })}
          </div>
           <Button variant="link" className="text-[#E09F3E] font-manrope font-extrabold p-0 h-auto justify-start self-start mt-1"> See more </Button>
        </div>
        <Separator className="bg-[#E0E0E0]" />

        {/* Ratings & Reviews */}
        <div className="px-6 py-4 flex flex-col gap-3">
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Ratings & Reviews</Label>
          <div className="flex flex-col gap-3">
            {ratingsOptionsDisplay.map((option) => {
              const value = option.toLowerCase().replace(/ /g, '-');
              return (
                <div key={value} className="flex items-center space-x-3">
                  <Checkbox
                    id={`rating-${value}`}
                    checked={selectedRatings.has(value)}
                    onCheckedChange={(checked) => handleCheckboxChange(setSelectedRatings, value, checked)}
                    className="h-5 w-5 border-[#828282] data-[state=checked]:bg-[#0E2F3C] data-[state=checked]:text-white"
                  />
                  <Label htmlFor={`rating-${value}`} className="font-manrope text-base font-normal text-[#4F4F4F]">
                    {option}
                  </Label>
                </div>
              );
            })}
          </div>
          {/* No "See more" for ratings */}
        </div>
        {/* Removed separator after last filter section */}

        {/* Action Buttons */}
        <div className="px-6 pt-4 pb-4 flex items-center justify-between sticky bottom-0 bg-white border-t border-[#E0E0E0] mt-4"> {/* Added margin-top */}
           <Button
             variant="link"
             className="text-[#0E2F3C] font-manrope font-extrabold p-0 h-auto hover:text-[#E09F3E]"
             onClick={handleClearFilters}
           >
            Clear all
          </Button>
           <Button
             className="bg-[#0E2F3C] text-white font-manrope font-extrabold hover:bg-[#1c4a5f] px-6 py-2 h-10 rounded-md" // Adjusted style
             onClick={handleApplyFilters}
           >
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
