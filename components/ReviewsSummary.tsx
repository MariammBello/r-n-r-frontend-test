import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface RatingBreakdownItem {
  category: string;
  score: number;
}

interface ReviewsSummaryProps {
  overallRating: number;
  totalReviews: number;
  ratingBreakdown: RatingBreakdownItem[];
  // Add prop for guest favourite score if dynamic
}

const ReviewsSummary: React.FC<ReviewsSummaryProps> = ({
  overallRating,
  totalReviews,
  ratingBreakdown,
}) => {
  const guestFavouriteScore = 9.7; // Placeholder

  return (
    <>
      {/* Overall Rating */}
      <div className="flex items-center gap-3 mb-6">
        <Star size={24} className="text-[#E09F3E] fill-[#E09F3E]" />
        <span className="font-bricolage text-2xl font-bold text-[#0E2F3C]">{overallRating.toFixed(1)} • {totalReviews} reviews</span>
      </div>
      {/* Rating Breakdown - Adjusted styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8 border border-gray-200 rounded-lg p-6">
        {/* Guest Favourite Badge - Adjusted styling */}
        <div className="md:col-span-2 flex items-center gap-3 bg-gray-100 p-3 rounded-lg mb-4">
           <Badge className="bg-[#0E2F3C] text-white text-lg font-bold px-2.5 py-1 rounded-md">{guestFavouriteScore.toFixed(1)}</Badge>
           <div>
              <p className="font-semibold text-base text-[#0E2F3C]">Guest favourite</p>
              <p className="text-sm text-[#4F4F4F]">One of the most loved homes on Roots'n'Route based on ratings, reviews and reliability</p>
           </div>
        </div>
        {/* Individual Categories */}
        {ratingBreakdown.map(item => (
           <div key={item.category} className="flex items-center justify-between">
              <span className="font-manrope text-base text-[#4F4F4F]">{item.category}</span>
              <div className="flex items-center gap-2">
                 <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden"> {/* Slightly thicker bar */}
                    <div className="h-full bg-[#0E2F3C]" style={{ width: `${(item.score / 5) * 100}%` }}></div>
                 </div>
                 <span className="font-manrope text-sm font-semibold text-[#0E2F3C] w-8 text-right">{item.score.toFixed(1)}</span> {/* Fixed width for alignment */}
              </div>
           </div>
        ))}
      </div>
    </>
  );
};

export default ReviewsSummary;
