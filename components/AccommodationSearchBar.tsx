"use client"; // Needs to be a client component for state and hooks

import React, { useState } from "react"; // Import useState
import { useRouter, useSearchParams } from 'next/navigation'; // Import hooks
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
// import { Label } from "@/components/ui/label"; // Label is not used
import { CalendarDays, MapPin, Search } from "lucide-react"; // Consolidated icon imports
import { format, addDays, isValid } from "date-fns"; // Consolidated date-fns imports
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export default function AccommodationSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for search inputs
  const [destination, setDestination] = useState(searchParams.get('location') || '');
  // TODO: Initialize dates from URL params
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [numTravelers, setNumTravelers] = useState('');

   // --- Handlers ---
   const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (destination.trim()) {
      queryParams.set('location', destination.trim());
    }
    // TODO: Add date and traveler params if implementing filtering
    // if (dateRange?.from) queryParams.set('checkIn', format(dateRange.from, 'yyyy-MM-dd'));
    // if (dateRange?.to) queryParams.set('checkOut', format(dateRange.to, 'yyyy-MM-dd'));
    // if (numTravelers) queryParams.set('guests', numTravelers);

    // Always navigate to the base accommodation page for a new search from here
    router.push(`/accommodation?${queryParams.toString()}`);
  };

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

   const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

   // Format date display
  const formatDateDisplay = (date: Date | undefined): string => {
    return date && isValid(date) ? format(date, "dd - MM - yyyy") : "DD - MM - YYYY";
  };
  // --- End Handlers ---

  return (
    <div className="flex items-end gap-6">
      {/* Destination Input */}
      <div className="flex flex-col gap-2 flex-grow" style={{ maxWidth: '400px' }}>
        <span className="font-manrope text-base font-extrabold text-[#4F4F4F]">Your Destination</span>
        {/* Removed relative div and MapPin icon, adjusted padding */}
        <Input
          id="destination-search"
          placeholder="Enter Destination"
          className="border-[#4F4F4F] placeholder:text-[#4F4F4F] h-[46px] py-[12px] px-[12px] rounded-[4px] focus:outline-none focus:border-[#0e2f3c]" // Adjusted padding (px-[12px])
          value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        {/* Removed closing div for relative positioning */}
      </div>
      {/* From Date */}
      <div className="flex flex-col gap-2" style={{ width: '225px' }}>
        <span className="font-manrope text-base font-extrabold text-[#4F4F4F]">From</span>
        <Popover>
          {/* Add asChild to pass trigger props to the Button */}
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-between text-left font-normal border-[#4F4F4F] text-[#4F4F4F] h-[46px] py-[12px] px-[16px] rounded-[4px]",
                 !dateRange?.from && "text-muted-foreground" // Use dateRange state
              )}
            >
              {formatDateDisplay(dateRange?.from)} {/* Use state */}
              <CalendarDays className="ml-auto h-4 w-4 opacity-50 text-[#0E2F3C]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range" // Use range mode
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={1}
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* To Date */}
       <div className="flex flex-col gap-2" style={{ width: '225px' }}>
         <span className="font-manrope text-base font-extrabold text-[#4F4F4F]">To</span>
         <Popover>
           {/* Add asChild to pass trigger props to the Button */}
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-between text-left font-normal border-[#4F4F4F] text-[#4F4F4F] h-[46px] py-[12px] px-[16px] rounded-[4px]",
                 !dateRange?.to && "text-muted-foreground" // Use dateRange state
              )}
            >
               {formatDateDisplay(dateRange?.to)} {/* Use state */}
              <CalendarDays className="ml-auto h-4 w-4 opacity-50 text-[#0E2F3C]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
             <Calendar
              mode="range" // Use range mode
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={1}
              disabled={{ before: dateRange?.from ? addDays(dateRange.from, 1) : new Date() }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* Number of Travelers */}
      <div className="flex flex-col gap-2" style={{ width: '191px' }}>
        <span className="font-manrope text-base font-extrabold text-[#4F4F4F]">Number of Travelers</span>
        <Input
          id="travelers-search"
          placeholder="Enter Number"
          type="number"
          className="border-[#4F4F4F] placeholder:text-[#4F4F4F] h-[46px] py-[12px] px-[12px] rounded-[4px] focus:outline-none focus:border-[#0e2f3c]"
          value={numTravelers}
          onChange={(e) => setNumTravelers(e.target.value)}
         />
      </div>
      {/* Search Button */}
      <Button
        className="bg-[#E09F3E] text-[#0E2F3C] font-manrope font-extrabold hover:bg-[#d08f2e] h-[46px] py-[12px] px-[16px] rounded-lg self-end w-[168px]"
        onClick={handleSearch}
        // disabled={isLoading} // No loading state in this component
      >
        Search
        <Search className="ml-2" size={18} /> {/* Added icon */}
      </Button>
    </div>
  );
}
