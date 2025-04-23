import React from 'react'; // Import React for JSX types
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Keep Card import
import { CheckCircle2, Building2, MessageSquare, Star } from "lucide-react";
import { Accommodation } from "@/types/accommodation";

interface HostDetailsCardProps {
  host: Accommodation['host'];
  totalReviews: number;
  renderStars: (rating: number, size?: number) => React.ReactNode[];
}

const HostDetailsCard: React.FC<HostDetailsCardProps> = ({ host, totalReviews, renderStars }) => {
  // Placeholder rating matching Figma badge
  const hostCardRating = 9.7 / 2; // Rating out of 5 for stars helper

  return (
    // Updated Card styling: padding, border color, flex row, justify-between, items-center
    <Card className="border border-[#BDBDBD] rounded-lg p-[18px_32px] flex flex-row justify-between items-center gap-6"> {/* Use gap-6 based on visual */}

      {/* Left Section: Avatar + Info */}
      <div className="flex items-center gap-2"> {/* Use gap-2 based on Figma Frame 642 */}
        <Avatar className="h-[72px] w-[72px] flex-shrink-0 bg-[#BDBDBD] rounded-full"> {/* Adjusted size & color */}
          <AvatarImage src={host.avatar} alt={`${host.name} avatar`} />
          {/* Using Building2 icon as fallback, ensure it's imported */}
          <AvatarFallback><Building2 size={36} className="text-white" /></AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 mb-0.5"> {/* Reduced gap */}
            {/* Updated text styles */}
            <h3 className="font-manrope font-extrabold text-lg text-[#0E2F3C]">Hosted by {host.name}</h3>
            {host.isVerified && <CheckCircle2 size={16} className="text-[#27AE60]" />} {/* Adjusted size */}
          </div>
          {/* Added Hospitality Hero text */}
          <p className="font-manrope text-base text-[#27AE60] mb-1">Hospitality Hero</p>
          {/* Updated text styles & content */}
          <p className="font-manrope text-base font-extrabold text-[#4F4F4F] leading-tight"> {/* Use leading-tight */}
            Response rate: 100%<br />
            Experience: 20 years
          </p>
        </div>
      </div>

      {/* Middle Section: Rating */}
      <div className="flex flex-col items-center gap-4"> {/* Use gap-4 based on Figma */}
        {/* Rating Badge */}
        <div className="bg-[#1D1D1D] text-white rounded-lg w-[50px] h-[50px] flex items-center justify-center">
          <span className="font-manrope font-extrabold text-sm">{(hostCardRating * 2).toFixed(1)}</span>
        </div>
        {/* Stars */}
        <div className="flex items-center gap-1">{renderStars(hostCardRating, 16)}</div> {/* Adjusted size */}
        {/* Reviews Link */}
        <Link href="#reviews" className="font-manrope text-sm font-extrabold text-[#4F4F4F] underline hover:text-[#0E2F3C]">
          See all {totalReviews} Reviews
        </Link>
      </div>

      {/* Right Section: Buttons */}
      <div className="flex flex-col items-center gap-2"> {/* Stack buttons vertically, gap-2 */}
        <Button className="bg-[#E09F3E] text-[#0E2F3C] hover:bg-[#d08f2e] rounded-lg px-4 py-3 h-auto font-manrope font-extrabold text-base w-[280px]"> {/* Match Figma style */}
          View Host Profile
        </Button>
        <Button variant="outline" className="bg-[#0E2F3C] text-white hover:bg-[#1a4a5f] border-[#0E2F3C] rounded-lg px-4 py-3 h-auto font-manrope font-extrabold text-base w-[280px]"> {/* Match Figma style */}
          Message Host
        </Button>
        <p className="font-manrope text-base text-[#4F4F4F] mt-1"> {/* Added margin-top */}
          Typically responds in 10 mins
        </p>
      </div>
      {/* Removed About Host paragraph */}
    </Card>
  );
};

export default HostDetailsCard;
