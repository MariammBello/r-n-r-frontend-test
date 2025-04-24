import React from 'react';
import { PlayCircle } from 'lucide-react';

interface VendorFeatureSectionProps {
  icon?: React.ElementType; // Make icon optional
  title: string;
  description: string;
  videoSrc: string;
  bgColor: string;
  iconBgColor?: string; // Make icon styles optional
  iconColor?: string; // Make icon styles optional
}

export default function VendorFeatureSection({
  icon: Icon, // Still destructure as Icon, but it might be undefined
  title,
  description,
  videoSrc,
  bgColor,
  iconBgColor, // Optional prop
  iconColor,   // Optional prop
}: VendorFeatureSectionProps) {
  return (
    <section className={`py-12 md:py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            {/* Conditionally render icon div */}
            {Icon && iconBgColor && iconColor && (
              <div className={`inline-flex w-14 h-14 rounded-lg ${iconBgColor} items-center justify-center mb-4`}>
                <Icon className={`w-7 h-7 ${iconColor}`} />
              </div>
            )}
            <h3 className="text-2xl md:text-3xl font-bold text-[#0e2f3c] mb-4">{title}</h3>
            <p className="text-base md:text-lg text-[#4f4f4f] leading-relaxed">{description}</p>
          </div>

          {/* Video Placeholder */}
          <div className="md:w-1/2">
            {/* Replace this div with an actual video player component later */}
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center text-white relative overflow-hidden shadow-lg">
              <p className="absolute top-2 left-3 text-sm bg-black/50 px-2 py-1 rounded">An Announcement!</p> {/* Example title overlay */}
              <PlayCircle size={64} className="opacity-80" />
              <p className="absolute bottom-2 left-3 text-xs">Video Placeholder ({videoSrc})</p>
               {/* Add mock controls overlay if needed */}
               <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
