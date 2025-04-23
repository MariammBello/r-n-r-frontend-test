import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const MapSection: React.FC = () => {
  // Placeholder content - replace with actual map integration and dynamic text later
  const locationDescription = "Lekki Phase 1 is an Upper-Middle income, a densely populated residential estate located in the Eti-Osa Local government of Lagos State. The state has grown to become one of the most sought-after locations in Lagos and a major attraction for leisure and recreation. It is a working-class area with large residential projects, as well as a couple of commercial and retail developments. Its location makes it very easily accessible to other prime locations, such as Ikoyi and Oniru/ Victoria Island. It is also known for its popular roads like the Admiralty Way, Freedom Way, Adewunmi Adebimpe Drive, etc.";

  return (
    <>
      <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-4">Map</h3>
      {/* Map Placeholder */}
      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 relative mb-4">
        <Image src="/images/placeholder.jpg" alt="Map placeholder" layout="fill" objectFit="cover" className="rounded-lg opacity-50" />
        <span className="z-10 font-medium">Map Placeholder - Integration Required</span>
        {/* Adjusted Button Style */}
        <Button variant="secondary" className="absolute top-4 right-4 bg-white text-[#0E2F3C] hover:bg-gray-100 shadow-md border border-gray-300 px-4 py-2 h-auto text-sm font-medium rounded-md">
           <MapPin size={16} className="mr-1.5" /> View with Google Earth
        </Button>
      </div>
      {/* Location Description */}
      <p className="font-manrope text-base text-[#4F4F4F] leading-relaxed">
        {locationDescription}
      </p>
      {/* Getting Around */}
      <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mt-4 mb-2">Getting around:</h4>
      <p className="font-manrope text-base text-[#4F4F4F]">
        We recommend all guests get a <Link href="#" className="text-[#E09F3E] underline font-semibold">Car Rental Service</Link> to pick up at the airport
      </p>
    </>
  );
};

export default MapSection;
