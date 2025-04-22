import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Star, Edit, Info, ShoppingCart } from 'lucide-react'; // Import necessary icons
import { Accommodation } from '@/types/accommodation'; // Assuming type is available

interface BookingSummaryCardProps {
  accommodation: Accommodation;
  // Add props for dynamic dates, guests, units, coupon later
  couponCode: string;
  onCouponChange: (value: string) => void;
  onApplyCoupon: () => void; // Placeholder
}

const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({
  accommodation,
  couponCode,
  onCouponChange,
  onApplyCoupon,
}) => {
  // Placeholder calculations - replace with actual logic if needed
  const nights = 5;
  const subtotal = accommodation.currentPrice * nights;
  const cautionDeposit = 100000; // Example from Figma
  const serviceCharge = 10000; // Example from Figma
  const vat = 22500; // Example from Figma
  const totalCost = subtotal + cautionDeposit + serviceCharge + vat;

  // Placeholder dynamic data - replace later
  const dates = "Friday, Feb 14 - Monday, Feb 17";
  const guests = "2 Adults, 3 Children, 1 Infant";
  const units = "1 Unit";

  return (
    // Card matching Figma: border, padding, rounded, internal gap
    <Card className="border border-[#BDBDBD] rounded-lg p-[48px_60px] flex flex-col gap-8 shadow-sm"> {/* Use gap-8 based on Figma's 32px */}

      {/* Top Section: Name, Rating */}
      <div className="flex justify-between items-start"> {/* Use items-start */}
        <div>
          {/* Match Figma text styles */}
          <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-2">{accommodation.propertyName}</h3>
          <p className="font-manrope text-lg text-[#4F4F4F]">You are renting the entire unit</p>
        </div>
        <div className="text-right flex-shrink-0">
           <div className="flex items-center justify-end gap-2 mb-1"> {/* Justify end */}
              <Star size={20} className="text-[#E09F3E] fill-[#E09F3E]" /> {/* Size 20px */}
              {/* Match Figma text styles */}
              <span className="font-manrope text-xl font-bold text-[#0E2F3C]">{accommodation.rating.toFixed(2)} ({accommodation.reviews} reviews)</span>
           </div>
           {/* Match Figma text style */}
           <span className="font-manrope text-lg text-[#27AE60]">{accommodation.host.title || 'Hospitality Hero'}</span>
        </div>
      </div>

      <Separator className="bg-[#BDBDBD]" />

      {/* Details Section: Dates, Guests, Units */}
      <div className="flex flex-col gap-4"> {/* Vertical stack */}
        {/* Dates */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-manrope text-xl font-bold text-[#0E2F3C] mb-1">Dates</p>
            <p className="font-manrope text-lg text-[#4F4F4F]">{dates}</p>
          </div>
          <Button variant="link" className="text-[#4F4F4F] hover:text-[#0E2F3C] p-0 h-auto font-manrope text-xl font-bold underline">
            <Edit size={20} className="mr-2"/> Edit
          </Button>
        </div>
        {/* Guests */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-manrope text-xl font-bold text-[#0E2F3C] mb-1">No. of Guests</p>
            <p className="font-manrope text-lg text-[#4F4F4F]">{guests}</p>
          </div>
           <Button variant="link" className="text-[#4F4F4F] hover:text-[#0E2F3C] p-0 h-auto font-manrope text-xl font-bold underline">
            <Edit size={20} className="mr-2"/> Edit
          </Button>
        </div>
        {/* Units */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-manrope text-xl font-bold text-[#0E2F3C] mb-1">No. of Units</p>
            <p className="font-manrope text-lg text-[#4F4F4F]">{units}</p>
          </div>
           <Button variant="link" className="text-[#4F4F4F] hover:text-[#0E2F3C] p-0 h-auto font-manrope text-xl font-bold underline">
            <Edit size={20} className="mr-2"/> Edit
          </Button>
        </div>
      </div>

      <Separator className="bg-[#BDBDBD]" />

      {/* Price Details Section */}
      <div className="flex flex-col gap-3.5"> {/* Match Figma gap (14px) */}
         <h4 className="font-manrope text-xl font-bold text-[#0E2F3C] mb-0">Price details</h4> {/* Removed mb */}
         <div className="flex justify-between font-manrope text-base text-[#4F4F4F]">
            <span>₦{accommodation.currentPrice.toLocaleString()} x {nights} nights</span>
            <span className="font-bold">₦{subtotal.toLocaleString()}</span>
         </div>
          <div className="flex justify-between font-manrope text-base text-[#4F4F4F]">
            <span>Caution Deposit <Info size={14} className="inline text-[#828282]"/></span>
            <span className="font-bold">₦{cautionDeposit.toLocaleString()}</span>
         </div>
          <div className="flex justify-between font-manrope text-base text-[#4F4F4F]">
            <span>Service charge <Info size={14} className="inline text-[#828282]"/></span>
            <span className="font-bold">₦{serviceCharge.toLocaleString()}</span>
         </div>
          <div className="flex justify-between font-manrope text-base text-[#4F4F4F]">
            <span>VAT <Info size={14} className="inline text-[#828282]"/></span>
            <span className="font-bold">₦{vat.toLocaleString()}</span>
         </div>
      </div>

      {/* Coupon Code */}
      <div className="flex gap-4 items-center"> {/* Match Figma gap */}
        <Input
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => onCouponChange(e.target.value)}
          className="border-[#828282] rounded h-[46px] flex-1 text-base placeholder:text-[#828282]" // Match Figma style
        />
        <Button
          onClick={onApplyCoupon}
          className="bg-[#0E2F3C] text-white hover:bg-[#1c4a5f] rounded-lg h-[46px] w-[150px] font-manrope text-sm font-extrabold" // Match Figma style
        >
          Apply
        </Button>
      </div>

      <Separator className="bg-[#BDBDBD]" />

      {/* Total */}
      <div className="flex justify-between items-center">
        {/* Match Figma text style */}
        <span className="font-manrope text-lg text-[#0E2F3C]">Total:</span>
        <div className="flex items-center gap-2"> {/* Match Figma gap */}
           <ShoppingCart size={20} className="text-[#0E2F3C]"/> {/* Match Figma size */}
           {/* Match Figma text style */}
           <span className="font-manrope text-xl font-bold text-[#0E2F3C]">₦{totalCost.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};

export default BookingSummaryCard;
