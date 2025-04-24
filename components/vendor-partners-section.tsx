import React from 'react';
import Image from 'next/image';

// Placeholder logo data - replace with actual paths/data
const partnerLogosRow1 = [
  { name: "Emirates", src: "/images/partner-emirates.png", width: 160, height: 40 }, // Adjust dimensions as needed
  { name: "Genesis Cinemas", src: "/images/partner-genesis.png", width: 140, height: 40 },
  { name: "Ibom Air", src: "/images/partner-ibomair.png", width: 100, height: 40 },
  { name: "Delta", src: "/images/partner-delta.png", width: 100, height: 40 },
  { name: "Arik Air", src: "/images/partner-arik.png", width: 100, height: 40 },
];

const partnerLogosRow2 = [
    { name: "Filmhouse Cinemas", src: "/images/partner-filmhouse.png", width: 160, height: 40 },
    { name: "Radisson Blu", src: "/images/partner-radisson.png", width: 140, height: 40 },
    { name: "Ethiopian Airlines", src: "/images/partner-ethiopian.png", width: 120, height: 40 },
    { name: "Sheraton", src: "/images/partner-sheraton.png", width: 120, height: 40 },
    // Re-using Arik and Delta for placeholder layout based on image
    { name: "Arik Air", src: "/images/partner-arik.png", width: 100, height: 40 },
    { name: "Delta", src: "/images/partner-delta.png", width: 100, height: 40 },
];


export default function VendorPartnersSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0e2f3c] mb-4">
          Powering over <span className="text-blue-600">5,000</span> businesses to expand their reach
        </h2>
        <p className="text-lg md:text-xl text-[#4f4f4f] max-w-3xl mx-auto mb-12 md:mb-16">
          Roots & Routes connects service providers with a global travel audience through a platform gives them the visibility, tools, and support they need to grow
        </p>

        {/* Partner Logos */}
        <div className="flex flex-col items-center space-y-8">
           {/* Row 1 */}
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
             {partnerLogosRow1.map((logo) => (
               <div key={logo.name} className="flex-shrink-0">
                 <Image
                   src="/images/placeholder.svg" // Replace with logo.src when available
                   alt={`${logo.name} logo`}
                   width={logo.width}
                   height={logo.height}
                   className="object-contain" // Ensure logo aspect ratio is maintained
                 />
               </div>
             ))}
           </div>
           {/* Row 2 */}
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
             {partnerLogosRow2.map((logo) => (
               <div key={logo.name} className="flex-shrink-0">
                 <Image
                   src="/images/placeholder.svg" // Replace with logo.src when available
                   alt={`${logo.name} logo`}
                   width={logo.width}
                   height={logo.height}
                   className="object-contain"
                 />
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
