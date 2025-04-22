import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Share2, Heart, Image as ImageIcon } from "lucide-react";
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  propertyName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, propertyName }) => {
  // Ensure there's always at least one image placeholder if the array is empty
  const displayImages = images.length > 0 ? images : ["/images/placeholder.svg"];

  return (
    <section className="mb-8">
      {/* Updated Grid Layout for 5 images */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[350px] md:h-[500px] rounded-lg overflow-hidden relative">
        {/* Main Image */}
        <div className="col-span-2 row-span-2 relative cursor-pointer group">
          <Image src={displayImages[0]} alt={`${propertyName} main image`} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
        {/* Other Images */}
        {displayImages.slice(1, 5).map((img, index) => (
          <div key={index} className={cn("relative cursor-pointer group", index >= 2 && "hidden md:block")}> {/* Still hide 2 on mobile */}
            <Image src={img || "/images/placeholder.svg"} alt={`${propertyName} image ${index + 2}`} fill className="object-cover" />
             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </div>
        ))}
        {/* Show all photos button is now moved below */}
      </div>
      {/* Action Buttons moved below gallery */}
      <div className="mt-4 flex justify-between items-center">
        {/* Left side buttons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="flex items-center gap-1.5 text-[#0E2F3C] hover:bg-gray-100 px-2 md:px-3 py-1 h-auto text-sm font-medium rounded-md">
            <Share2 size={16} /> Share
          </Button>
          <Button variant="ghost" className="flex items-center gap-1.5 text-[#0E2F3C] hover:bg-gray-100 px-2 md:px-3 py-1 h-auto text-sm font-medium rounded-md">
            <Heart size={16} /> Add to wishlist
          </Button>
        </div>
        {/* Right side button */}
        <Button variant="secondary" className="bg-[#0E2F3C] text-white hover:bg-[#1a4a5f] rounded-lg px-4 py-3 text-base font-extrabold font-manrope">
          <ImageIcon size={16} className="mr-2" /> Show all photos
        </Button>
      </div>
    </section>
  );
};

export default ImageGallery;
