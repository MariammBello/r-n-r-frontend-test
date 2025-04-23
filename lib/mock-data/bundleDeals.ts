import { BundleDeal } from "@/types/accommodation";

// Mock data for bundle deals shown on the landing page
export const mockBundleDeals: BundleDeal[] = [
  {
    id: "zuma-deal-1", // Use string IDs
    name: "Zuma Rock Resort",
    location: "Daura, Niger state",
    rating: 5,
    reviews: 47,
    image: "/images/deal-zuma-1.png", // Use specific deal images if available
    price: 1250000.00, // Use numeric price
    includes: ["Breakfast", "Resort Tour"],
    accessType: "General Access",
    dealLink: "/deals/zuma-deal-1", // Example link
  },
  {
    id: "zuma-deal-2",
    name: "Zuma Rock Resort",
    location: "Daura, Niger state",
    rating: 5,
    reviews: 47,
    image: "/images/deal-zuma-2.png",
    price: 1850000.00, // Example different price
    includes: ["Breakfast", "Resort Tour", "Spa Access"],
    accessType: "VIP Access",
    dealLink: "/deals/zuma-deal-2",
  },
  {
    id: "zuma-deal-3",
    name: "Zuma Rock Resort",
    location: "Daura, Niger state",
    rating: 5,
    reviews: 47,
    image: "/images/deal-zuma-3.png",
    price: 1300000.00, // Example different price
    includes: ["Breakfast", "Resort Tour", "Airport Shuttle"],
    accessType: "General Access",
    dealLink: "/deals/zuma-deal-3",
  },
   // Add more distinct deals if needed
];
