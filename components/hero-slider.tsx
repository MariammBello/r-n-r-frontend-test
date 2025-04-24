"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

import React from "react"; // Import React for ReactNode type

// Define props for the HeroSlider component
interface HeroSliderProps {
  title?: string;
  description?: React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
  className?: string; // Add className prop
}

// Default content
const defaultContent = {
  title: "Your gateway to authentic African Adventures",
  description: (
    <>
      Your all-in-one platform to{" "}
      <span className="font-medium">connect directly</span>,
      <span className="font-medium"> explore authentically</span> and
      <span className="font-medium"> travel</span> Africa{" "}
      <span className="font-medium">differently</span>
    </>
  ),
  authButtonText: "Explore Now",
  authButtonLink: "/experiences",
  noAuthButtonText: "Sign In",
  noAuthButtonLink: "/auth/login",
};

export default function HeroSlider({
  title = defaultContent.title,
  description = defaultContent.description,
  buttonText, // Explicit button text from props takes precedence
  buttonLink,
  className = "", // Destructure className with default
}: HeroSliderProps) {
  const { isAuthenticated } = useAuth();

  // Determine button content based on props or auth state
  const finalButtonText = buttonText ?? (isAuthenticated ? defaultContent.authButtonText : defaultContent.noAuthButtonText);
  const finalButtonLink = buttonLink ?? (isAuthenticated ? defaultContent.authButtonLink : defaultContent.noAuthButtonLink);


  return (
    // Apply passed className along with default classes
    <section className={`w-full relative mb-10 ${className}`}>
      <div className="w-full max-w-[1300px] h-[680px] mx-auto relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-background.png"
            alt="African resort with white domed structure and swimming pool surrounded by palm trees"
            fill
            className="object-cover"
            priority
          />


          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Slide content - Use props or defaults */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white max-w-4xl mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mb-10">
            {description}
          </p>
          {/* Button - Use props if provided, otherwise use auth state */}
          <Link
            href={finalButtonLink}
            className="px-10 py-4 bg-[#e09f3e] text-[#0e2f3c] text-lg font-bold rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            {finalButtonText}
          </Link>
        </div>

        {/* Navigation arrows */}
        <button className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-colors z-10">
          <ChevronLeft size={24} />
        </button>
        <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-colors z-10">
          <ChevronRight size={24} />
        </button>

        {/* Pagination dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          <div className="w-8 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
