import { AccommodationType } from "@/types/accommodation";

// Mock data for accommodation types shown on the landing page
export const accommodationTypes: AccommodationType[] = [
  {
    id: 1,
    name: "Apartments",
    // Using the Vercel blob storage URL as it's likely more stable than a local path
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jGyk2mylWLojMQTWtHRdyA6WidAjOJ.png",
    link: "/accommodation/apartments",
  },
  {
    id: 2,
    name: "Duplexes",
    // Assuming public/images path is correct relative to the web root
    image: "/images/accom-duplexes.png",
    link: "/accommodation/duplexes",
  },
  {
    id: 3,
    name: "Mansions",
    image: "/images/accom-mansions.png",
    link: "/accommodation/mansions",
  },
  {
    id: 4,
    name: "Villas",
    // Using a placeholder as specified in the original component
    image: "/images/placeholder.jpg",
    link: "/accommodation/villas",
  },
  // Add more types here if needed for the carousel
  {
    id: 5,
    name: "Resorts",
    image: "/images/placeholder.jpg", // Placeholder
    link: "/accommodation/resorts",
  },
  {
    id: 6,
    name: "Bungalows",
    image: "/images/placeholder.jpg", // Placeholder
    link: "/accommodation/bungalows",
  },
];
