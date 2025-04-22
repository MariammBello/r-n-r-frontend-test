import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Keep if needed for future state
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarDays, MinusCircle, PlusCircle, Info, ShoppingCart } from "lucide-react";

interface BookingCardProps {
  accommodationId: string;
  currentPrice: number;
  // Add props for dates, guests, units state management later
}

const BookingCard: React.FC<BookingCardProps> = ({
  accommodationId,
  currentPrice,
}) => {
  // Placeholder calculations - replace with actual state/logic
  const nights = 5;
  const subtotal = currentPrice * nights;
  const cautionDeposit = 100000;
  const serviceCharge = 30000;
  const vat = 22500;
  const totalCost = subtotal + cautionDeposit + serviceCharge + vat;

  return (
    // Set max-width for sidebar, removed col-span
    <div className="w-full max-w-[345px]">
      {/* Card matching Figma: border #BDBDBD, rounded-lg (8px), p-[32px_22px], shadow-lg. Removed sticky. */}
      <Card className="border border-[#BDBDBD] rounded-lg shadow-lg p-[32px_22px] flex flex-col gap-[32px]"> {/* Gap from Figma Frame 650 */}

        {/* Price per night section (Figma Frame 649 -> Frame 207) */}
        <div className="flex flex-col gap-[24px]"> {/* Gap from Figma Frame 649 */}
          <div className="flex flex-col"> {/* Figma Frame 207 */}
            <div className="flex items-center justify-between"> {/* Figma Frame 251 (adjusted for layout) */}
              {/* Price: Bricolage Grotesque 32px bold #0E2F3C */}
              <span className="font-bricolage text-[32px] font-bold text-[#0E2F3C] leading-tight">
                ₦{currentPrice.toLocaleString()}
              </span>
              <ShoppingCart size={24} className="text-[#0E2F3C]"/> {/* Icon size adjusted */}
            </div>
            {/* Per night: Manrope 18px regular #828282 */}
            <span className="font-manrope text-lg text-[#828282]">Per night</span>
          </div>

          {/* Booking Controls Section (Figma Frame 646) */}
          <div className="flex flex-col gap-[24px]"> {/* Gap from Figma Frame 646 */}
            {/* Dates Row (Figma Frame 644) - Switched to flex */}
            {/* Reduced gap between date buttons to prevent overflow */}
            <div className="flex gap-2"> {/* Gap from Figma Frame 644 - Reduced from gap-4 */}
              {/* Check In (Figma Frame 282) */}
              <Popover>
                <PopoverTrigger asChild>
                  {/* Button matching Figma: border #0E2F3C, rounded-lg (8px), p-2 (approx 9px/16px). Added flex-1 */}
                  {/* Ensure flex-1 is present */}
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
                  {/* Ensure flex-1 is present */}
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
              {/* No. of Guests (Figma Frame 280) - Updated internal layout */}
              {/* Changed outer div to flex row, removed gap, added items-center justify-between */}
              <div className="flex items-center justify-between p-[7px_16px] border border-[#0E2F3C] rounded-lg">
                {/* Removed intermediate flex div */}
                {/* Left side: Label + Value */}
                <div className="flex flex-col gap-[8px]"> {/* Kept vertical stack for label/value */}
                  <Label className="font-manrope text-sm font-extrabold text-[#4F4F4F]">No. of Guests</Label>
                  {/* Value: Manrope 16px regular #828282 */}
                  <span className="font-manrope text-base text-[#828282]">2</span> {/* Placeholder */}
                </div>
                {/* Right side: Buttons */}
                {/* +/- Buttons mimicking Figma Scroll button */}
                <div className="flex flex-col gap-1"> {/* Kept vertical stack for buttons */}
                   <Button variant="ghost" size="icon" className="h-5 w-5 text-[#828282] hover:text-[#0E2F3C] rounded-full bg-[#0E2F3C] text-white hover:bg-[#1f5a75]">
                      <PlusCircle size={14} />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-5 w-5 text-[#828282] hover:text-[#0E2F3C] rounded-full bg-[#0E2F3C] text-white hover:bg-[#1f5a75]">
                      <MinusCircle size={14} />
                   </Button>
                </div>
              </div>
              {/* No. of Units (Figma Frame 281) - Updated internal layout */}
              {/* Changed outer div to flex row, removed gap, added items-center justify-between */}
              <div className="flex items-center justify-between p-[7px_16px] border border-[#0E2F3C] rounded-lg">
                {/* Removed intermediate flex div */}
                {/* Left side: Label + Value */}
                <div className="flex flex-col gap-[8px]"> {/* Kept vertical stack for label/value */}
                  <Label className="font-manrope text-sm font-extrabold text-[#4F4F4F]">No. of Units</Label>
                  <span className="font-manrope text-base text-[#828282]">1</span> {/* Placeholder */}
                </div>
                {/* Right side: Buttons */}
                <div className="flex flex-col gap-1"> {/* Kept vertical stack for buttons */}
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

        {/* Pay Now Button (Figma Frame 647 -> Frame 648 -> Medium Tooltip) */}
        {/* Button matching Figma: bg #E09F3E, text #0E2F3C, Manrope 18px bold, p-[12px_16px], rounded-lg (8px) */}
        <Link href={`/accommodation/${accommodationId}/book`} className="block w-full">
          <Button className="w-full bg-[#E09F3E] text-[#0E2F3C] font-manrope text-lg font-extrabold hover:bg-[#d08f2e] p-[12px_16px] rounded-lg h-auto tracking-wider">
            Pay Now
          </Button>
        </Link>

        {/* Price Breakdown Section (Figma Frame 273) */}
        <div className="flex flex-col gap-[16px]"> {/* Gap from Figma Frame 272 */}
           {/* Subtotal (Figma Frame 235) */}
           <div className="flex justify-between items-center">
              {/* Label: Manrope 16px regular #4F4F4F */}
              <span className="font-manrope text-base text-[#4F4F4F]">₦{currentPrice.toLocaleString()} x {nights} nights</span>
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
  );
};

export default BookingCard;
