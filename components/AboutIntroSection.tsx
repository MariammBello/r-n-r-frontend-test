import { Button } from "@/components/ui/button";
import { LucideIcon, Check } from "lucide-react"; // Import Check as fallback

interface AboutIntroSectionProps {
  propertyName: string;
  amenities: string[] | undefined; // Allow amenities to be undefined
  amenityIconMap: Record<string, LucideIcon>;
}

const AboutIntroSection: React.FC<AboutIntroSectionProps> = ({
  propertyName,
  amenities,
  amenityIconMap,
}) => {
  // Use default amenities if none provided, matching the original page logic
  const displayAmenities = amenities || ["Reserve now, Pay Later", "Spa", "Fully Refundable", "Pool", "Free Parking", "Restaurant", "Accessibility options", "Gym", "Pet friendly", "Bar"];

  return (
    <div className="pb-8"> {/* Added padding bottom */}
      {/* Title updated: font-manrope, text-3xl */}
      <h2 className="font-manrope text-3xl font-bold text-[#0E2F3C] mb-4">{propertyName}</h2>
      {/* Address updated: Exact text from Figma */}
      <p className="font-manrope text-base text-[#4F4F4F] mb-1">
        <strong className="text-[#0E2F3C]">Address:</strong> No. 26, Hakeem Dickson street, off admiralty way, Lekki Phase 1, Lagos state
      </p>
      {/* Key Amenities Row - Adjusted grid and styling */}
      {/* Grid gaps updated: gap-x-12, gap-y-6 */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 mt-6 mb-6">
         {displayAmenities.slice(0, 10).map((amenity, index) => { // Show first 10
            const Icon = amenityIconMap[amenity] || Check; // Use Check as fallback
            return (
               /* Item gap updated: gap-4 */
               <div key={index} className="flex items-center gap-4">
                  <Icon size={22} className="text-[#E09F3E]" /> {/* Slightly larger icon */}
                  {/* Text size updated: text-xl */}
                  <span className="font-manrope text-xl text-[#4F4F4F]">{amenity}</span>
               </div>
            );
         })}
      </div>
      {/* Show all amenities button - Adjusted style */}
      {/* Button style updated: px-4 py-3, font-extrabold, font-manrope, rounded-lg */}
      <Button variant="secondary" className="bg-[#0E2F3C] text-white hover:bg-[#1a4a5f] rounded-lg px-4 py-3 text-base font-extrabold font-manrope">
        Show all amenities
      </Button>
    </div>
  );
};

export default AboutIntroSection;
