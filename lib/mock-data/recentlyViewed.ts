import { RecentlyViewedItem } from "@/types/accommodation";

// Mock data for recently viewed items
// In a real app, this would be fetched based on the logged-in user
export const mockRecentlyViewedItems: RecentlyViewedItem[] = [
  {
    id: "acc-lekki-3bed", // Use more descriptive string IDs
    type: "accommodation",
    title: "3 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    image: "/images/placeholder.jpg",
    dates: {
      from: "Fri, Feb 14, 2025",
      to: "Sun, Feb 16, 2025",
    },
    travelers: 5,
    itemLink: "/accommodation/acc-lekki-3bed", // Example link
  },
  {
    id: "fli-eth-los-1",
    type: "flight",
    title: "Ethiopian Airlines",
    route: "Ethiopia (ETH) to Lagos (LOS)",
    image: "/images/airline-ethiopian.png",
    dates: {
      from: "Fri, Feb 14, 2025",
      to: "Sun, Feb 16, 2025",
    },
    travelers: 2,
    roundtrip: true,
    itemLink: "/flights/search?from=ETH&to=LOS&depart=2025-02-14&return=2025-02-16", // Example link
  },
  {
    id: "bnd-eth-los-1",
    type: "bundle",
    title: "Bundle Deal",
    route: "From Ethiopia to Lagos",
    image: "/images/placeholder.jpg",
    travelers: 2,
    itemLink: "/deals/bnd-eth-los-1", // Example link
  },
  // Add more items if needed for carousel/display
];
