import React from 'react'; // Import React
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card"; // Import Card
import { Separator } from "@/components/ui/separator"; // Import Separator
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

  // Helper function to render stars for categories (internal to this component)
  const renderCategoryStars = (score: number) => {
    // Assuming score is out of 5 for categories based on visual
    const ratingOutOf5 = score;
    return [...Array(5)].map((_, i) => (
      <Star key={i} size={16} className={` ${i < Math.round(ratingOutOf5) ? 'text-[#E09F3E] fill-[#E09F3E]' : 'text-gray-300'}`} />
    ));
  };


  return (
    // Removed Overall Rating text section
    // Wrap content in a Card with border
    <Card className="border border-gray-200 rounded-lg p-6 mb-8"> {/* Added mb-8 */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12"> {/* Main flex container */}
        {/* Guest Favourite Badge */}
        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg flex-shrink-0"> {/* Adjusted layout */}
           <Badge className="bg-[#0E2F3C] text-white text-lg font-bold px-2.5 py-1 rounded-md">{guestFavouriteScore.toFixed(1)}</Badge>
           <div className="max-w-[150px]"> {/* Added max-width */}
              <p className="font-manrope font-semibold text-sm text-[#0E2F3C]">Guest favourite</p> {/* Adjusted text size */}
              <p className="text-xs text-[#4F4F4F]">This is one of the best reviewed rooms in this resort</p> {/* Adjusted text size & content */}
           </div>
        </div>

        {/* Vertical Separator */}
        <Separator orientation="vertical" className="h-16 hidden md:block bg-gray-200" />

        {/* Individual Categories - Use flex, justify-between, and add separators */}
        <div className="flex flex-1 items-center justify-between gap-x-4"> {/* Use justify-between and smaller gap */}
          {ratingBreakdown.map((item, index) => (
            <React.Fragment key={item.category}>
              {/* Category Item */}
              <div className="flex flex-col items-center gap-1 text-center flex-shrink-0"> {/* Added flex-shrink-0 */}
                <div className="flex items-center gap-1">{renderCategoryStars(item.score)}</div>
                <span className="font-manrope text-sm text-[#0E2F3C]">{item.category}</span>
              </div>
              {/* Add vertical separator if not the last item */}
              {index < ratingBreakdown.length - 1 && (
                <Separator orientation="vertical" className="h-10 bg-gray-200" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ReviewsSummary;
