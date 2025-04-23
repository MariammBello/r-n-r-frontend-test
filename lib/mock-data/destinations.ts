import { DestinationCity } from "@/types/accommodation";

// Mock data for destination cities shown on the landing page
export const mockDestinations: DestinationCity[] = [
  {
    id: "lag",
    name: "Lagos",
    image: "/images/city-lagos.png",
    description:
      "Explore the best accommodations, relish in the rich cultural diversity and taste the flavours of Nigeria's biggest tourism hub. Ekaabo!",
    slug: "lagos",
  },
  {
    id: "abj",
    name: "Abuja",
    image: "/images/city-abuja.png",
    description:
      "Discover the administrative heart of Nigeria, known for its modern architecture, serene parks, and vibrant cultural scene. Welcome!",
    slug: "abuja",
  },
  {
    id: "phc",
    name: "Port Harcourt",
    image: "/images/city-port-harcourt.png",
    description:
      "Experience the 'Garden City', famous for its lively entertainment, beautiful landscapes, and the warmth of its people. Dey well!",
    slug: "port-harcourt",
  },
  // Add more cities if needed
   {
    id: "uyo",
    name: "Uyo",
    image: "/images/city-uyo.png", // Assuming this image exists
    description:
      "Visit the capital of Akwa Ibom, offering unique attractions, delicious local cuisine, and a peaceful atmosphere. Mmedi!",
    slug: "uyo",
  },
];
