"use client"; // Need client component for state and effects

import { useState, useMemo } from "react"; // Import hooks (Removed useEffect)
import { useRouter } from 'next/navigation'; // Import router for navigation
import Link from "next/link"; // Keep Link for Report button
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarDays, MinusCircle, PlusCircle, Info, ShoppingCart } from "lucide-react";
import { DateRange } from "react-day-picker"; // Import DateRange
import { format, differenceInCalendarDays, isValid, addDays } from "date-fns"; // Import date-fns functions
import { cn } from "@/lib/utils"; // Import cn utility

interface BookingCardProps {
  accommodationId: string;
  currentPrice: number;
}

const BookingCard: React.FC<BookingCardProps> = ({
  accommodationId,
  currentPrice,
}) => {
  const router = useRouter();

  // State for booking details
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [guests, setGuests] = useState<number>(2);
  const [units, setUnits] = useState<number>(1);

  const nights = useMemo(() => {
    if (dateRange?.from && dateRange?.to && isValid(dateRange.from) && isValid(dateRange.to)) {
      return differenceInCalendarDays(dateRange.to, dateRange.from);
    }
    return 0;
  }, [dateRange]);

  const subtotal = useMemo(() => {
    return currentPrice * nights * units;
  }, [currentPrice, nights, units]);

  const cautionDeposit = 100000;
  const serviceCharge = 30000;
  const vat = 22500;

  const totalCost = useMemo(() => {
    if (nights > 0) {
      return subtotal + cautionDeposit + serviceCharge + vat;
    }
    return 0;
  }, [subtotal, cautionDeposit, serviceCharge, vat, nights]);

  const handleGuestChange = (increment: number) => {
    setGuests((prev) => Math.max(1, prev + increment));
  };

  const handleUnitChange = (increment: number) => {
    setUnits((prev) => Math.max(1, prev + increment));
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handlePayNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default Link behavior if needed

    if (!dateRange?.from || !dateRange?.to || nights <= 0) {
      alert("Please select valid check-in and check-out dates.");
      return;
    }

    // Construct query parameters
    const queryParams = new URLSearchParams({
      checkIn: format(dateRange.from, 'yyyy-MM-dd'),
      checkOut: format(dateRange.to, 'yyyy-MM-dd'),
      guests: String(guests),
      units: String(units),
      nights: String(nights),
      subtotal: String(subtotal),
      totalCost: String(totalCost),
      // Include cautionDeposit, serviceCharge, vat if needed on booking page
      caution: String(cautionDeposit),
      service: String(serviceCharge),
      vat: String(vat),
    });

    router.push(`/accommodation/${accommodationId}/book?${queryParams.toString()}`);
  };


  // Format date display
  const formatDateDisplay = (date: Date | undefined): string => {
    return date && isValid(date) ? format(date, "dd - MM - yyyy") : "DD - MM - YYYY";
  };

  return (
    <div className="w-full max-w-[345px]">
      <Card className="border border-[#BDBDBD] rounded-lg shadow-lg p-[32px_22px] flex flex-col gap-[32px]">

        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="font-bricolage text-[32px] font-bold text-[#0E2F3C] leading-tight">
                ₦{currentPrice.toLocaleString()}
              </span>
              <ShoppingCart size={24} className="text-[#0E2F3C]"/>
            </div>
            <span className="font-manrope text-lg text-[#828282]">Per night</span>
          </div>

          <div className="flex flex-col gap-[24px]">
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1 flex flex-col items-start h-auto p-[9px_16px] border-[#0E2F3C] rounded-lg text-left hover:bg-gray-50 gap-[3px]">
                    <span className="font-manrope text-sm font-extrabold text-[#4F4F4F]">Check In</span>
                    <div className="flex items-center justify-between w-full">
                      <span className={cn("font-manrope text-base", !dateRange?.from ? "text-[#828282]" : "text-[#4F4F4F]")}>
                        {formatDateDisplay(dateRange?.from)}
                      </span>
                      <CalendarDays size={18} className="text-[#0E2F3C]" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={handleDateSelect}
                    numberOfMonths={1}
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1 flex flex-col items-start h-auto p-[9px_16px] border-[#0E2F3C] rounded-lg text-left hover:bg-gray-50 gap-[3px]">
                    <span className="font-manrope text-sm font-extrabold text-[#4F4F4F]">Check out</span>
                    <div className="flex items-center justify-between w-full">
                       <span className={cn("font-manrope text-base", !dateRange?.to ? "text-[#828282]" : "text-[#4F4F4F]")}>
                         {formatDateDisplay(dateRange?.to)}
                       </span>
                      <CalendarDays size={18} className="text-[#0E2F3C]" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                   <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={handleDateSelect}
                    numberOfMonths={1}
                    disabled={{ before: dateRange?.from ? addDays(dateRange.from, 1) : new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-[7px_16px] border border-[#0E2F3C] rounded-lg">
                <div className="flex flex-col gap-[8px]">
                  <span className="font-manrope text-sm font-extrabold text-[#4F4F4F]">No. of Guests</span>
                  <span className="font-manrope text-base text-[#828282]">{guests}</span>
                </div>
                <div className="flex flex-col gap-1">
                   <Button onClick={() => handleGuestChange(1)} variant="ghost" size="icon" className="h-5 w-5 text-[#828282] hover:text-[#0E2F3C] rounded-full bg-[#0E2F3C] text-white hover:bg-[#1f5a75]">
                      <PlusCircle size={14} />
                   </Button>
                   <Button onClick={() => handleGuestChange(-1)} variant="ghost" size="icon" className="h-5 w-5 text-[#828282] hover:text-[#0E2F3C] rounded-full bg-[#0E2F3C] text-white hover:bg-[#1f5a75]" disabled={guests <= 1}>
                      <MinusCircle size={14} />
                   </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-[7px_16px] border border-[#0E2F3C] rounded-lg">
                <div className="flex flex-col gap-[8px]">
                  <span className="font-manrope text-sm font-extrabold text-[#4F4F4F]">No. of Units</span>
                  <span className="font-manrope text-base text-[#828282]">{units}</span>
                </div>
                <div className="flex flex-col gap-1">
                   <Button onClick={() => handleUnitChange(1)} variant="ghost" size="icon" className="h-5 w-5 text-[#828282] hover:text-[#0E2F3C] rounded-full bg-[#0E2F3C] text-white hover:bg-[#1f5a75]">
                      <PlusCircle size={14} />
                   </Button>
                   <Button onClick={() => handleUnitChange(-1)} variant="ghost" size="icon" className="h-5 w-5 text-[#828282] hover:text-[#0E2F3C] rounded-full bg-[#0E2F3C] text-white hover:bg-[#1f5a75]" disabled={units <= 1}>
                      <MinusCircle size={14} />
                   </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handlePayNowClick}
          disabled={nights <= 0}
          className="w-full bg-[#E09F3E] text-[#0E2F3C] font-manrope text-lg font-extrabold hover:bg-[#d08f2e] p-[12px_16px] rounded-lg h-auto tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Pay Now
        </Button>

        <div className="flex flex-col gap-[16px]">
           <div className="flex justify-between items-center">
              <span className="font-manrope text-base text-[#4F4F4F]">
                {nights > 0 ? `₦${currentPrice.toLocaleString()} x ${nights} night${nights > 1 ? 's' : ''} x ${units} unit${units > 1 ? 's' : ''}` : 'Select dates'}
              </span>
              <span className="font-manrope text-base font-extrabold text-[#4F4F4F]">
                {nights > 0 ? `₦${subtotal.toLocaleString()}` : '-'}
              </span>
           </div>
           <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 font-manrope text-base text-[#4F4F4F]">
                 Caution Deposit <Info size={14} className="text-[#4F4F4F]"/>
              </span>
              <span className="font-manrope text-base font-extrabold text-[#4F4F4F]">{nights > 0 ? `₦${cautionDeposit.toLocaleString()}` : '-'}</span>
           </div>
           <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 font-manrope text-base text-[#4F4F4F]">
                 Service charge <Info size={14} className="text-[#4F4F4F]"/>
              </span>
              <span className="font-manrope text-base font-extrabold text-[#4F4F4F]">{nights > 0 ? `₦${serviceCharge.toLocaleString()}` : '-'}</span>
           </div>
           <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 font-manrope text-base text-[#4F4F4F]">
                 VAT <Info size={14} className="text-[#4F4F4F]"/>
              </span>
              <span className="font-manrope text-base font-extrabold text-[#4F4F4F]">{nights > 0 ? `₦${vat.toLocaleString()}` : '-'}</span>
           </div>
        </div>

        <Separator className="my-2 bg-[#BDBDBD]" />

        <div className="flex justify-between items-center">
          <span className="font-manrope text-lg text-[#0E2F3C]">Total:</span>
          <div className="flex items-center gap-2">
             <ShoppingCart size={20} className="text-[#0E2F3C]"/>
             <span className="font-manrope text-xl font-extrabold text-[#0E2F3C]">
               {nights > 0 ? `₦${totalCost.toLocaleString()}` : '₦0'}
             </span>
          </div>
        </div>

        <Link href="#" className="text-center font-manrope text-base text-[#4F4F4F] underline mt-2 hover:text-[#E09F3E]">
           Report this listing
        </Link>
      </Card>
    </div>
  );
};

export default BookingCard;
