import React from 'react'; // Import React for JSX types
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Building2, MessageSquare, Star } from "lucide-react";
import { Accommodation } from "@/types/accommodation"; // Assuming Host type is part of Accommodation

interface HostDetailsCardProps {
  host: Accommodation['host']; // Use the Host type from Accommodation
  totalReviews: number;
  renderStars: (rating: number, size?: number) => React.ReactNode[]; // Use React.ReactNode[]
}

const HostDetailsCard: React.FC<HostDetailsCardProps> = ({ host, totalReviews, renderStars }) => {
  // Placeholder rating for the host card itself (could be passed as prop if dynamic)
  const hostCardRating = 4.8;

  return (
    <Card className="border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start">
      <Avatar className="h-24 w-24 flex-shrink-0 bg-gray-100 rounded-lg"> {/* Adjusted styling */}
        <AvatarImage src={host.avatar} alt={`${host.name} avatar`} />
        <AvatarFallback><Building2 size={48} className="text-gray-400" /></AvatarFallback>
      </Avatar>
      <div className="flex-1">
         <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
            {/* Host Name & Info */}
            <div className="mb-3 sm:mb-0">
               <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-manrope font-extrabold text-xl text-[#0E2F3C]">Hosted by {host.name}</h3>
                  {host.isVerified && <CheckCircle2 size={18} className="text-[#27AE60]" />}
               </div>
               {/* Placeholder Host Details */}
               <div className="flex items-center gap-x-2 flex-wrap text-sm text-[#4F4F4F]">
                 <span>Response rate: 100%</span> {/* Placeholder */}
                 <span className="hidden sm:inline">•</span>
                 <span>Experience: 20 years</span> {/* Placeholder */}
               </div>
            </div>
            {/* Host Rating - Adjusted styling */}
            <div className="text-center border border-gray-200 p-3 rounded-lg flex-shrink-0">
               <p className="font-bold text-xl text-[#0E2F3C]">{(hostCardRating * 2).toFixed(1)}</p> {/* Example calculation */}
               <div className="flex justify-center my-1">{renderStars(hostCardRating, 14)}</div>
               <Link href="#reviews" className="text-xs text-[#4F4F4F] underline hover:text-[#0E2F3C]">See all {totalReviews} Reviews</Link>
            </div>
         </div>
         {/* About Host */}
         <p className="font-manrope text-base text-[#4F4F4F] mb-5 leading-relaxed"> {/* Increased margin */}
            {host.name} is a Superhost who she is known for offering a great stay experience to guests. Her apartment comes highly recommended {/* Placeholder */}
         </p>
         {/* Host Action Buttons - Adjusted styling */}
         <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-[#E09F3E] text-[#0E2F3C] hover:bg-[#d08f2e] rounded-md px-5 py-2.5 h-auto font-semibold text-base">View Host Profile</Button>
            <Button variant="outline" className="border-[#0E2F3C] text-[#0E2F3C] hover:bg-gray-50 flex items-center gap-2 rounded-md px-5 py-2.5 h-auto font-semibold text-base">
               <MessageSquare size={18} /> Message Host
               <span className="text-xs text-[#828282] font-normal">(Typically responds in 10 mins)</span> {/* Placeholder */}
            </Button>
         </div>
      </div>
    </Card>
  );
};

export default HostDetailsCard;
