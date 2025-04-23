import { ExperienceType } from "@/types/accommodation"; // Assuming type is here for now

// Mock data for experience types shown on the landing page
export const mockExperienceTypes: ExperienceType[] = [
  {
    id: "exp-events",
    name: "Events",
    image: "/images/exp-events.png", // Use specific experience images
    link: "/experiences/events",
  },
  {
    id: "exp-attr",
    name: "Attractions",
    image: "/images/exp-attractions.png",
    link: "/experiences/attractions",
  },
  {
    id: "exp-rest",
    name: "Restaurants",
    image: "/images/exp-restaurants.png",
    link: "/experiences/restaurants",
  },
  {
    id: "exp-tours",
    name: "Tours",
    image: "/images/exp-beaches.png", // Example: using beaches image for tours
    link: "/experiences/tours",
  },
  // Add more types if needed
];
