import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from '@/lib/utils';

interface IndividualReview {
  name: string;
  location: string;
  rating: number;
  scoreType: string;
  date: string;
  text: string;
  avatar: string;
}

interface ReviewListProps {
  reviews: IndividualReview[];
  totalReviews: number;
  renderStars: (rating: number, size?: number) => React.ReactNode[]; // Pass renderStars
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, totalReviews, renderStars }) => {
  return (
    <>
      {/* Individual Reviews - Adjusted styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8"> {/* Increased gap */}
        {reviews.slice(0, 4).map((review, index) => ( // Show first 4
           <Card key={index} className="border-none p-0">
              <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11"> {/* Slightly larger avatar */}
                       <AvatarImage src={review.avatar} alt={review.name} />
                       <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                       <p className="font-manrope font-semibold text-base text-[#0E2F3C]">{review.name}</p>
                       <p className="font-manrope text-xs text-[#828282]">{review.location}</p>
                    </div>
                 </div>
                 <Badge variant={review.scoreType === 'Excellent' ? 'default' : review.scoreType === 'Average' ? 'secondary' : 'destructive'}
                        className={cn("px-2.5 py-1 text-xs font-semibold rounded-md", // Adjusted padding/rounding
                                     review.scoreType === 'Excellent' && 'bg-green-100 text-green-800', // Darker text
                                     review.scoreType === 'Average' && 'bg-yellow-100 text-yellow-800', // Darker text
                                     review.scoreType === 'Poor' && 'bg-red-100 text-red-800' // Darker text
                        )}>
                    {review.rating}/10 {review.scoreType}
                 </Badge>
              </div>
              <div className="flex items-center gap-2 mb-2">
                 <div className="flex items-center gap-0.5">{renderStars(review.rating / 2, 14)}</div>
                 <span className="text-sm text-[#828282]">•</span>
                 <span className="font-manrope text-sm text-[#828282]">Stayed 7 nights</span> {/* Placeholder */}
              </div>
              <p className="font-manrope text-sm text-[#4F4F4F] mb-2 line-clamp-4 leading-relaxed">{review.text}</p>
              <p className="font-manrope text-xs text-[#828282]">{review.date}</p>
           </Card>
        ))}
      </div>
      {/* Action Buttons - Adjusted styling */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button variant="secondary" className="bg-[#0E2F3C] text-white hover:bg-[#1a4a5f] rounded-md px-6 py-2.5 text-base font-semibold w-full sm:w-auto">Show all {totalReviews} reviews</Button>
        <Button className="bg-[#E09F3E] text-[#0E2F3C] hover:bg-[#d08f2e] rounded-md px-6 py-2.5 text-base font-semibold w-full sm:w-auto">Share your reviews</Button>
      </div>
      <Link href="#" className="block text-center mt-6 font-manrope text-sm text-[#4F4F4F] underline hover:text-[#0E2F3C]">Learn how reviews work</Link>
    </>
  );
};

export default ReviewList;
