"use client"; // Add "use client" for hooks

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"; // Import hooks
import { ExperienceType } from "@/types/accommodation"; // Import type (assuming it's in accommodation.ts)
import { fetchExperienceTypes } from "@/lib/api/content"; // Import API function
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import {ProtectedLink} from "@/components/protectedLink"

export default function NaijaExperienceSection() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      setIsLoading(true);
      try {
        const data = await fetchExperienceTypes();
        setExperiences(data);
      } catch (error) {
        console.error("Failed to fetch experience types:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadExperiences();
  }, []);

  // TODO: Implement carousel logic if needed

  return (
    <section className="w-full my-[72px]">
      <div className="w-full mx-auto px-[60px]">
        {/* Header with title and "See Experience" button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#0e2f3c] text-4xl font-bold">Explore the Naija Experience</h2>
          <ProtectedLink
            href="/experiences"
            className="px-6 py-3 bg-[#0e2f3c] text-white rounded-md font-medium hover:bg-[#0a2530] transition-colors"
          >
            See Experience
          </ProtectedLink>
        </div>

        {/* Experience types carousel */}
        <div className="relative">
          {/* TODO: Replace with actual carousel component if needed */}
          <div className="flex space-x-6 overflow-x-auto pb-4"> {/* Allow horizontal scroll */}
             {isLoading ? (
              // Skeletons
              [...Array(3)].map((_, index) => (
                <div key={index} className="flex-none w-[calc(33.333%-16px)] relative rounded-lg overflow-hidden">
                   <Skeleton className="h-[280px] w-full" />
                   <Skeleton className="absolute bottom-0 left-0 right-0 h-[64px]" /> {/* Skeleton for link background */}
                </div>
              ))
            ) : (
              // Actual Experience Types
              experiences.map((type) => (
              <div key={type.id} className="flex-none w-[calc(33.333%-16px)] relative rounded-lg overflow-hidden group"> {/* Added group for potential hover effects */}
                {/* Experience Image */}
                <div className="relative h-[280px] w-full">
                  <Image
                    src={type.image || "/images/placeholder.jpg"}
                    alt={`${type.name} experience in Nigeria`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes
                  />
                </div>

                {/* Clickable Experience Type Name */}
                <Link
                  href={type.link}
                  className="block absolute bottom-0 left-0 right-0 bg-[#e09f3e] py-4 hover:bg-[#d08f2e] transition-colors"
                >
                  <h3 className="text-[#0e2f3c] text-2xl font-bold text-center">{type.name}</h3>
                </Link>
              </div>
            )) // End experiences.map
          )} {/* End Ternary */}
          </div>

          {/* Navigation arrow (placeholder for carousel) */}
          {/* TODO: Implement carousel controls */}
          {!isLoading && experiences.length > 3 && ( // Only show if not loading and enough items
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md z-10 hover:bg-gray-100 transition-colors">
              <ChevronRight className="text-[#0e2f3c]" size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
