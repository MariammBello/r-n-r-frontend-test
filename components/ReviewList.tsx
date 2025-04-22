import React from 'react'; // Import React for React.ReactNode
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge"; // No longer using Badge for rating
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Keep Card import
import { Star } from "lucide-react";
import { cn } from '@/lib/utils';

interface IndividualReview {
  name: string;
  location: string;
  rating: number; // Assuming this is out of 10
  scoreType: string; // e.g., "Excellent", "Average", "Poor"
  date: string;
  text: string;
  avatar: string; // URL or path to avatar image
  stayDuration?: string; // Optional, e.g., "Stayed 7 nights"
}

interface ReviewListProps {
  reviews: IndividualReview[];
  totalReviews: number;
  renderStars: (rating: number, size?: number) => React.ReactNode[];
}

// Helper to determine text color based on scoreType
const getScoreColor = (scoreType: string) => {
  switch (scoreType) {
    case 'Excellent': return 'text-green-600'; // Or Figma's green if defined
    case 'Average': return 'text-yellow-600'; // Or Figma's yellow/orange
    case 'Poor': return 'text-red-600'; // Or Figma's red
    default: return 'text-[#0E2F3C]'; // Default color
  }
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews, totalReviews, renderStars }) => {
  return (
    <div className="mt-8"> {/* Add margin top to separate from summary */}
      {/* Individual Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[70px] gap-y-10 mb-10"> {/* Match Figma gaps */}
        {reviews.slice(0, 4).map((review, index) => ( // Show first 4
           // Use div instead of Card for simpler structure matching Figma
           <div key={index} className="flex flex-col gap-4"> {/* Vertical gap within review */}
              {/* Top Row: Avatar, Name/Location, Rating/Score */}
              <div className="flex items-start justify-between gap-4"> {/* Align items start */}
                 {/* Left: Avatar + Name/Location */}
                 <div className="flex items-center gap-4"> {/* Gap between avatar and text */}
                    <Avatar className="h-14 w-14"> {/* Match Figma size */}
                       <AvatarImage src={review.avatar} alt={review.name} />
                       {/* Use first letter as fallback */}
                       <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                       {/* Match Figma text styles */}
                       <p className="font-manrope font-extrabold text-xl text-[#0E2F3C]">{review.name}</p>
                       <p className="font-manrope text-lg text-[#0E2F3C]">{review.location}</p>
                    </div>
                 </div>
                 {/* Right: Rating + Score Type */}
                 <div className="text-right">
                    {/* Match Figma text styles */}
                    <p className="font-manrope font-extrabold text-xl text-[#0E2F3C]">{review.rating}/10</p>
                    <p className={`font-manrope font-extrabold text-xl ${getScoreColor(review.scoreType)}`}>{review.scoreType}</p>
                 </div>
              </div>
              {/* Middle Row: Stars + Stay Duration */}
              <div className="flex items-center gap-[22px]"> {/* Match Figma gap */}
                 {/* Render stars (rating is out of 10, convert to 5) */}
                 <div className="flex items-center gap-1">{renderStars(review.rating / 2, 20)}</div> {/* Adjust size */}
                 {/* Match Figma text style */}
                 <span className="font-manrope text-lg text-[#828282]">{review.stayDuration || "Stayed 7 nights"}</span>
              </div>
              {/* Bottom: Review Text & Date */}
              {/* Match Figma text styles */}
              <p className="font-manrope text-lg text-[#0E2F3C] leading-normal">{review.text}</p>
              <p className="font-manrope text-xl font-extrabold text-[#828282]">{review.date}</p>
           </div>
        ))}
      </div>
      {/* Action Buttons & Link */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Match Figma button styles */}
        <Button variant="secondary" className="bg-[#0E2F3C] text-white hover:bg-[#1a4a5f] rounded-lg px-4 py-3 h-auto font-manrope font-extrabold text-base w-full sm:w-[280px]">Show all {totalReviews} reviews</Button>
        <Button className="bg-[#E09F3E] text-[#0E2F3C] hover:bg-[#d08f2e] rounded-lg px-4 py-3 h-auto font-manrope font-extrabold text-base w-full sm:w-[280px]">Share your reviews</Button>
      </div>
      {/* Match Figma link style */}
      <Link href="#" className="block text-center mt-6 font-manrope text-base text-[#4F4F4F] underline hover:text-[#0E2F3C]">Learn how reviews work</Link>
    </div>
  );
};

export default ReviewList;
