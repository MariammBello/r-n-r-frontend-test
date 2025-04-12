import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  Star,
  Plane,
  TicketPercent,
  Users,
  Newspaper,
  LifeBuoy,
  HelpCircle,
  Store,
  Ticket,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  description: string;
  Icon: LucideIcon;
  bgColorClass: string; // For the icon background
}

export const solutionsNavItems: NavItem[] = [
  {
    title: "Accommodation",
    href: "/accommodation",
    description: "Find the perfect stay, from luxury hotels to hidden gems.",
    Icon: BedDouble,
    bgColorClass: "bg-[#ffffde]", // Corresponds to original inline style
  },
  {
    title: "Experiences",
    href: "/experiences",
    description: "Immerse yourself in Africa's culture, nature, and adventure.",
    Icon: Star,
    bgColorClass: "bg-[#ffffde]", // Corresponds to original inline style
  },
  {
    title: "Flights",
    href: "/flights",
    description: "Book hassle-free flights to top destinations across Africa.",
    Icon: Plane,
    bgColorClass: "bg-[#a9f5e2]", // Corresponds to original inline style
  },
  {
    title: "Deals",
    href: "/deals",
    description: "Unlock exclusive discounts for flights, stays, and experiences.",
    Icon: TicketPercent,
    bgColorClass: "bg-[#d6f7ff]", // Corresponds to original inline style
  },
];

export const resourcesNavItems: NavItem[] = [
  {
    title: "Community",
    href: "/community",
    description: "Connect, share and engage with other travelers and culture enthusiasts.",
    Icon: Users,
    bgColorClass: "bg-[#d6e7ff]", // Corresponds to original inline style
  },
  {
    title: "The Roots Blog",
    href: "/blog",
    description: "Explore insights, stories, heritage, and cultural journeys.",
    Icon: Newspaper,
    bgColorClass: "bg-[#a9f5e2]", // Corresponds to original inline style
  },
  {
    title: "Help Center",
    href: "/help",
    description: "Find support and guidance for your travel experience.",
    Icon: LifeBuoy,
    bgColorClass: "bg-[#ffffa0]", // Corresponds to original inline style
  },
  {
    title: "FAQs",
    href: "/faqs",
    description: "Quick answers to common questions about Roots and Routes.",
    Icon: HelpCircle,
    bgColorClass: "bg-[#ffffa0]", // Corresponds to original inline style
  },
];

export const opportunityNavItems: NavItem[] = [
  {
    title: "Become a Vendor",
    href: "/vendor", // Assuming /vendor is the correct path
    description: "Join as a trusted partner and list your services with us.",
    Icon: Store,
    bgColorClass: "bg-[#ffded6]", // Corresponds to original inline style
  },
  {
    title: "Sell your event tickets",
    href: "/tickets",
    description: "List and manage tickets for your events effortlessly.",
    Icon: Ticket,
    bgColorClass: "bg-[#ffffa0]", // Corresponds to original inline style
  },
];
