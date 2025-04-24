import React from 'react';
import { Building2, Palmtree, Plane, Ticket } from 'lucide-react'; // Corrected Palmtree import

interface OfferingCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  bgColor: string; // Tailwind background color class e.g., 'bg-yellow-100'
  iconColor: string; // Tailwind text color class e.g., 'text-yellow-700'
}

const offerings = [
  {
    icon: Building2,
    title: "List your Accommodation",
    description: "Join a growing network of local hosts to showcase your accommodation to travelers from around the world. Connect directly, eliminate intermediaries and increase your visibility.",
    bgColor: "bg-blue-100", // Adjust colors based on design
    iconColor: "text-blue-700",
  },
  {
    icon: Palmtree, // Use corrected name
    title: "List your Experiences",
    description: "Turn your unique offering into a must-visit destination! From hidden gems to iconic attractions, showcase your unique experiences on Roots & Routes and connect with travelers eager for authentic African adventures.",
    bgColor: "bg-yellow-100", // Adjust colors based on design
    iconColor: "text-yellow-700",
  },
  {
    icon: Plane,
    title: "List your Flights",
    description: "List your flights to reach a wider audience, get real-time visibility, competitive pricing, and direct bookings without excessive commission fees.",
    bgColor: "bg-green-100", // Adjust colors based on design
    iconColor: "text-green-700",
  },
  {
    icon: Ticket,
    title: "Sell your Event Tickets",
    description: "Whether you're hosting cultural tours, music festivals, food experiences, or guided excursions, list & sell your special event tickets on Roots & Routes for a wider reach.",
    bgColor: "bg-red-100", // Adjust colors based on design
    iconColor: "text-red-700",
  },
];

// Removed the runtime check, as the import name was the issue.
const OfferingCard: React.FC<OfferingCardProps> = ({ icon: Icon, title, description, bgColor, iconColor }) => (
  <div className="flex flex-col items-start text-left p-6 rounded-lg"> {/* Assuming cards are simple divs, adjust if using Card component */}
    <div className={`w-16 h-16 rounded-lg ${bgColor} flex items-center justify-center mb-4`}>
      <Icon className={`w-8 h-8 ${iconColor}`} />
    </div>
    <h3 className="text-xl font-semibold text-[#0e2f3c] mb-2">{title}</h3>
    <p className="text-base text-[#4f4f4f] leading-relaxed">{description}</p>
  </div>
);

export default function VendorOfferingCards() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0e2f3c] mb-12 md:mb-16">
          What offering would you like to list?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {offerings.map((offering) => (
            <OfferingCard key={offering.title} {...offering} />
          ))}
        </div>
      </div>
    </section>
  );
}
